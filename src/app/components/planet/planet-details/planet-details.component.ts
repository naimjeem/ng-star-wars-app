import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Planet } from '../planet';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetDetailsComponent implements OnInit {

  endpoint: string;
  planetId: string;
  details: Planet;
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private planetService: PlanetService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.planetService.endpoint;
    this.planetId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  getDetails(): void {
    this.planetService.getPlanetById(this.planetId)
      .subscribe((res: Planet): void => {
        
        this.details = res;
        this.isLoaded = true;
        this.cdr.detectChanges();
      }, (err: Error): void => {
        throw err;
      });
  }

  back(): void {
    this.location.back();
  }

}
