import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../../Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserAuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
    if(this.loginService.userRole != UserRole.Registered) {
      if(this.loginService.userRole == UserRole.Unregistered || this.loginService.userRole == null)
        this.router.navigate(['/sign-in']);
      else
        this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
