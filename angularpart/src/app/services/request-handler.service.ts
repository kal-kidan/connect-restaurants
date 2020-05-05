import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
@Injectable({
  providedIn: 'root'
})
export class RequestHandlerService {
public rootUrl="http://localhost:8000/api"; 
  constructor(private _http:HttpClient, private token: TokenService) { }
  
   signup(data){
    return this._http.post(`${this.rootUrl}/signup`,data); 
  }
  customerLogin(data){
    return this._http.post(`${this.rootUrl}/login`,data);
 
  }

  registerVendor(data){
    return this._http.post(`${this.rootUrl}/vendor/register`,data); 
  }
  
  getToken(){
    return this.token.get();
  }

  setUser(){
 
  }
  getUser(){
    let id =  this.token.getData().id;
    let token = this.getToken();
    return this._http.post(`${this.rootUrl}/me`, {id}, {headers:{
      Authorization: `Bearer ${token}`
    }});
  }

   
  
  postFile(fileToUpload: File){
    const id = this.token.getData().id;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('id',id);
    return this._http.post(`${this.rootUrl}/vendor/updatecover`, formData);
  }

  addMenu(menu){
    return this._http.post(`${this.rootUrl}/vendor/addmenu`, menu);
  }



 
}
