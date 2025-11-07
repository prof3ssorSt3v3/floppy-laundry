export const log = console.log;

export class NetworkError extends Error {
  constructor(message, request, response) {
    super(message);
    this.name = 'NetworkError';
    this.status = response.status;
    this.req = request;
    this.res = response;
  }
}
