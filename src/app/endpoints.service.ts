import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor() { }

  /**
   *
   * Returns the Base Server URL.
   * @returns String
   * @memberof EndpointsService
   */
  getBaseUrl() {
    return 'https://api.vedavaapi.org/py';
  }
}
