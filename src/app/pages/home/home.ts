import { Component, OnInit } from '@angular/core';
import { ApiService, Film } from '../../services/api.service';

import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [ RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

  public films: Film[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFilms().subscribe(
      (datiRicevuti) => {
        this.films = datiRicevuti;
      },
      (errore) => {
        console.error("Errore durante il recupero dei film:", errore);
      }
    );
  }
}