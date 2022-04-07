import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilmService } from './film.service';


@NgModule({
  declarations: [
    FilmListComponent,
    FilmDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilmRoutingModule
  ],
  providers: [FilmService]
})
export class FilmModule { }
