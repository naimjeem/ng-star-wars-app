import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarWarsService } from '../star-wars/star-wars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter<any>();
  @Output() navigate: EventEmitter<any> = new EventEmitter<any>();
  menus: any = [];
  recentSearches: any = [];
  // showRecentSearch: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private starWarsService: StarWarsService,
  ) { }

  ngOnInit(): void {
    this.getLinks();
  }

  getRecentSearches() {
    // this.showRecentSearch = true;
    const searches: any = localStorage.getItem('recentSearches');
    this.recentSearches = new Set(JSON.parse(searches)) || [];
  }

  onSearch(value: any) {
    const type = this.route.snapshot.params['type'];
    this.search.emit({type, value});
  }

  clearSearch() {
    localStorage.clear();
  }

  navigateTo(url: string): void {
    this.navigate.emit(url);
  }

  getLinks() {
    this.starWarsService.root()
      .subscribe(res => {
        const items = Object.entries(res);
        items.forEach(([key, value]) => {
          console.log(key, value);
          this.menus.push({ key, value });
          this.cdr.detectChanges();
        });
        
      }, err => {
        console.log(err);
        
      })
  }

}
