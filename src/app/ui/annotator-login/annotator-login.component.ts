import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annotator-login',
  templateUrl: './annotator-login.component.html',
  styleUrls: ['./annotator-login.component.scss']
})

/**
 * Has Methods to login as annotator.
 */
export class AnnotatorLoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    // if (this.loginService.isLoggedIn()) {
    //   this.router.navigate(['annotator/dashboard']);
    // }
  }

  /**
   *
   * Logs in to Server(as Annotator)
   * @memberof AnnotatorLoginComponent
   */
  login(input_annotator_email, input_annotator_password) {
    $('#annotator-login-error-text').css('display', 'none');
    if (input_annotator_email == null || input_annotator_email === '') {
      $('#annotator-login-error-text').css('display', 'block');
      $('#annotator-login-error-text').text('User name should not be empty.');
      return;
    }

    if (input_annotator_password == null || input_annotator_password === '') {
      $('#annotator-login-error-text').css('display', 'block');
      $('#annotator-login-error-text').text('Password should not be empty.');
      return;
    }

    $('#annotator-login-btn').attr('disabled', true);
    this.loginService.login(input_annotator_email, input_annotator_password,
      message => {
        $('#annotator-login-btn').attr('disabled', false);
        $('#annotator-login-error-text').css('display', 'block');
        if (message != null) {
          $('#annotator-login-error-text').text(message);
        }

       },
       token => {
          this.loginService.storeLoginToken(token);
          this.router.navigate(['annotator/dashboard']);
       } );
  }
} // end of class definition
