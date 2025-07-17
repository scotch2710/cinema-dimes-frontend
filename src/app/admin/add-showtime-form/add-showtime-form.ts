import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Film, Sala, SpettacoloRequestDTO } from '../../services/api.service'; 

@Component({
  selector: 'app-add-showtime-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-showtime-form.html',
  styleUrls: ['./add-showtime-form.scss']
})
export class AddShowtimeForm implements OnInit {
  
  // Proprietà per contenere i dati del form
  nuovoSpettacolo: SpettacoloRequestDTO = {
    filmId: null,
    salaId: null,
    dataOraInizio: '', // Usiamo una stringa per l'input datetime-local
    prezzoBiglietto: 0
  };

  // Liste per popolare i menu a tendina
  films: Film[] = [];
  sale: Sala[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // All'avvio del componente, carichiamo i dati per i menu a tendina
    this.caricaFilmESale();
  }

  caricaFilmESale(): void {
    this.apiService.getFilms().subscribe(data => this.films = data);
    this.apiService.getAllSale().subscribe(data => this.sale = data);
  }

  onSubmit(): void {
    // Convertiamo la data da stringa a oggetto LocalDateTime se necessario
    // per l'invio al backend. Per semplicità, il backend può anche accettare la stringa.
    this.apiService.creaSpettacolo(this.nuovoSpettacolo).subscribe({
      next: (spettacoloCreato) => {
        alert(`Spettacolo per "${spettacoloCreato.film.titolo}" creato con successo!`);
        // Resetta il form
        this.nuovoSpettacolo = { filmId: null, salaId: null, dataOraInizio: '', prezzoBiglietto: 0 };
      },
      error: (err) => {
        alert('Errore durante la creazione dello spettacolo.');
        console.error(err);
      }
    });
  }
}