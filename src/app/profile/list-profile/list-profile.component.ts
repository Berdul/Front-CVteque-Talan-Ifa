import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile.model';

import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

	profiles : Profile[] = [];

	profilesSubscription : Subscription;

	constructor(	private profileService: ProfileService,
	  				private router:Router) { }

	ngOnInit() {
		console.log("ngOnInit listProfile begin");

		this.profileService.findAllProfiles().subscribe(data => {
			this.profiles = data;
			console.log(data);
		});
		/*
		this.profilesSubscription = this.profileService.profilesSubject.subscribe(
			(profiles: Profile []) => {
				this.profiles = profiles;
				console.log(this.profiles);
			}
		);
		this.profileService.emitProfilesSubject();

		console.log("ngOnInit listProfile profiles :  " + this.profiles[0]);
		*/
		console.log("ngOnInit listProfile end");
	}

	onViewProfile(id : number){
		this.router.navigate(['/ListProfile','view',id]);
	}


}
