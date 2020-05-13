export class Profile {

	public links: string[];
	public photoFileName: string;
	public profilePassword: string;
	
	constructor(public firstName : string,
				public lastName : string,
				public nationality: string,
				public dateOfBirth: string,
				public adress: string,
				public zip: number,
				public phoneNumber: number,
				public email: string,
				public profileMainType: number){}


}