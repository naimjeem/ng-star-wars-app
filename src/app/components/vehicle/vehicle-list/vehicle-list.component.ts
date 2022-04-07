import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleList, Vehicle } from '../vehicle';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleListComponent implements OnInit {

  currentObj: VehicleList;
  currentList: Vehicle[];
  endpoint: string;
  isLoaded: boolean = false;

  constructor (
    private router: Router,
    private cdr: ChangeDetectorRef,
    private vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {
    this.endpoint = this.vehicleService.endpoint;
    this.getList();
  }

  search(value: string): void {
    this.isLoaded = false;
    this.vehicleService.getVehicleBySearch(value)
      .subscribe((res: VehicleList) => {
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
    this.vehicleService.getVehicle()
     .subscribe((res: VehicleList): void => {
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
    this.vehicleService.getVehicleByPage(pageQ)
     .subscribe((res: VehicleList): void => {
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
    this.router.navigate(['/vehicles', id]);
  } 

}
