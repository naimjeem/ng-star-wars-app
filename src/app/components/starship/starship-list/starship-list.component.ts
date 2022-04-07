import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarshipList, Starship } from '../starship';
import { StarshipService } from '../starship.service';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit {

  currentObj: StarshipList;
  currentList: Starship[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private router: Router,
    private cdr: ChangeDetectorRef,
    private starshipService: StarshipService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.starshipService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.starshipService.getStarshipBySearch(value)
      .subscribe((res: StarshipList) => {
        console.log(res);
        this.currentObj = res;
        this.currentList = res['results'];
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error) => {
        console.log(err);
      });
  }

  getList(): void {
    this.isLoaded = false;
    this.starshipService.getStarship()
     .subscribe((res: StarshipList): void => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, (err: Error): void => {
       console.log(err);
     })
  }

  pagination(url: string): void {
    this.isLoaded = false;
    const pageQ = url.split(this.endpoint)[1];
    this.starshipService.getStarshipByPage(pageQ)
     .subscribe((res: StarshipList) => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, (err: Error): void => {
       console.log(err);
     })
  }

  gotToDetails(url: any): void {
    const params = url.split(this.endpoint)[1];
    const id = params.split('/')[0];
    this.router.navigate(['/starships', id]);
  } 

}
