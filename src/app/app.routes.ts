import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { FilmDetails } from './pages/film-details/film-details'; // Importa il componente

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // NUOVA ROTTA: quando l'URL è /film/un-numero, carica FilmDetailComponent
  { path: 'film/:id', component: FilmDetails }
];