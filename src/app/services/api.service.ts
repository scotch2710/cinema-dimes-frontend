import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definiamo un'interfaccia TypeScript per dire ad Angular com'è fatto un oggetto Film.
// Questo ci darà l'autocompletamento e un codice più sicuro.
export interface Film {
  id: number;
  titolo: string;
  trama: string;
  durataMinuti: number;
  percorsoLocandina: string;
}

export interface Sala {
  id: number;
  nomeSala: string;
  capacitaTotale: number;
}

export interface Spettacolo {
  id: number;
  dataOraInizio: string; // La data arriverà come stringa
  prezzoBiglietto: number;
  postiDisponibili: number;
  sala: Sala;
}

// Interfaccia per i dati da INVIARE al backend per creare una prenotazione
export interface PrenotazioneRequest {
  spettacoloId: number | null;
  numeroPosti: number;
}

// Interfaccia per l'oggetto Prenotazione che il backend restituisce dopo averla creata
export interface Prenotazione {
  id: number;
  numeroBiglietti: number;
  // Aggiungi qui altri campi se il tuo backend li restituisce (es. prezzoPagato)
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // L'URL di base del nostro backend Spring Boot
  private backendUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Esegue una richiesta GET all'endpoint /api/films per ottenere la lista di tutti i film.
   * @returns Un Observable che emetterà un array di oggetti Film.
   */
  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.backendUrl}/films`);
  }
    // --- NUOVO METODO 1: Ottenere un film per ID ---
  // Nota: questo endpoint andrà creato nel backend! (es. @GetMapping("/{id}") nel FilmController)
  public getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.backendUrl}/films/${id}`);
  }

  // --- NUOVO METODO 2: Ottenere gli spettacoli per un film ---
  public getSpettacoliForFilm(filmId: number): Observable<Spettacolo[]> {
    return this.http.get<Spettacolo[]>(`${this.backendUrl}/spettacoli?filmId=${filmId}`);
  }
    /**
   * Esegue una richiesta POST per creare una nuova prenotazione.
   * @param datiPrenotazione L'oggetto con l'ID dello spettacolo e il numero di posti.
   * @returns Un Observable con i dati della prenotazione creata.
   */
  public createPrenotazione(datiPrenotazione: PrenotazioneRequest): Observable<Prenotazione> {
    // La libreria keycloak-angular si occuperà di aggiungere automaticamente
    // il token di autenticazione a questa richiesta.
    return this.http.post<Prenotazione>(`${this.backendUrl}/prenotazioni`, datiPrenotazione);
  }
}
