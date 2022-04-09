import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleDetailsComponent implements OnInit {

  endpoint: string;
  vehicleId: string;
  details: Vehicle;
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.vehicleService.endpoint;
    this.vehicleId = this.route.snapshot.params['id'];
    this.getDetails();
  }

  getDetails(): void {
    this.vehicleService.getVehicleById(this.vehicleId)
      .subscribe((res: Vehicle): void => {
        
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
