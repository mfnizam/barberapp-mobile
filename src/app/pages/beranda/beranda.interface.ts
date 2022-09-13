import { User } from "@core/interfaces/user.interface";

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