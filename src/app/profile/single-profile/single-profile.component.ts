import { Component, OnInit } from '@angular/core';


import { ProfileService } from '../../service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile.model';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.scss']
})
export class SingleProfileComponent implements OnInit {

	profile : Profile;

	constructor(private route:ActivatedRoute,
				private router: Router,
				private profileService: ProfileService) { }

	ngOnInit() {
		const id = this.route.snapshot.params['id'];
		this.profileService.findProfileById(+id).subscribe(
			data => {
				this.profile = data;
			}
		);

		this.profileService.emitProfilesSubject();
		console.log(">>single-profile ngOnInit profile : " + this.profile);
	}

	onBack(){
		this.router.navigate(['ListProfile']);
	}
}
