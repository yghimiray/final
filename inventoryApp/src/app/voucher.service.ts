import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  url:string = 'http://localhost:3000/vouchers/'

  constructor(private httpClient :HttpClient) {}

  addVoucher(voucher:any){
    return this.httpClient.post(this.url, voucher)
  }

  // searchAllVouchers(){
  //   return this.httpClient.get(this.url + 'allvouchers')
  // }  

  searchVoucherByNumber(number : number){
    return this.httpClient.get(this.url + number)
  }

  findLength(){
    return this.httpClient.get(this.url )
  }


}
