import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StarWarsRoutingModule } from './star-wars-routing.module';
import { StarWarsListComponent } from './star-wars-list/star-wars-list.component';
import { StarWarsDetailsComponent } from './star-wars-details/star-wars-details.component';
import { HeaderComponent } from '../header/header.component';
import { StarWarsService } from './star-wars.service';

export let config = {
  search: {
    count: 3,
  }
}

@NgModule({
  declarations: [
    HeaderComponent,
    StarWarsListComponent,
    StarWarsDetailsComponent
  ],
  imports: [
    CommonModule,
    StarWarsRoutingModule
  ],
  providers: [
    StarWarsService,
  ]
})
export class StarWarsModule { }
