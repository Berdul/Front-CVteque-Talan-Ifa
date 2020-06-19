import {Component, OnInit} from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Profile } from '../../model/profile.model';


import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';


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

  loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

  generate() {
    this.loadFile('assets/template/template.docx', (
      error,
      content
    ) => {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater().loadZip(zip);
      doc.setData(this.selectedProfile);
      try {
        doc.render();
      } catch {
        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(() => {
              return error.properties.explanation;
            })
            .join('\n');
          console.log('errorMessages', errorMessages);
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      saveAs(out, 'output.docx');
    });
  }



}
