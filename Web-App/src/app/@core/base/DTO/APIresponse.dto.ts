export interface APIResponseDTO<T> {
  statusCode: number;
  message: string;
  data: T;
  time: Date;
}

export interface APIStringResponseDTO{
  message: string;
}

export interface APIArrayResponseDTO<T> {
  statusCode: number;
  message: string;
  data: APIArrayContent<T>;
  time: Date;
}

export interface APIArrayContent<T>{
  size: number;
  content: T
}

export interface APIFeedbackResponseDTO {
  action: string;
  status: string;
  message: string;
  count ?: number;
}
