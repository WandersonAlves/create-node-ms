import { APIGatewayProxyResult } from 'aws-lambda';
import { IHttpResponse } from '../../shared/contracts';

export class ServerlessFactory {
  static LambdaResponse(response: IHttpResponse<any>): APIGatewayProxyResult {
    return {
      ...response,
      body: JSON.stringify(response?.body),
    };
  }
}
