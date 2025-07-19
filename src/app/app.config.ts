
import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';

import { routes } from './app.routes';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    KeycloakService,
    
    {
      provide: APP_INITIALIZER,
      
      useFactory: (keycloak: KeycloakService, platformId: object) => {
        return () => {
          // esegui l'inizializzazione di keycloak solo se si è nel browser
          if (isPlatformBrowser(platformId)) {
            return keycloak.init({
              config: {
                url: 'http://localhost:8888',
                realm: 'cinema-dimes-realm',
                clientId: 'cinema-dimes-client',
              },
              initOptions: {
                onLoad: 'check-sso',
                
                checkLoginIframe: false 
                
              },
              loadUserProfileAtStartUp: true
            });
          }

          return Promise.resolve(true);
        };
      },
      multi: true,

      deps: [KeycloakService, PLATFORM_ID],
    }
    
  ],
};