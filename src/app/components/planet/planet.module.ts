import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetRoutingModule } from './planet-routing.module';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailsComponent } from './planet-details/planet-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanetService } from './planet.service';


@NgModule({
  declarations: [
    PlanetListComponent,
    PlanetDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlanetRoutingModule
  ],
  providers: [PlanetService]
})
export class PlanetModule { }
