import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/Login/login.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/User/user.service';
import { User } from '../AirlineModel/user';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  allUsers: Array<User>;

  constructor(public loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((ret)=>this.allUsers=ret as Array<User>);
  }

  signInClick(username:string, password: string) {

    var exist = false;

    if(username.trim() == "" || password.trim() == ""){
      alert("Please input all fields.");
      return;
    }   
    
    this.allUsers.forEach(user => {
      if(user.username === username && user.password === password){
        exist = true;
        return;
      }
    });
    
    if(exist){
      this.loginService.login(username, password).subscribe((res: any) => {this.router.navigateByUrl('/home');});
    }else{
      alert("Incorrect username or password.");
    }
  }
}
