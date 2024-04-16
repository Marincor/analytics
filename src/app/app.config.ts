import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FACEBOOK_PIXEL_PROVIDER } from '../infra/service/facebook-pixel/facebook-pixel.provider';
import { GOOGLE_ANALYTICS_PROVIDER } from '../infra/service/google-analytics/google-analytics.provider';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes), 
    FACEBOOK_PIXEL_PROVIDER,
    GOOGLE_ANALYTICS_PROVIDER
  ]
};
