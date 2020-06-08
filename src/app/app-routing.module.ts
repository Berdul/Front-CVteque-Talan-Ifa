import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ListProfileComponent} from './profile/list-profile/list-profile.component';
import {SingleProfileComponent} from './profile/single-profile/single-profile.component';


const routes: Routes = [
  { path:'homepage', component:HomepageComponent },
  { path:'ListProfile', component:ListProfileComponent },
  { path: 'ListProfile/view/:id', component: SingleProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
