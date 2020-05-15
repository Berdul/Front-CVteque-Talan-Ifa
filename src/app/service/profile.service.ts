import { Injectable } from '@angular/core';
import { Profile } from '../model/profile.model';
import { Subject } from 'rxjs-compat';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})



export class ProfileService {

	private profiles: Profile[] = [] ;

	private profile

	private urlEmbedded = "_embedded.profiles";

	private profileUrl : string;

	profilesSubject = new Subject<Profile[]>();

  constructor(private http: HttpClient) {
    this.profileUrl = 'http://localhost:8080/profiles';
  }

  emitProfilesSubject(){
    this.profilesSubject.next(this.profiles);
  }

  findProfileById( id: number){
    console.log(">>profile.service findProfileById");
    return this.http.get<Profile>(this.profileUrl + "/" + id);
  }

  public findAllProfiles(): Observable<Profile[]>{
  return this.http.get<GetResponse>(this.profileUrl).pipe(
          map(response => response._embedded.profiles)
       );
  }

  public exportProfil(json) {
    console.log(">> profile.service exportProfile()");
    return this.http.post('http://localhost:8081/testapp/getdetails', json).subscribe(res => res);
  }
}

interface GetResponse{
  _embedded: {
    profiles: Profile[];
  }
}
