import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  /**
   * Backend Endpoint URL
   */
  private server_endpoint_url: string = 'https://api.vedavaapi.org/py';

  /**
   * Server API Version
   */
  private server_api_version: number = 0;

  /**
   * Mirador endpoint url.
   */
  private mirador_endpoint_url = 'http://localhost:8000/collection_test.html';

  /**
   * This property is applicable only for version 0 API version.
   */
  private repository_name: string = 'demo';
  
  /**
   * Default Constructor.
   */
  constructor() { }

  /**
   *
   * Returns the Base Server URL.
   * @returns String
   * @memberof EndpointsService
   */
  getBaseUrl(): string {
    return this.server_endpoint_url;
  }

  /**
   * Returns Instance of Mirador Host.
   * @returns String
   * @memberof EndpointsService
   */
  getMiradorInstanceUrl(): string {
    return this.mirador_endpoint_url;
  }

  /**
   * Returns the Server API Version.
   */
  getServerAPIVersion(): number {
    return this.server_api_version;
  }

  /**
   * Returns the repository name.
   */
  getRepositoryName(): string {
    return this.repository_name;
  }
}
