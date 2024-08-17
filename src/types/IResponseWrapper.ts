export interface IResponseWrapper<T> {
  result: {
    items: T[];
    paging?: {
      total: number;
    };
  };
}
