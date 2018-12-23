import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SignedInHeaderComponent } from './signed-in-header/signed-in-header.component';
import { SafePipe } from './safe.pipe';
import { AnnotatorLoginComponent } from './annotator-login/annotator-login.component';
import { HeaderComponent } from './header/header.component';
import { AddBookComponent } from './add-book/add-book.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ApplicationInfoPageComponent } from './application-info-page/application-info-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    SlickCarouselModule
  ],
  declarations: [LayoutComponent, 
    HeaderComponent,
    FooterComponent, 
    DashboardComponent, 
    HomeComponent, 
    SignedInHeaderComponent,
    SafePipe,
    AnnotatorLoginComponent,
    AddBookComponent,
    ApplicationInfoPageComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
