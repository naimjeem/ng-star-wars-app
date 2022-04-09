import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() searchType: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  showRecentSearch: boolean = false;
  query: string = '';
  recentSearches: [] | any;
  menus: { key: string, value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setMenu();
    const searchHistory = localStorage.getItem(this.searchType);
    this.recentSearches = JSON.parse(searchHistory as string);
    
    
  }

  setMenu(): void {
    this.menus = [
      { key: 'people', value: 'https://swapi.dev/api/people/' },
      { key: 'films', value: 'https://swapi.dev/api/films/' },
      { key: 'planets', value: 'https://swapi.dev/api/planets/' },
      { key: 'species', value: 'https://swapi.dev/api/species/' },
      { key: 'starships', value: 'https://swapi.dev/api/starships/' },
      { key: 'vehicles', value: 'https://swapi.dev/api/vehicles/' },
    ];
  }

  enterSearch(event: Event | any): void {
    const value = event.target.value;    
    this.searchList(value);
    event.preventDefault();
  }

  searchFromHistory(value: string): void {
    this.searchList(value);
  }
  
  searchList(value: string): void {
    this.search.emit(value);
    this.query = value;
    
    this.recentSearches.unshift(this.query);
    this.recentSearches = [...new Set(this.recentSearches)];
    
    const updatedSearchArr = JSON.stringify(this.recentSearches)
    localStorage.setItem(this.searchType, updatedSearchArr);
    if (environment.config.search.count < this.recentSearches.length) {
      this.recentSearches.length = environment.config.search.count;
    }
  }

  clearSearch(): void {
    this.recentSearches = [];
    localStorage.setItem(this.searchType, JSON.stringify(this.recentSearches));
  }

}
