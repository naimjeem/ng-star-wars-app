import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StarWarsService } from '../../../star-wars/star-wars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInp') searchQ: ElementRef | any;
  @Input() searchType: string;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  showRecentSearch: boolean = false;
  query: string = '';
  recentSearches: [] | any;
  menus: { key: string, value: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private starWarsService: StarWarsService,
  ) { }

  ngOnInit(): void {
    this.setMenu();
    const searchHistory = localStorage.getItem(this.searchType);
    this.recentSearches = JSON.parse(searchHistory as string);
    console.log(this.recentSearches);
    
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

  onSearch(value: string): void {
    this.search.emit(value);
    this.query = this.searchQ.nativeElement.value;
    console.log(this.query);
    this.recentSearches.unshift(this.query);
    this.recentSearches = [...new Set(this.recentSearches)];
    console.log(this.recentSearches);
    const updatedSearchArr = JSON.stringify(this.recentSearches)
    localStorage.setItem(this.searchType, updatedSearchArr);
    if (environment.config.search.count < this.recentSearches.length) {
      this.recentSearches.length = environment.config.search.count;
    }
  }

  clearSearch(): void {
    this.recentSearches = [];
    localStorage.setItem(this.searchType, this.recentSearches);
  }

  navigateTo(url: string): void {
    this.navigate.emit(url);
  }

}
