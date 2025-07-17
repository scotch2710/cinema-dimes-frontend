import { Component } from '@angular/core';
import { AddFilmForm } from '../add-film-form/add-film-form';
import { AddShowtimeForm } from '../add-showtime-form/add-showtime-form';


@Component({
  selector: 'app-dashboard',
  imports: [AddFilmForm, AddShowtimeForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
