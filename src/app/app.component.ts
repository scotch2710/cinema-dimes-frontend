// File: src/app/app.component.ts

import { Component, OnInit } from '@angular/core'; // <-- Importa OnInit
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { KeycloakService } from 'keycloak-angular'; // <-- Importa anche KeycloakService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // <-- Implementa l'interfaccia OnInit

  // 1. Dichiariamo delle proprietà semplici e sincrone
  public isLoggedIn = false;
  public username = '';

  // 2. Inizializziamo i servizi nel costruttore
  constructor(
    private readonly authService: AuthService,
    private readonly keycloakService: KeycloakService
  ) {}

  // 3. Usiamo ngOnInit per controllare lo stato DOPO l'inizializzazione di Keycloak
  public async ngOnInit() {
    // Controlliamo lo stato del login e aspettiamo il risultato
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    
    // Se l'utente è loggato, prendiamo anche il suo username
    if (this.isLoggedIn) {
      this.username = this.keycloakService.getUsername();
    }
  }

  // I metodi per il login e logout rimangono identici
  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
  }
}