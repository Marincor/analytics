import { APP_BOOTSTRAP_LISTENER, ComponentRef, Provider } from "@angular/core";
import { GoogleAnalyticsService } from "./google-analytics.service";
import { NavigationEnd, Router } from "@angular/router";
import { environment } from "../../../environment/environment";

export const GOOGLE_ANALYTICS_PROVIDER: Provider = {
  provide: APP_BOOTSTRAP_LISTENER,
  multi: true,
  useFactory: GoogleAnalyticsRouterInitializer,
  deps: [
    GoogleAnalyticsService,
    Router
  ]
};

export function GoogleAnalyticsRouterInitializer(
  $gtmService: GoogleAnalyticsService,
  $router: Router
) {
    return (_: ComponentRef<unknown>) => {
      $router
        .events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            $gtmService.initialize();
            $gtmService.config(event.urlAfterRedirects);
            if (!environment.production) {
              console.log(`Navigated to URL: ${event.url}`);

              console.log(`component`, _);
            }
          }
        });
    };
}
