import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Species } from '../species';
import { SpeciesService } from '../species.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeciesDetailsComponent implements OnInit {

  endpoint: string;
  speciesId: string;
  details: Species;
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private speciesService: SpeciesService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.speciesService.endpoint;
    this.speciesId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  getDetails(): void {
    this.speciesService.getSpeciesById(this.speciesId)
      .subscribe((res: Species): void => {
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
