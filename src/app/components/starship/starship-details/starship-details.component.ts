import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Starship } from '../starship';
import { StarshipService } from '../starship.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.scss']
})
export class StarshipDetailsComponent implements OnInit {

  endpoint: string;
  starshipId: string;
  details: Starship;
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private starshipService: StarshipService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.starshipService.endpoint;
    this.starshipId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  lengthType(value: string | any): string {
    const height = parseInt(value);
    if (height > 1000) {
      return 'Large';
    } else if (height > 100 && height < 1000) {
      return 'Normal';
    } else if (height < 100) {
      return 'Small';
    } else {
      return 'Large';
    }
  }

  getDetails(): void {
    this.starshipService.getStarshipById(this.starshipId)
      .subscribe((res: Starship): void => {
        console.log(res);
        this.details = res;
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        console.log(err);
      });
  }

  back(): void {
    this.location.back();
  }

}
