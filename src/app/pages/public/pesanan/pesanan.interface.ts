// move this file to shared interface folder (create shared interface or just use core interfaces)
import { Barber, User } from "@core/interfaces/user.interface";

export interface Order {
  id: string;
  barber: User;
  user: User;
  amount: number;
  price: number;
  review: Review;
}

export interface CreateOrderParameter {
  barber: string;
  user: string;
  amount: number;
  price: number;
}

export interface GetOrdersResponse {
  results: Order[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

export interface GetOrdersParameter {
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface Review{
  id: string;
  order: string,
  barber: Barber,
  user: User,
  star: number,
  content: string
}

export interface CreateReviewParameter{
  order: string;
  star: number;
  content: string; 
}

export interface GetReviewsResponse {
  results: Review[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

