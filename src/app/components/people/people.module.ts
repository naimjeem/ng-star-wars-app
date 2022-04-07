import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PeopleService } from './people.service';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PeopleRoutingModule
  ],
  providers: [PeopleService]
})
export class PeopleModule { }
