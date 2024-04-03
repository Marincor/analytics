import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { environment } from '../environment/environment.example';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes), 
    importProvidersFrom(   
      GoogleTagManagerModule.forRoot({
        id: environment.GoogleTagManagerID,
      })
    )
  ]
};
