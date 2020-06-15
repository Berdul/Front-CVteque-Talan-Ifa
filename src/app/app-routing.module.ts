import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {ListProfileComponent} from './profile/list-profile/list-profile.component';
import {SingleProfileComponent} from './profile/single-profile/single-profile.component';


const routes: Routes = [
  {path:'search/:keyword', component:ListProfileComponent },
  { path:'homepage', component:HomepageComponent },
  { path:'ListProfile', component:ListProfileComponent },
  { path: 'ListProfile/view/:id', component: SingleProfileComponent },
  { path:'**', component:HomepageComponent },
  {path:'', component:HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
