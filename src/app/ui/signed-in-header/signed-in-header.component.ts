import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EndpointsService } from 'src/app/endpoints.service';
import { Router } from '@angular/router';
import { LoginService } from '../annotator-login/login.service';

@Component({
  selector: 'app-signed-in-header',
  templateUrl: './signed-in-header.component.html',
  styleUrls: ['./signed-in-header.component.scss']
})
export class SignedInHeaderComponent implements OnInit {

  constructor(private endpointService: EndpointsService, private http: HttpClient
    , private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
  }

  /**
   * Simple Method to logout from Service. Easy to make call from html file
   */
  logoutFromService(){

    this.loginService.logout(
      responseFlag => {
        if(responseFlag){
          this.loginService.removeLoginToken();
          this.router.navigate(['annotator/login']);
        }else{
          //TODO: Show error message
          alert('Unable to logout. Please retry or check with the platform administrator.')
        }
      }
    );

  }


}
