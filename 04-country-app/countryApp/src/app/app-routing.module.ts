import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { NgModule } from '@angular/core';

export const routes : Routes = [
  {
    path: 'about',
    component : AboutPageComponent
  },
  {
    path : 'contact',
    component : ContactPageComponent
  },
  {
    path : 'countries',
    loadChildren : () => import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: '**',
    redirectTo : '/countries/by-capital'
  }
];
@NgModule({
  imports : [
    RouterModule.forRoot( routes )
  ],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule {



}
