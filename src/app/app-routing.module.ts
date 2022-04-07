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
  {
    path: 'starships',
    loadChildren: () => import('./components/starship/starship.module').then(m => m.StarshipModule),
  },
  {
    path: 'planets',
    loadChildren: () => import('./components/planet/planet.module').then(m => m.PlanetModule),
  },
  {
    path: 'species',
    loadChildren: () => import('./components/species/species.module').then(m => m.SpeciesModule),
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./components/vehicle/vehicle.module').then(m => m.VehicleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
