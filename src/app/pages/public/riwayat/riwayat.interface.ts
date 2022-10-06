export interface History {
  id: string;
  // TODO: tambahkan properti lain
}

export interface GetHistoriesResponse {
  results: History[],
  page: number,
  limit: number,
  totalPages: number,
  totalResults: number
}

export interface GetHistoriesParameter {
  name: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}