import { User } from "@core/interfaces/user.interface";
import { Order } from "../pesanan/pesanan.interface";

export interface GetBarbersResponse {
  results: User[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

export interface GetBarbersParameter {
  name: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}


export interface GetOrdersResponse {
  results: Order[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

export interface GetOrdersParameter {
  status?: number;
  sortBy?: string;
  limit?: number;
  page?: number;
}