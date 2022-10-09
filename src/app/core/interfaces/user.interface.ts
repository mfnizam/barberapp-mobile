export interface User {
  id            : string;
	name      		: string;
  gender       ?: number;
  dateOfBirth  ?: Date;
  phoneNumber  ?: string;
  address       : string;
  email 				: string;
  role          : string;
  roleDetail    : Barber; // it can be multiple inteface
}

export interface Barber {
  active        : boolean;
  detail        : string;
  workingHours  : any;
}