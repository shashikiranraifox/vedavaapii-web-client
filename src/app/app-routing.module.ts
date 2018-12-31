import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { HomeComponent } from './ui/home/home.component';
import { AnnotatorLoginComponent } from './ui/annotator-login/annotator-login.component';
import { AnnotatorAuthGuard } from './ui/annotator-login/annotator-auth.guard';
import { AddBookComponent } from './ui/add-book/add-book.component';
import { ApplicationInfoPageComponent } from './ui/application-info-page/application-info-page.component';
import { LearnerLoginPageComponent } from './ui/learner-login-page/learner-login-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'annotator/login',
    component: AnnotatorLoginComponent
  },
  {
    path: 'annotator/dashboard',
    component: DashboardComponent,
    canActivate: [AnnotatorAuthGuard]
  },
  {
    path: 'annotator/add-book',
    component: AddBookComponent,
    canActivate: [AnnotatorAuthGuard]
  },
  {
    path: 'application/description',
    component: ApplicationInfoPageComponent
  },
  {
    path: 'learner/login',
    component: LearnerLoginPageComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
