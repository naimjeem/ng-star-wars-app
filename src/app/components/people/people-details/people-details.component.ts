import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from 'src/app/star-wars/star-wars.interface';
import { People } from '../people';
import { PeopleService } from '../people.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit {
  endpoint: string;
  peopleId: string;
  details: People;
  homeworld: string;
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.peopleService.endpoint;
    this.peopleId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  heightType(value: string | any): string {
    const height = parseInt(value);
    if (height > 200) {
      return 'High';
    } else if (height > 100 && height < 200) {
      return 'Normal';
    } else if (height < 100) {
      return 'Low';
    } else {
      return 'High';
    }
  }

  getDetails(): void {
    this.peopleService.getPeopleById(this.peopleId)
      .subscribe((res: People): void => {
        console.log(res);
        this.details = res;
        if (this.details.homeworld) {
          this.getHomeworld(this.details.homeworld);
        }
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        console.log(err);
      });
  }

  getHomeworld(url: string): void {
    this.peopleService.getPlanetById(url)
      .subscribe((res: Planet) => {
        console.log(res);
        this.homeworld = res['name'];
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
  }

  back(): void {
    this.location.back();
  }

}
