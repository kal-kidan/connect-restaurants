import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss={
   login:'http://localhost:8000/api/login',
   signup:'http://localhost:8000/api/signup' 
  }

  constructor() { }
 
  set(token, data){
    localStorage.setItem('token',token);
    localStorage.setItem('data',JSON.stringify(data));
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
  getData(){
    return localStorage.getItem('data');
  }


  loggedIn(){
    return this.isValid();
  }
   
}
