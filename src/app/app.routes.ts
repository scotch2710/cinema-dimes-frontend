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
    canActivate: [adminGuard] // applica il blocco al path admin

  }
];