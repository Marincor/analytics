import { Injectable } from '@angular/core';
import { FacebookEventParams, FacebookQueue, FacebookTrackEvents, FacebookTrackFunction } from './facebook-pixel.interface';
import { environment } from '../../../environment/environment';
import { constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class FacebookPixelService {
  private initialized = false;

  public constructor() {}

  public async initialize() {
    if (!this.initialized) {

      ((f: FacebookTrackFunction, b: Document, e: string, v: string, n?: FacebookQueue, t?: HTMLScriptElement | undefined, s?: Element | undefined) => {
        if (f.fbq) {
          return;
        }
        n = f.fbq = function() {
          n?.callMethod
            ? n.callMethod.apply(n, arguments as object as IArguments[])
            : n?.queue?.push(arguments);
        };
        if (!f._fbq) {
          f._fbq = n;
        }
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e) as HTMLScriptElement;
        t.async = !0;
        t.src = v;

        s = b.getElementsByTagName(e)[0];
        s.parentNode?.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        constants.facebookPixelSDKURL,
      );

      // eslint-disable-next-line
      await (window as any).fbq('init', environment.facebookPixelID);
      // eslint-disable-next-line
      await (window as any).fbq('track', 'PageView');

      this.initialized = true;

      if (!environment.production) {
        console.log('Facebook pixel init run!');
      }

      return;
    }

    // eslint-disable-next-line
    await (window as any).fbq('track', 'PageView');
    if (!environment.production) {
      console.log('Facebook PageView event fired!');
    }
  }

  public async track<T extends FacebookTrackEvents>(event: FacebookTrackEvents, params?: FacebookEventParams[T]) {
    if (!this.initialized) return;

    // eslint-disable-next-line
    await (window as any).fbq('track', event, params);

    if (!environment.production) {
      console.log(`Facebook ${event} event fired!`);
    }
  }
}
