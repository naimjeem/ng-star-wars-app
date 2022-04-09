import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { People, PeopleList } from '../people';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  currentObj: PeopleList;
  currentList: People[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
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
      .subscribe((res: PeopleList): void => {
        this.currentObj = res;
        this.currentList = res['results'];
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        throw err;
      });
  }

  getList(): void {
    this.isLoaded = false;
    this.peopleService.getPeople()
     .subscribe((res: PeopleList): void => {
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, (err: Error): void => {
        throw err;
      });
  }

  pagination(url: string): void {
    this.isLoaded = false;
    const pageQ = url.split(this.endpoint)[1];
    this.peopleService.getPeopleByPage(pageQ)
     .subscribe((res: PeopleList): void => {
       
       this.currentObj = res;
       this.currentList = res['results'];
       this.isLoaded = true;
       this.cdr.detectChanges();
     }, (err: Error): void => {
        throw err;
      });;
  }

  gotToDetails(url: string | any): void {
    const params = url.split(this.endpoint)[1];
    const id = params.split('/')[0];
    this.router.navigate(['/people', id]);
  } 

}
