import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';

@Injectable({
  providedIn: 'root'
})
export class UnregisteredUserAuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
    if(this.loginService.userRole != UserRole.Unregistered) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
