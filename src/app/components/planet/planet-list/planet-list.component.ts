import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetList, Planet } from '../planet';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {

  currentObj: PlanetList;
  currentList: Planet[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private router: Router,
    private cdr: ChangeDetectorRef,
    private planetService: PlanetService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.planetService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.planetService.getPlanetBySearch(value)
      .subscribe((res: PlanetList) => {
        console.log(res);
        this.currentObj = res;
        this.currentList = res['results'];
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        console.log(err);
      });
  }

  getList(): void {
    this.isLoaded = false;
    this.planetService.getPlanet()
     .subscribe((res: PlanetList): void => {
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
    this.planetService.getPlanetByPage(pageQ)
     .subscribe((res: PlanetList) => {
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
    this.router.navigate(['/planets', id]);
  } 

}
