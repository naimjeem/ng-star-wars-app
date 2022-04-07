import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsComponent } from './people-details/people-details.component';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: PeopleListComponent
  },
  {
    path: ':id',
    component: PeopleDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
