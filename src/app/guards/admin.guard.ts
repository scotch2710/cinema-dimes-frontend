import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const adminGuard = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  // controlla se l'utente è loggato e se ha il ruolo admin
  if (keycloakService.isLoggedIn() && keycloakService.getUserRoles().includes('ROLE_ADMIN')) {
    return true; 
  }

  // se non è un admin lo reindirizza alla home page
  router.navigate(['/']);
  return false;
};