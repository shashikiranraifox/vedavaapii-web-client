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

  /**
   * Returns Instance of Mirador Host.
   * @returns String
   * @memberof EndpointsService
   */
  getMiradorInstanceUrl() {
    return 'http://localhost:8000';
  }
}
