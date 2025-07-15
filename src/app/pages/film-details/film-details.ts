import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Film, Spettacolo, PrenotazioneRequest  } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs'; // Per eseguire più chiamate API in parallelo

// Per usare [(ngModel)], dobbiamo importare FormsModule
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; // Per usare @if, @for, ecc.

@Component({
  selector: 'app-film-details',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importiamo i moduli necessari
  templateUrl: './film-details.html',
  styleUrls: ['./film-details.scss']
})
export class FilmDetails implements OnInit {
  
  film: Film | null = null;
  spettacoli: Spettacolo[] = [];
  isLoading = true;

  // Dati per la prenotazione
  spettacoloSelezionatoId: number | null = null;
  numeroBiglietti = 1;

  constructor(
    private route: ActivatedRoute, // Per leggere i parametri dall'URL (l'ID del film)
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router // Per reindirizzare l'utente dopo l'acquisto
  ) {}

  ngOnInit(): void {
    const filmId = this.route.snapshot.paramMap.get('id');
    if (filmId) {
      this.caricaDati(Number(filmId));
    }
  }

  caricaDati(id: number): void {
    this.isLoading = true;
    // Eseguiamo entrambe le chiamate API (per film e spettacoli) in parallelo
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

  public async acquista(): Promise<void> {

    // 1. CONTROLLO DEL LOGIN (LA PRIMA COSA DA FARE)
    const eLoggato = await this.authService.isLoggedIn();
    if (!eLoggato) {
      // Se l'utente non è loggato:
      alert("Devi effettuare il login per poter acquistare i biglietti.");
      this.authService.login(); // Opzionale: reindirizza subito l'utente alla pagina di login
      return; // FONDAMENTALE: blocca il resto della funzione e non procede con l'acquisto
    }

    if (this.numeroBiglietti<1){
      alert("Va selezionato un numero di biglietti almeno pari ad 1")
      return;
    }
    
    // Qui andrà la chiamata al servizio per creare la prenotazione
    console.log(`ACQUISTO: Utente ${this.authService.getUsername()} vuole acquistare ${this.numeroBiglietti} biglietti per lo spettacolo ID ${this.spettacoloSelezionatoId}`);
    
    const datiPrenotazione: PrenotazioneRequest = {
      spettacoloId: this.spettacoloSelezionatoId,
      numeroPosti: this.numeroBiglietti
    };

  // 3. Chiamiamo il servizio e gestiamo la risposta (sia successo che errore)
    console.log("Invio richiesta di prenotazione:", datiPrenotazione);
  
    this.apiService.createPrenotazione(datiPrenotazione)
      .subscribe({
      // Questo blocco viene eseguito se la chiamata va a buon fine (il backend risponde con status 2xx)
        next: (prenotazioneConfermata) => {
          alert(`Prenotazione effettuata con successo! Il tuo ID di prenotazione è: ${prenotazioneConfermata.id}`);
        // Dopo l'acquisto, reindirizziamo l'utente alla home page
          this.router.navigate(['/']);
        },
      // Questo blocco viene eseguito se il backend restituisce un errore (status 4xx o 5xx)
        error: (err) => {
          console.error("Errore durante la prenotazione:", err);
        // Mostra un messaggio di errore all'utente. Se il backend invia un messaggio specifico, lo mostriamo.
          alert(`Errore: ${err.error.message || 'Non è stato possibile completare la prenotazione. I posti potrebbero essere esauriti.'}`);
        }
      });
    
  }
}