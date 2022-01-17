import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:3000/users/'

  constructor(private httpClient :HttpClient) {}

  signUp(user:any){
    return this.httpClient.post(this.url, user)
  }

  login(user:any){
    return this.httpClient.post(this.url + 'login', user)
  }

  updateUser(user_id:any, user:any){
    return this.httpClient.put(this.url + user_id, user)
  }
  searchAllusers(){
    return this.httpClient.get(this.url)
  }  

  deleteUser(user_id:any){
    return this.httpClient.delete(this.url + user_id)
  }
  
}
