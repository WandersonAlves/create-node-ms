import { APIGatewayProxyResult } from 'aws-lambda';
import HttpResponse from '@shared/responses/HttpResponse';

export default class ServerlessResponse {
  static Lambda(response: HttpResponse<any>): APIGatewayProxyResult {
    return {
      ...response,
      body: JSON.stringify(response?.body),
    };
  }
}
