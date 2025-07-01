// File: src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Non ci serve più AsyncPipe qui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // Implementiamo OnInit
  
  public isLoggedIn = false;
  public username = '';

  // Inizializziamo solo KeycloakService, che è tutto ciò che ci serve
  constructor(private readonly keycloakService: KeycloakService) {}

  // ngOnInit è il cuore della soluzione
  public async ngOnInit() {
    // 1. Controlliamo lo stato di login non appena il componente è pronto.
    //    ngOnInit viene eseguito DOPO l'inizializzazione di Keycloak grazie all'APP_INITIALIZER,
    //    quindi questa chiamata è sicura e ci darà lo stato corretto.
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    // 2. Se l'utente è loggato, recuperiamo il suo username.
    if (this.isLoggedIn) {
      this.username = this.keycloakService.getUsername();
    }
  }

  // Il metodo per il login è semplice: delega a Keycloak
  public login(): void {
    this.keycloakService.login();
  }

  // Anche il logout delega a Keycloak
  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}