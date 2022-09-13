import { User } from "./user.interface";

export interface LoginResponse {
  user          : User;
	tokens    		: Tokens;
}

export interface RegisterResponse {
  user          : User;
	tokens    		: Tokens;  
}

export interface Tokens {
  access        : Token;
	refresh    		: Token;
}

export interface Token {
  expires       : string;
	token      		: string;
}

