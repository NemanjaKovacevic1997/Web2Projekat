import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  signInClick(username:string, password: string) {
    if(username.trim() == "" || password.trim() == "")
      return;
    
    this.loginService.login(username, password)
                     .subscribe(
                       (res: any) => {
                         this.router.navigateByUrl('/home');
                       },
                     );

    
  }
}
