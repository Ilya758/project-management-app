export interface IResponceError {
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}
