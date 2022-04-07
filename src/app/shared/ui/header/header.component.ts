import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '../../../star-wars/star-wars.module';
import { StarWarsService } from '../../../star-wars/star-wars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInp') searchQ: ElementRef | any;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  showRecentSearch: boolean = false;
  query: string = '';
  recentSearches: [] = [];
  menus: { key: string, value: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private starWarsService: StarWarsService,
  ) { }

  ngOnInit(): void {
    // this.getLinks();
    this.setMenu();
    this.query = this.searchQ.nativeElement.value;
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

  getRecentSearches() {
    this.showRecentSearch = true;
    console.log(this.recentSearches);
  }

  onSearch(value: string): void {
    // const type = this.route.snapshot.params['type'];
    this.search.emit(value);
    // this.query = this.searchQ.nativeElement.value;
    // if (!this.recentSearches.some((q: string) => q === this.query)) {
    //   this.recentSearches.unshift(this.query);
    // }
    // if (this.recentSearches.length > config.search.count) {
    //   this.recentSearches.length = config.search.count;
    // }
  }

  clearSearch() {
    this.recentSearches = [];
  }

  navigateTo(url: string): void {
    this.navigate.emit(url);
  }

  // getLinks() {
  //   this.starWarsService.root()
  //     .subscribe(res => {
  //       const items = Object.entries(res);
  //       items.forEach(([key: string, value: string]): void => {
  //         console.log(key, value);
  //         this.menus.push({ key, value });
  //         this.cdr.detectChanges();
  //       });
        
  //     }, err => {
  //       console.log(err);
        
  //     })
  // }

}
