import {Injectable, ViewChild} from '@angular/core';
import { Profile } from '../model/profile.model';
import { Subject} from 'rxjs-compat';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {
	
  //fields
	private profiles: Profile[] = [] ;
	private profileUrl : string ='http://localhost:8080/api/profiles';
	profilesSubject = new Subject<Profile[]>();


	//constructor
  constructor(private http: HttpClient) {
    this.profileUrl;
  }

  //subject
  emitProfilesSubject(){
    this.profilesSubject.next(this.profiles);
  }

  //Find All
  public findAllProfiles(): Observable<Profile[]>{
    return this.http.get<GetResponse>(this.profileUrl).pipe(
      map(response => response._embedded.profiles)
    );
  }

  //Find By Id
  findProfileById( id: number){
    console.log(">>profile.service findProfileById");
    return this.http.get<Profile>(this.profileUrl + "/" + id);
  }

  searchProfiles(theKeyword: string): Observable<Profile[]> {
    
    const searchUrl =`${this.profileUrl}/search/findByLastNameContaining?lastName=${theKeyword}`;
    return this.http.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.profiles)
    );
	}
}

//Interface
interface GetResponse{
  _embedded: {
    profiles: Profile[];
  }
}
