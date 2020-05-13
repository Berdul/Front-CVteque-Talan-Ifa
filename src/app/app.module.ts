import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { SingleProfileComponent } from './profile/single-profile/single-profile.component';
import { ListProfileComponent } from './profile/list-profile/list-profile.component';

const appRoutes: Routes =[
	{ path:'homepage', component:HomepageComponent },
  { path:'ListProfile', component:ListProfileComponent },

  { path: 'ListProfile/view/:id', component: SingleProfileComponent },

	//{ path: '', redirectTo: 'homepage', pathMatch:'full' },
	//{ path: '**', redirectTo: 'homepage' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SingleProfileComponent,
    ListProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
