// File: src/app/app.config.ts

import { APP_INITIALIZER, ApplicationConfig, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // <-- Importa questo
import { provideHttpClient, withFetch } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';

import { routes } from './app.routes';

// Rimuoviamo la funzione esterna e la mettiamo direttamente nel provider per semplicità

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    KeycloakService,
    
    
    {
      provide: APP_INITIALIZER,
      // La factory ora riceve sia KeycloakService sia PLATFORM_ID
      useFactory: (keycloak: KeycloakService, platformId: object) => {
        return () => {
          // Esegui l'inizializzazione di Keycloak SOLO se sei nel browser
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
          // Se sei sul server, non fare nulla e restituisci una promessa risolta
          // per permettere all'app di continuare il suo avvio.
          return Promise.resolve(true);
        };
      },
      multi: true,
      // Aggiorniamo le dipendenze del provider
      deps: [KeycloakService, PLATFORM_ID],
    }
    
  ],
};