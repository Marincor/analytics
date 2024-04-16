import { Injectable } from '@angular/core';
import { GTAGTrackEvent, GTAGTrackEvents } from './google-analytics.interface';
import { environment } from '../../../environment/environment';
import { constants } from '../../constants';

declare let gtag: (event:string, tag: string, params: GTAGTrackEvent) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private initialized = false;

  private readonly mainTagID = environment.mainGoogleTagManagerID;

  private readonly tagIDs: string[] = [
    this.mainTagID,
  ];

  public constructor() {}

  public initialize() {
    this.load();
  }

  private load() {
    try {
      if (!this.initialized) {
        this.tagIDs.forEach((tag) => {
          const url = constants.googleTagManagerURL;
          const gTagScript = document.createElement('script');
          gTagScript.async = true;
          gTagScript.src = `${url}${tag}`;
          document.head.appendChild(gTagScript);

          const dataLayerScript = document.createElement('script');
          dataLayerScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${tag}', {'send_page_view': false});`;
          document.head.appendChild(dataLayerScript);
          this.initialized = true;

          if (!environment.production) console.log(`Google analytics init run! : Tag ${tag}`);
        });
      }

    } catch (e) {

      if (!environment.production) {
        console.error('Error adding Google Analytics', e);
      }
    }
  }

  public config(url: string) {
    this.tagIDs.forEach(async (tag) =>  {
      await gtag('config', tag, {
        page_path: url,
      });
    });
  }

  public async event(action: string | GTAGTrackEvents, tractkConfig: GTAGTrackEvent = {}) {
    await gtag('event', action, {
      ...(tractkConfig.eventCategory && { event_category: tractkConfig.eventCategory }),
      ...(tractkConfig.eventLabel && { event_label: tractkConfig.eventLabel }),
      ...(tractkConfig.value && { value: tractkConfig.value }),
      send_to: tractkConfig.tagID || this.mainTagID
    });
  }
}
