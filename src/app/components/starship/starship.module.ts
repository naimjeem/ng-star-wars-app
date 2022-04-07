import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarshipRoutingModule } from './starship-routing.module';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { StarshipListComponent } from './starship-list/starship-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StarshipListComponent,
    StarshipDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StarshipRoutingModule
  ]
})
export class StarshipModule { }
