export class Profile {
	public profileId: number;
	public photoFileName: string;

	constructor(public firstName : string,
				public lastName : string,
				public nationality: string,
				public dateOfBirth: string,
				public address: string,
				public zip: number,
				public phoneNumber: number,
				public email: string){}
}
