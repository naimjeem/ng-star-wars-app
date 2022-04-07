import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';
import { SpeciesListComponent } from './species-list/species-list.component';
import { SpeciesDetailsComponent } from './species-details/species-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SpeciesListComponent,
    SpeciesDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpeciesRoutingModule
  ]
})
export class SpeciesModule { }
