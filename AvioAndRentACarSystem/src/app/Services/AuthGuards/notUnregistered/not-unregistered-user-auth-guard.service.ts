import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../Login/login.service';
import { UserRole } from 'src/app/AirlineModel/userRole';

@Injectable({
  providedIn: 'root'
})
export class NotUnregisteredUserAuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
    if(this.loginService.userRole != UserRole.Unregistered) {
      console.log('NotUnregisteredUserAuthGuardService => userRole: ' + this.loginService.userRole + ', result: true');
      return true;
    }
    console.log('NotUnregisteredUserAuthGuardService => userRole: ' + this.loginService.userRole + ', result: false');
    this.router.navigate(['/home']);
    return false;
  }
}

