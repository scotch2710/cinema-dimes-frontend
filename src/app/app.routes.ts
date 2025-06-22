import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  // Quando l'utente visita l'indirizzo base (es. http://localhost:4200),
  // mostra il componente HomeComponent.
  { path: '', component: HomeComponent },

  // Qui in futuro aggiungerai le altre rotte
  // es. { path: 'film/:id', component: FilmDetailsComponent },
];