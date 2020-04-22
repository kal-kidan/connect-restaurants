import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss={
   login:'http://localhost:8000/api/auth/login',
   signup:'http://localhost:8000/api/auth/signup'
  }

  constructor() { }
  handle(token){
    this.set(token);

  }
  set(token){
    localStorage.setItem('token',token);
  }
  get(){
    return localStorage.getItem('token');
  }
  romove(){
    localStorage.removeItem('token');
  }
  isValid(){
    const token=this.get();
    if(this.get()){
      const payload=this.getPayLoad(token);
      if(payload){
        // console.log("the payload iss ", Object.values(this.iss));
        // console.log("\n", payload.iss);
        // console.log("\n", Object.values(this.iss).indexOf(payload.iss));
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;

      } 
    }
    return false; 
  }

  getPayLoad(token){
      var payload= token.split('.')[1];
      payload=JSON.parse(atob(payload));
      return payload; 

  }
  loggedIn(){
    return this.isValid();
  }
   
}
