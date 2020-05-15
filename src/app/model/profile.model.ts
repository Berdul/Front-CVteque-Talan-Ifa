export class Profile {
  public _embedded : any;
	public profileId: number;
	public links: string[];
	public photoFileName: string;
	public profilePassword: string;

	constructor(public firstName : string,
				public lastName : string,
				public nationality: string,
				public dateOfBirth: string,
				public address: string,
				public zip: number,
				public phoneNumber: number,
				public email: string,
				public profileMainType: number){}
}
