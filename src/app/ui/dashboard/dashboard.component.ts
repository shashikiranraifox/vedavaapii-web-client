import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  iframeHtml = '<iframe title="Mirador" src="http://api.vedavaapi.org:8000/open_repo_manifests.html" allowfullscreen="true"'
  + ' width="100%" height="100%" style="height:1000px;border: 0px;"'
  + ' webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
  
  @ViewChild('mirador_iframe') miradorDiv: ElementRef;

  content = '<button (click)="onclick">This is a Clickable Span</button>';

  constructor(private renderer: Renderer2) {
    
  }

  ngOnInit() {
    this.renderer.setAttribute(this.miradorDiv.nativeElement, 'innerHTML', this.content);
  }

  onclick() {
    console.log('On Click!!!');
  }
}
