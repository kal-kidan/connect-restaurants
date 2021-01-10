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
    return this._http.post(`${this.rootUrl}/me`, {id}, {headers:{
      Authorization: `Bearer ${this.getToken()}`
    }});
  }



  postFile(fileToUpload: File){
    const id = this.token.getData().id;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('id',id);
    return this._http.post(`${this.rootUrl}/vendor/updatecover`, formData,
      {headers:{
        Authorization: `Bearer ${this.getToken()}`
      }});
  }

  addMenu(menu){
    return this._http.post(`${this.rootUrl}/vendor/addmenu`, menu, {headers:{
      Authorization: `Bearer ${this.getToken()}`
    }});
  }

  getMenu(){
    const id = this.token.getData().id;
    return this._http.post(`${this.rootUrl}/vendor/getmenu`, {id}, {headers:{
      Authorization: `Bearer ${this.getToken()}`
    }});
  }

  deleteMenu(id){
     return this._http.post(`${this.rootUrl}/vendor/deletemenu`,{id},{headers:{
      Authorization: `Bearer ${this.getToken()}`
     }});
  }

  addSchedule(schedule){
    return this._http.post(`${this.rootUrl}/vendor/addschedule`,schedule,{
      headers:{
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

  updateVendorStatus(status){
    const id = this.token.getData().id;
    return this._http.patch(`${this.rootUrl}/vendor/updatestatus`,{id,status},{
      headers:{
        Authorization: `Bearer ${this.getToken()}`
      }
    });
  }

 getSchedule(){
  const id = this.token.getData().id;
  return this._http.get(`${this.rootUrl}/vendor/schedule`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    },
    params:{id,status}
  },
  );
 }
 getStatus(){
  const id = this.token.getData().id;
  return this._http.get(`${this.rootUrl}/vendor/getstatus`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    },
    params:{id}
  },
  );
 }
 deleteSchedule(id){
  return this._http.delete(`${this.rootUrl}/vendor/deleteschedule`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    },
    params:{id}
  },
  );
 }

 getVendorInfo(id){
  return this._http.get(`${this.rootUrl}/vendor/${id}`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    }
  },
  );
 }
 getCarts(){
  const userId = this.token.getData().id;
  return this._http.get(`${this.rootUrl}/cart/user/${userId}`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    }
  },
  );
 }

 getTotal(){
  const userId = this.token.getData().id;
  return this._http.get(`${this.rootUrl}/cart/totalprice/user/${userId}`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    }
  },
  );
 }
 addToCart(data){
  const id = this.token.getData().id;
  data.user_id = parseInt(id);
  return this._http.post(`${this.rootUrl}/user/cart`, data,
  {
    headers:{
    Authorization: `Bearer ${this.getToken()}`
  }});
 }

 
 deleteCart(id){
  return this._http.delete(`${this.rootUrl}/user/cart/${id}`,
  {
    headers:{
    Authorization: `Bearer ${this.getToken()}`
  }});
 }
 addLocaton(data){
   data.user_id = this.token.getData().id;
   data.user_type = localStorage.getItem("role");
   data.latitude = localStorage.getItem("latitude");
   data.longitude = localStorage.getItem("longitude"); 
  // console.log(data);
  return this._http.put(`${this.rootUrl}/user/location`,data,
  {
    headers:{
    Authorization: `Bearer ${this.getToken()}`
  }});
 }

 getNearestVendors(latitude, longitude){
  return this._http.get(`${this.rootUrl}/user/nearest-vendor/${latitude}/${longitude}`,{
    headers:{
      Authorization: `Bearer ${this.getToken()}`
    }
  },
  );
 }

 placeOrder(order, orderItems){
  return this._http.post(`${this.rootUrl}/user/order`,{order, orderItems});
 }

}
