import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnnotatorLoginComponent} from './annotator-login/annotator-login.component';
import { DashboardComponent } from './ui/dashboard/dashboard.component';
import { AnnotatorAuthGuard } from './annotator-login/annotator-auth.guard';
import { HomeComponent } from './ui/home/home.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
