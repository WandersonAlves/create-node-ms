import { IHttpResponse } from '../../shared/contracts';

export class ServerlessFactory {
  static LambdaResponse(response: IHttpResponse<any>) {
    return {
      ...response,
      body: JSON.stringify(response?.body),
    };
  }
}
