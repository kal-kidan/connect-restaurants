import { Injectable } from '@angular/core';
 import { RequestHandlerService } from './../services/request-handler.service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private iss={
   login:'http://localhost:8000/api/login',
   signup:'http://localhost:8000/api/signup'
  }

  constructor() { }

  set(token, id){
    localStorage.setItem('token',token);
    localStorage.setItem('id',id);
  }

  get(){
    return localStorage.getItem('token');
  }
  romove(){
    localStorage.clear();
    // localStorage.removeItem('token');
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
    const id = localStorage.getItem('id');;
    let data={id};
    return data;
  }


  loggedIn(){
    return this.isValid();
  }

}
