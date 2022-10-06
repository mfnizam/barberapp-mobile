export interface User {
  id            : string;
	name      		: string;
  gender       ?: number;
  dateOfBirth  ?: Date;
  phoneNumber  ?: string;
  address       : string;
  email 				: string;
  role         ?: string;
  roleDetail   ?: any;
}