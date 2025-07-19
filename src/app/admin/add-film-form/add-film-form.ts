import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Film } from '../../services/api.service'; 

@Component({
  selector: 'app-add-film-form',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './add-film-form.html',
  styleUrls: ['./add-film-form.scss']
})
export class AddFilmForm {
  // oggetto per contenere i dati del form, legato con ngModel
  nuovoFilm = {
    titolo: '',
    trama: '',
    durataMinuti: 0,
    percorsoLocandina: ''
  };

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.aggiungiFilm(this.nuovoFilm as Film).subscribe({
      next: (filmCreato) => {
        alert(`Film "${filmCreato.titolo}" aggiunto con successo!`);
        // resetta il form
        this.nuovoFilm = { titolo: '', trama: '', durataMinuti: 0, percorsoLocandina: '' };
      },
      error: (err) => {
        alert('Errore durante la creazione del film.');
        console.error(err);
      }
    });
  }
}