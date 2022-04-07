import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarWarsService } from 'src/app/star-wars/star-wars.service';
import { environment } from 'src/environments/environment';
import { People, PeopleList } from '../people';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  currentObj: PeopleList;
  currentList: People[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.peopleService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.peopleService.getPeopleBySearch(value)
      .subscribe((res: PeopleList) => {
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
    this.peopleService.getPeople()
     .subscribe((res: PeopleList) => {
       console.log(res);
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, err => {
       console.log(err);
       
     })
  }

  pagination(url: string): void {
    this.isLoaded = false;
    const pageQ = url.split(this.endpoint)[1];
    this.peopleService.getPeopleByPage(pageQ)
     .subscribe((res: PeopleList): void => {
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
    this.router.navigate(['/people', id]);
  } 

}
