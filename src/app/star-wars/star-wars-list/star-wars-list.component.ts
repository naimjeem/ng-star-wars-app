import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-star-wars-list',
  templateUrl: './star-wars-list.component.html',
  styleUrls: ['./star-wars-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarWarsListComponent implements OnInit {
  currentObj: any;
  currentList: any;
  type: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private starWarsService: StarWarsService,
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'] || 'people';    
    this.getList(environment.baseUrl + this.type);
  }

  search(ev: any) {
    console.log(ev);
    this.starWarsService.search(environment.baseUrl + ev.type, ev.value)
      .subscribe(res => {
        console.log(res);
        this.currentObj = res;
        this.currentList = res['results'];
        if (this.currentObj.count !== 0) {
          const searches: any = localStorage.getItem('recentSearches');
          const recentSearches: any = JSON.parse(searches) || [];
          recentSearches.push((ev.value));
          const updateSearches: any = new Set(JSON.parse(recentSearches));
          localStorage.setItem('recentSearches', updateSearches);
        }
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
        
      })
  }

  getList(url: any) {
    console.log(url);
    
    this.starWarsService.list(url)
     .subscribe(res => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.cdr.detectChanges();
     }, err => {
       console.log(err);
       
     })
  }

  gotToDetails(url: any) {
    const arr = url.split('/');
    
    console.log(arr);
    const type = arr[arr.length - 3];
    const id = arr[arr.length - 2];
    this.router.navigate([type, id])
  } 

}
