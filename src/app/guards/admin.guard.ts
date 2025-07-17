import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const adminGuard = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);

  // Controlla se l'utente è loggato E se ha il ruolo 'ROLE_ADMIN'
  if (keycloakService.isLoggedIn() && keycloakService.getUserRoles().includes('ROLE_ADMIN')) {
    return true; // L'utente può accedere
  }

  // Se non è un admin, lo reindirizza alla home page
  router.navigate(['/']);
  return false;
};