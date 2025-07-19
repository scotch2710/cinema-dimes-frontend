import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink ], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  
  public isLoggedIn = false;
  public username = '';

  
  constructor(private readonly keycloakService: KeycloakService) {}

 
  public async ngOnInit() {

    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    // se l'utente è loggato recupero il suo username
    if (this.isLoggedIn) {
      this.username = this.keycloakService.getUsername();
    }
  }

  
  public login(): void {
    this.keycloakService.login();
  }

  
  public logout(): void {
    this.keycloakService.logout(window.location.origin);
  }
}