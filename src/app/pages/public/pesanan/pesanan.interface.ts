// move this file to shared interface folder (create shared interface or just use core interfaces)
import { User } from "@core/interfaces/user.interface";

export interface Order {
  id: string;
  barber: User;
  user: User;
  amount: number;
  price: number;
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

