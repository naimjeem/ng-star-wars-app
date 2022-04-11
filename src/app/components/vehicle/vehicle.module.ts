import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleService } from './vehicle.service';


@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule
  ],
  providers: [VehicleService]
})
export class VehicleModule { }
