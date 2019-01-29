import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from '../../endpoints.service';

const LOGIN_TOKEN = 'login_token';

@Injectable({
  providedIn: 'root'
})


export class LoginService {


  constructor(private http: HttpClient, private endpointService: EndpointsService) {

  }

  /**
   *
   * Stores the login token to local storage.
   * @param {string} token
   * @memberof LoginService
   */
  storeLoginToken(token: string): void {
    localStorage.setItem(LOGIN_TOKEN, token);
  }

  /**
   * Removes the Login Token from Local Storage.
   */
  removeLoginToken(): void {
    localStorage.removeItem(LOGIN_TOKEN);
  }

  /**
   *
   * Returns true if user is logged in.
   * @returns {boolean}
   * @memberof LoginService
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(LOGIN_TOKEN) != null;
  }



  /**
   * POST request to set the working repository.
   *
   * @returns
   * @memberof LoginService
   */
  setRepository() {
    const httpUploadOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}), 
                        withCredentials: true };
    return this.http.post(this.endpointService.getBaseUrl() + '/store/v1/repos', 'repo_name=' + this.endpointService.getRepositoryName(),
     httpUploadOptions);
  }

  
  /**
   * Logout from the client.
   * @param successCB 
   * @param errorCB 
   */
  logout(callback: (responseFlag: boolean) => void) {
    this.http.get(this.endpointService.getBaseUrl() + '/users/v1/logout')
      .subscribe(
        response => {
          console.log('Logged out successfully');
          if(callback != null) {
            callback(true);
          }
        },
        error => {
          console.log('Could not logout from the vedavaapi service');
          if(callback != null) {
            callback(false);
          }
        }
      )
  }

  /**
   *
   * Login to server.
   * @param {*} $username
   * @param {*} $password
   * @memberof LoginService
   */
  login($username, $password, errorCB: (message: string) => void, successCB: (token: string) => void) {

    this.setRepository().subscribe(
      data => {
        const httpUploadOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
            withCredentials: true};
        this.http.post(this.endpointService.getBaseUrl() + '/users/v1/password_login',
        'user_id=' + $username + '&user_secret=' + $password,
         httpUploadOptions).subscribe(
          response => {
              console.log('Login API call success!! ');
              if (successCB != null) {
                successCB($username);
              }
          },
          error => {
            console.log('Login API call failed', error);

            const errorStr = JSON.stringify(error);
            let errorCode;
            JSON.parse(errorStr, (key, value) => {
                if ( key === 'code') {
                    errorCode = value;
                }
                return value;
            });

            if (errorCB != null) {
              if (errorCode === 401 ) {
                errorCB('Username or password incorrect. Please retry with the right credentials.');
              } else {
                errorCB('Unknown error, unable to login to Vedavaapi. Please retry after sometime.');
              }
            }
          }
        );
      },
      error => {
        console.log('Set Repository failed ', error);
        if (errorCB != null) {
          errorCB('Unable to initialize Vedavaapi service. Please retry after some time.');
        }
      }
    );

  }
}
