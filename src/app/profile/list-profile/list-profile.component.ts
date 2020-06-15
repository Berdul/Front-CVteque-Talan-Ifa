import {Component, OnInit} from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../model/profile.model';


import * as jsPDF from "jspdf";


@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.scss']
})
export class ListProfileComponent implements OnInit {
  //fields
	jsonProfiles : Profile[] = [];
	selectedProfile: Profile = null;
	isProfileSelected : boolean = false;
	idProfileSelected : number = null;
	searchMode : boolean;



	//Constructeur
	constructor(	private profileService: ProfileService, private route:ActivatedRoute) {
  }

	//OnInit
	ngOnInit() {
		this.route.paramMap.subscribe(() =>{
			this.listProfiles();
		});
		
	}


	listProfiles(){

		this.searchMode = this.route.snapshot.paramMap.has('keyword');

		if(this.searchMode){
			this.handleSearchProfiles();
		}
		else{
		this.handleListProfiles();
			}
	}
	handleSearchProfiles() {
		
		const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

		//search for the profiles using keyword
		this.profileService.searchProfiles(theKeyword).subscribe(
			data =>{
				this.jsonProfiles = data;
			}
		)
	}

//Méthode view Profile
	onViewProfile(id : number){
	  this.idProfileSelected = +this.jsonProfiles[id].profileId;
	  if(this.isProfileSelected == false) this.isProfileSelected = true;
    this.profileService.findProfileById(+this.jsonProfiles[id].profileId).subscribe(
      data => {
        this.selectedProfile = data;
      }
    );
	}

	//onClick export button to export the profile
  onExport() {
    console.log(">>list-profile onExport");
    this.getHtmlContent();
  }

  //Convert HTML from the <div id="screenId"> to a new pdf file
  getHtmlContent(){
	  const pdf = new jsPDF('p', 'mm', 'a4', 1);
    const div = document.getElementById('screenId');
	  pdf.fromHTML(div,15,15);
    pdf.save('testPdf.pdf');
  }


  handleListProfiles(){

	console.log("ngOnInit listProfile begin");
	this.profileService.findAllProfiles().subscribe(data => {
		this.jsonProfiles = data;});
	console.log("ngOnInit listProfile end");

  }




}
