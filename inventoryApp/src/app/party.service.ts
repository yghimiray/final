import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PartyService {
  url:string = 'http://localhost:3000/accounts/'

  constructor(private httpClient :HttpClient) {}

  

  addAccount(account:any){
    return this.httpClient.post(this.url, account)
  }

  searchAllAccounts(){
    return this.httpClient.get(this.url)
  }  

  searchAccountByName(name:string){
    return this.httpClient.get(this.url +'name/' + name)
  }

  addTransactions(name:string, transactions:any){
    return this.httpClient.put(this.url + 'transactions/'+ name , transactions)
  }


}
