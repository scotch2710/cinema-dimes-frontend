import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Film, Spettacolo, PrenotazioneRequest  } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs'; // per eseguire più chiamate API in parallelo


import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; // per usare @if, @for, ecc.

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './film-details.html',
  styleUrls: ['./film-details.scss']
})
export class FilmDetails implements OnInit {
  
  film: Film | null = null;
  spettacoli: Spettacolo[] = [];
  isLoading = true;

  // dati per la prenotazione
  spettacoloSelezionatoId: number | null = null;
  numeroBiglietti = 1;

  constructor(
    private route: ActivatedRoute, // per leggere i parametri dall'URL (l'ID del film)
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router // per reindirizzare l'utente dopo l'acquisto
  ) {}

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.caricaDati(Number(filmId));
    }
  }

  caricaDati(id: number): void {
    this.isLoading = true;
    // esegue entrambe le chiamate API (per film e spettacoli) in parallelo
    forkJoin({
      film: this.apiService.getFilmById(id),
      spettacoli: this.apiService.getSpettacoliForFilm(id)
    }).subscribe({
      next: (risultati) => {
        this.film = risultati.film;
        this.spettacoli = risultati.spettacoli;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Errore nel caricamento dei dati", err);
        this.isLoading = false;
      }
    });
  }




  get costoTotale(): number {
    // se non è stato selezionato nessuno spettacolo il costo è 0
    if (!this.spettacoloSelezionatoId) {
      return 0;
    }


    const spettacoloSelezionato = this.spettacoli.find(s => s.id === this.spettacoloSelezionatoId);

    // se trova lo spettacolo calcolo il totale altrimenti 0
    if (spettacoloSelezionato) {
      return spettacoloSelezionato.prezzoBiglietto * this.numeroBiglietti;
    }

    return 0;
  }



  public async acquista(): Promise<void> {

    // controllo login
    const eLoggato = await this.authService.isLoggedIn();
    if (!eLoggato) {
      
      alert("Devi effettuare il login per poter acquistare i biglietti.");
      this.authService.login(); // reindirizza l'utente alla pagina di login
      return; // blocca il resto della funzione e non procede con l'acquisto
    }

    if (this.numeroBiglietti<1){
      alert("Va selezionato un numero di biglietti almeno pari ad 1")
      return;
    }
    
    
    console.log(`ACQUISTO: Utente ${this.authService.getUsername()} vuole acquistare ${this.numeroBiglietti} biglietti per lo spettacolo ID ${this.spettacoloSelezionatoId}`);
    
    const datiPrenotazione: PrenotazioneRequest = {
      spettacoloId: this.spettacoloSelezionatoId,
      numeroPosti: this.numeroBiglietti
    };

  
    console.log("Invio richiesta di prenotazione:", datiPrenotazione);
  
    this.apiService.createPrenotazione(datiPrenotazione)
      .subscribe({
      // questo blocco viene eseguito se la chiamata va a buon fine (il backend risponde con status 2xx)
        next: (prenotazioneConfermata) => {
          alert(`Prenotazione effettuata con successo! Il tuo ID di prenotazione è: ${prenotazioneConfermata.id}`);
        // dopo l'acquisto, reinderizzo l'utente alla home page
          this.router.navigate(['/']);
        },
      // questo blocco viene eseguito se il backend restituisce un errore (status 4xx o 5xx)
        error: (err) => {
          console.error("Errore durante la prenotazione:", err);
        // mostra un messaggio di errore all'utente. Se il backend invia un messaggio specifico lo mostriamo.
          alert(`Errore: ${err.error.message || 'Non è stato possibile completare la prenotazione. I posti potrebbero essere esauriti.'}`);
        }
      });
    
  }
}