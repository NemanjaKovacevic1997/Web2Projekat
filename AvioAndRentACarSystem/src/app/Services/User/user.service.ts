import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedUser : any; //za sad , posle User
  loggedUserType : string;
  userTypes = ['Unregistred', 'Regular', 'AdminAvio', 'AdminRAC', 'AdminSys'];

  constructor(){ 
    this.loggedUserType = 'Regular';
  }
}
