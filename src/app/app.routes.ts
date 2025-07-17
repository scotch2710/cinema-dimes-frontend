import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { FilmDetails } from './pages/film-details/film-details'; 
import { Dashboard } from './admin/dashboard/dashboard';
import { adminGuard } from './guards/admin.guard'; 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'film/:id', component: FilmDetails },

  { 
    path: 'admin', 
    component: Dashboard,
    canActivate: [adminGuard] // Applica il "buttafuori" a questa rotta e a tutte le sue figlie
    // Potresti aggiungere qui delle rotte figlie per i form
  }
];