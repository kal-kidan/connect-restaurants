import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
public rootUrl="http://localhost:8000/api";
  constructor(private _http:HttpClient) { }

   customerSignUp(data){
    return this._http.post(`${this.rootUrl}/auth/signup`,data);
  }
  customerLogin(data){
    return this._http.post(`${this.rootUrl}/auth/login`,data);
  }
}
