import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { FavComponent } from './fav/fav.component';
import { DelComponent } from './del/del.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'fav', component: FavComponent },
  { path: 'del', component: DelComponent },
  { path: '',        component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}



