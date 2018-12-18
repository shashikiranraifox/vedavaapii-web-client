import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class AnnotatorAuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.loginService.isLoggedIn()) {
        return true;
      }
      const redirectUrl = next['_routerState']['url'];
      this.router.navigateByUrl(
        this.router.createUrlTree(
          ['annotator/login'], {
            queryParams: {
              redirectUrl
            }
          }

        )
      );

    return false;
  }
}
