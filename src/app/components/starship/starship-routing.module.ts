import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';
import { StarshipListComponent } from './starship-list/starship-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: StarshipListComponent
  },
  {
    path: ':id',
    component: StarshipDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarshipRoutingModule { }
