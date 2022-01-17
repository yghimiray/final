import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = 'http://localhost:3000/products/'

  constructor(private httpClient :HttpClient) {}

  addProduct(product:any){
    return this.httpClient.post(this.url, product)
  }

  searchAllProducts(){
    return this.httpClient.get(this.url)
  }  

  searchProductByName(name:string){
    return this.httpClient.get(this.url +'name/' + name)
  }

  addAllTransactions(name:string, trans:any){
    return this.httpClient.put(this.url + 'transactions/'+ name , trans)
  }


}
