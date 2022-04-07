import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpeciesList, Species } from '../species';
import { SpeciesService } from '../species.service';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeciesListComponent implements OnInit {

  currentObj: SpeciesList;
  currentList: Species[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private router: Router,
    private cdr: ChangeDetectorRef,
    private speciesService: SpeciesService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.speciesService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.speciesService.getSpeciesBySearch(value)
      .subscribe((res: SpeciesList) => {
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
    this.speciesService.getSpecies()
     .subscribe((res: SpeciesList): void => {
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
    this.speciesService.getSpeciesByPage(pageQ)
     .subscribe((res: SpeciesList): void => {
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
    this.router.navigate(['/species', id]);
  } 

}
