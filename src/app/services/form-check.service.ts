import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormCheckService {
  checkUsername(username:string){
    if(!username.trim()){
      return false;
    }
    return true;
  }
  checkPassword(password:string){
    if(!password.trim()||password.trim()!==password||password.length<8){
      return false;
    }
    return true;
  }
  checkEmail(email:string){
    const res=/^[a-z0-9](\.?[a-z0-9]){1,}@gmail\.com/.test(email);
    return res
  }
  constructor() { }
}
