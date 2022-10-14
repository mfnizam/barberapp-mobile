export interface User {
  id            : string;
	name      		: string;
  gender       ?: number;
  dateOfBirth  ?: Date;
  phoneNumber  ?: string;
  address       : string;
  email 				: string;
  role          : string;
  barber        : Barber; // it can be multiple inteface
}

export interface Barber {
  active        ?: boolean;
  price         : number;
  detail        : string;
  workingHours  : any;
}

export interface WorkingHours { 
  dayOfWeek : number,
  hourStart : number,
  hourEnd   : number,
  close     : boolean
}