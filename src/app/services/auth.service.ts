// File: src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly keycloakService: KeycloakService) { }

  public async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  public login(): void {
    this.keycloakService.login();
  }

  public logout(): void {
    // Al logout, reindirizziamo l'utente alla pagina principale del nostro sito
    this.keycloakService.logout(window.location.origin);
  }

  public getUsername(): string {
    return this.keycloakService.getUsername();
  }

  public getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}