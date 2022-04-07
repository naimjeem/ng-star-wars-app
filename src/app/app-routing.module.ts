import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./star-wars/star-wars.module').then(m => m.StarWarsModule),
  // },
  {
    path: '',
    redirectTo: 'people',
    pathMatch: 'full'
  },
  {
    path: 'people',
    loadChildren: () => import('./components/people/people.module').then(m => m.PeopleModule),
  },
  {
    path: 'films',
    loadChildren: () => import('./components/film/film.module').then(m => m.FilmModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
