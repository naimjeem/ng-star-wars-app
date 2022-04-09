import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { People } from '../people';
import { PeopleService } from '../people.service';
import { Location } from '@angular/common';
import { Planet } from '../../planet/planet';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  getDetails(): void {
    this.peopleService.getPeopleById(this.peopleId)
      .subscribe((res: People): void => {
        this.details = res;
        if (this.details.homeworld) {
          this.getHomeworld(this.details.homeworld);
        }
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        throw err;
      });
  }

  getHomeworld(url: string): void {
    this.peopleService.getPlanetById(url)
      .subscribe((res: Planet): void => {
        this.homeworld = res['name'];
        this.cdr.detectChanges();
      }, (err: Error): void => {
        throw err;
      });
  }

  back(): void {
    this.location.back();
  }

}
