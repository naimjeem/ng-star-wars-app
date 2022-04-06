import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StarWarsDetailsComponent } from './star-wars-details/star-wars-details.component';
import { StarWarsListComponent } from './star-wars-list/star-wars-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full'
  },
  {
    path: '',
    component: StarWarsListComponent
  },
  {
    path: ':type',
    component: StarWarsListComponent
  },
  {
    path: ':type/:id',
    component: StarWarsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarWarsRoutingModule { }
