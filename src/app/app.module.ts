import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AnnotatorLoginComponent } from './annotator-login/annotator-login.component';
import { EndpointsService } from './endpoints.service';

@NgModule({
  declarations: [
    AppComponent,
    AnnotatorLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    UiModule,
    HttpClientModule
  ],
  providers: [EndpointsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
