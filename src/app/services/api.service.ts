import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// interfaccia typescript per dire ad angular com'è fatto un oggetto Film

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

export interface SpettacoloRequestDTO {
  filmId: number | null;
  salaId: number | null;
  dataOraInizio: string;
  prezzoBiglietto: number;
}

export interface Spettacolo {
  id: number;
  film: Film;
  dataOraInizio: string; // la data arriverà come stringa
  prezzoBiglietto: number;
  postiDisponibili: number;
  sala: Sala;
}

// dati da inviare al backend per creare una prenotazione
export interface PrenotazioneRequest {
  spettacoloId: number | null;
  numeroPosti: number;
}

// interfaccia per l'oggetto Prenotazione che il backend restituisce dopo averla creata
export interface Prenotazione {
  id: number;
  numeroBiglietti: number;
  
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // url di base del backend
  private backendUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // esegue una richiesta GET all'endpoint /api/films per ottenere la lista di tutti i film

  public getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.backendUrl}/films`);
  }

  public getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.backendUrl}/films/${id}`);
  }

 
  public getSpettacoliForFilm(filmId: number): Observable<Spettacolo[]> {
    return this.http.get<Spettacolo[]>(`${this.backendUrl}/spettacoli?filmId=${filmId}`);
  }
    /**
   * Esegue una richiesta POST per creare una nuova prenotazione.
   * @param datiPrenotazione L'oggetto con l'ID dello spettacolo e il numero di posti.
   * @returns Un Observable con i dati della prenotazione creata.
   */
  public createPrenotazione(datiPrenotazione: PrenotazioneRequest): Observable<Prenotazione> {

    return this.http.post<Prenotazione>(`${this.backendUrl}/prenotazioni`, datiPrenotazione);
  }

    public getAllSale(): Observable<Sala[]> {
      return this.http.get<Sala[]>(`${this.backendUrl}/sale`);
  }

  /**
   * Esegue una richiesta POST per aggiungere un nuovo film al database.
   * @param datiFilm L'oggetto con i dati del nuovo film da creare.
   * @returns Un Observable con i dati del film creato, restituito dal backend.
   */
  public aggiungiFilm(datiFilm: Film): Observable<Film> {

    return this.http.post<Film>(`${this.backendUrl}/films`, datiFilm);
  }

    /**
   * Esegue una richiesta POST per creare un nuovo spettacolo.
   * @param datiSpettacolo L'oggetto DTO con i dati del nuovo spettacolo.
   * @returns Un Observable con i dati dello spettacolo creato.
   */
  
  public creaSpettacolo(datiSpettacolo: SpettacoloRequestDTO): Observable<Spettacolo> {
    // l'interceptor di keycloak allegherà automaticamente il token dell'admin a questa richiesta
    return this.http.post<Spettacolo>(`${this.backendUrl}/spettacoli`, datiSpettacolo);
  }
}
