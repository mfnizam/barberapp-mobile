export interface Order {
  id: string;
  // TODO: tambahkan properti lain
}

export interface GetOrdersResponse {
  results: Order[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

export interface GetOrdersParameter {
  name: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}