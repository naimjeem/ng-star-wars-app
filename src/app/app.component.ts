import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.init();
  }
  
  init(): void {
    localStorage.setItem('PEOPLE_SEARCH', '[]');
    localStorage.setItem('FILM_SEARCH', '[]');
    localStorage.setItem('PLANET_SEARCH', '[]');
    localStorage.setItem('SPECIES_SEARCH', '[]');
    localStorage.setItem('STARSHIP_SEARCH', '[]');
    localStorage.setItem('VEHICLE_SEARCH', '[]');
  }
}
