import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-application-info-page',
  templateUrl: './application-info-page.component.html',
  styleUrls: ['./application-info-page.component.scss']
})
export class ApplicationInfoPageComponent implements OnInit {
  private app_type: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.app_type = params['app'];
    });
  }

  ngOnInit() {
    if (this.app_type != null && this.app_type == "smaps") {
      $("#application_title").text("Shaastra Maps");
      $("#app_desc_first_para").text("Shaastra Maps is an advanced feature in Vedavaapi, it connects words present in multiple books and verses.");
      $("#app_desc_second_para").css("display", "none");
    }
  }
  
}
