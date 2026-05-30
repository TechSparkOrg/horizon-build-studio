export type ApiWrapperResponse<T> = {
  result_code: string;
  result_description: string;
  result_message: string;
  results: T;
};