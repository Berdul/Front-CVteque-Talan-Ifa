import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Router } from '@angular/router';
import { Profile } from '../../model/profile.model';

import { Subscription } from 'rxjs-compat';
import html2canvas from 'html2canvas';
import * as jsPDF from "jspdf";

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {

	jsonProfiles : Profile[] = [];

	selectedProfile: Profile = null;

	profilesSubscription : Subscription;

	isProfileSelected : boolean = false;

	constructor(	private profileService: ProfileService,
	  				private router:Router) { }

	ngOnInit() {
		console.log("ngOnInit listProfile begin");

		this.profileService.findAllProfiles().subscribe(data => {
			this.jsonProfiles = data;
			//console.log(JSON.stringify(data));
		});

		console.log("ngOnInit listProfile end");
	}

	onViewProfile(id : number){
	  console.log(">>jsonProfiles[0].profileId : " + JSON.stringify(this.jsonProfiles[0].profileId));
	  if(this.isProfileSelected == false) this.isProfileSelected = true;

	  console.log("this.isProfileSelected : " + this.isProfileSelected);


    this.profileService.findProfileById(+this.jsonProfiles[id].profileId).subscribe(

      data => {
        //console.log('>>data : ' + JSON.stringify(data));
        this.selectedProfile = data;
      }
    );
	}

  onExport() {
    this.getHtmlContent();
  }


  getHtmlContent() {
    const div = document.getElementById('screenId');

    html2canvas(div).then((canvas) => {
      var img = canvas.toDataURL("image/PNG");
      const pdf = new jsPDF('p', 'mm', 'a4', 1);

      pdf.addImage(img,'png',5,5,200,200,undefined, 'FAST');

      return pdf;
    }).then(pdf => {
      pdf.save('testPdf.pdf');
    });
  }

}
