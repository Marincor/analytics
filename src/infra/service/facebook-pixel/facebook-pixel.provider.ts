import { Provider, APP_BOOTSTRAP_LISTENER, ComponentRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FacebookPixelService } from './facebook-pixel.service'
import { environment } from '../../../environment/environment';

export const FACEBOOK_PIXEL_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: FacebookPixelRouterInitializer,
  deps: [
    FacebookPixelService,
    Router
  ]
};

export function FacebookPixelRouterInitializer(
  $fpService: FacebookPixelService,
  $router: Router
) {
    return (_: ComponentRef<unknown>) => {
      $router
        .events
        .subscribe(async (event) => {
          if (event instanceof NavigationEnd) {
            await $fpService.initialize();
            if (!environment.production) {
              console.log(`Navigated to URL: ${event.url}`);

              console.log(`component`, _)
            }
          }
        });
    };
}
