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

  // Qui in futuro aggiungerai gli altri metodi: getSpettacoli(), createPrenotazione(), etc.
}