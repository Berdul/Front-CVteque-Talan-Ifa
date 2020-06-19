import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { ProfileService } from '../../service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../../model/profile.model';



@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.scss']
})
export class SingleProfileComponent implements OnInit {
  //fields
	profile: Profile;
	@ViewChild('screen', {static: false}) screen: ElementRef;

	//constructor
	constructor(private route: ActivatedRoute,
				         private router: Router,
				         private profileService: ProfileService,
				         private elementRef: ElementRef) { }


//OnInit
	ngOnInit() {
		const id = this.route.snapshot.params.id;
		this.profileService.findProfileById(+id).subscribe(
			data => {
				console.log('>>data : ' + JSON.stringify(data));
				this.profile = data;
			}
		);
		this.profileService.emitProfilesSubject();
		console.log('>>single-profile ngOnInit profile ' + id + ' : '  + this.profile);
	}


	onBack() {
		this.router.navigate(['ListProfile']);
	}

	onExport() {
		this.getHtmlContent();
	}


	getHtmlContent() {


    const div = document.getElementById('screenId');

    html2canvas(div).then((canvas) => {
      var img = canvas.toDataURL('image/PNG');
      const pdf = new jsPDF('p', 'mm', 'a4', 1);

      pdf.addImage(img,'png',5,5,200,200,undefined, 'FAST');

      return pdf;
    }).then(pdf => {
      pdf.save('testPdf.pdf');
    });

  }

}
