import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarWarsRoutingModule } from './star-wars-routing.module';
import { StarWarsListComponent } from './star-wars-list/star-wars-list.component';
import { StarWarsDetailsComponent } from './star-wars-details/star-wars-details.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    StarWarsListComponent,
    StarWarsDetailsComponent
  ],
  imports: [
    CommonModule,
    StarWarsRoutingModule
  ]
})
export class StarWarsModule { }
