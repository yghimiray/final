import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartyService } from './party.service';
import { VoucherService } from './voucher.service';


@Component({
  selector: 'app-receipt',
  template: `
  <div class="flex-container">

  <div class="flex-child-Index">
    <h3 ><a [routerLink]="['/','purchase']" >Purchase</a></h3>
    <br>
    <h3><a [routerLink]="['/','purchasereturn']">Purchase Return</a></h3>
    <br>
    <h3 ><a [routerLink]="['/','sales']">Sales</a></h3>
    <br>
    <h3 ><a [routerLink]="['/','salesreturn']">Sales Return</a></h3>
    <br>
    
    <h3><a [routerLink]="['/','payment']">Payment</a></h3>
    <br>
    <h3 style="font-weight: bold; font-size: 20px; color: green" ><a [routerLink]="['/','receipt']">Receipt</a></h3>
    <br>
    <h3><a [routerLink]="['/','journal']"> Journal </a></h3>
    <br>
    
    <h3><a [routerLink]="['/','reports']">Reports</a></h3>
  </div>


  <div class="flex-child">
  <h1 >Receipt </h1>
  
  <form [formGroup]="receiptForm" >
  <div>
  <label for = "date" >Date: {{date | date: 'MM/dd/yyyy' }}</label>
  <label style="margin-left:50px"  for = "billno" >Receipt No: Rec-{{voucherNo}}</label>
  
  <label style="margin-left:50px" for = "srparty" >Select Customer: </label>
  <select style="width: 180px; margin: 10px;" type = "text" class ="form-control" id ="srparty" formControlName = "name">
  <option *ngFor="let item of partyOptions; let i = index" [value]="partyOptions[i].name">{{item.name}}</option>
  </select>
 
  </div>
  <br>
  <div style="border-bottom: 5px solid green"></div>
  </form>

  <div *ngIf = "showTable" >
  <table style="width:100%">
  <tr>
    <th>Chk No.</th>
    <th>Chk Date</th>
    <th>Amount</th>
  </tr>
  <tr *ngFor="let item of allItems">
    <td>{{item.chkno}}</td>
    <td>{{item.chkdate}}</td>
    <td>&#36; {{item.amount.toLocaleString()}}</td>
  </tr>
</table>
<h3 style="position:relative; left:65%; color:green; font-weight:bold; text-align: right;">Grand Total = {{totalAmount.toLocaleString()}}</h3>
<button (click)="save()" style="color: green; margin-left:1px; " class="button" > Submit </button>
  </div>
  <br>
  <div *ngIf = "showItemTable" >
  <form [formGroup]="itemForm" >
  <div >
  <label for = "chkno" >Chk No.: </label>
  <input size="10" type = "text" class ="form-control" id ="chkno" formControlName = "chkno">
  <label style="margin-left:20px" for = "chkdate" >Chk Date: </label>
  <input size="10" type = "Date" class ="form-control" id ="chkdate" formControlName = "chkdate">
  <label style="margin-left:20px" for = "amount" >Amount: </label>
  <input style="width: 100px;" size="10" type = "number" class ="form-control" id ="amount" formControlName = "amount">
  <button (click)="ok()" style="color: green; margin-left:10px; " class="primary" > OK </button>
  </div>
  </form>
  </div>
  </div>

  </div>
  
  `,
  styles: [
    `
table, th, td {
  border:1px solid green;
  font-size: 15px;
  text-align: center;
  color: green;
}
/* input{
  position: relative;
  width: 25%;
} */

input[type='number']{
    width: 50px;
} 

label{
  font-size: 15px;
    font-weight: bold;
    color:green;

}
 .button {
  left:60%;
  position:relative;
  display: inline-block;
  padding: 6px 15px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: white;
  background-color: white;
  border: 5px solid #4CAF50;
  border-radius: 15px;
  box-shadow: 0 2px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
h3 {
    font-size: 14px;
    font-weight: lighter;
    display: inline-block;
    font-family:'Open Sans', sans-serif;
    margin:0;
    line-height: 2.0;
    text-shadow: 4px 4px 4px grey;
    color: brown;
    cursor: pointer;
    margin-right: 42px;
}


h1 {
   text-align: center;
   color:green;
}
.flex-container {
    display: flex;
}

.flex-child {
    margin-right: 20px;
    margin-top:5px;
    column-width: 800px;
    /* flex: 1; */
    /* border: 5px solid rgb(252, 7, 7); */
}  

.flex-child-Index {
    margin-right: 20px;
    margin-top: 100px;
    column-width: 200px;
    /* color: brown; */
    border-right: 10px solid green;
  height: 300px;
    /* flex: 1; */
    /* border: 5px solid rgb(252, 7, 7); */
}  

.flex-child:first-child {
    margin-right: 20px;
} 


    `
  ]
})

export class ReceiptComponent implements OnInit {
  showTable = false;
  showItemTable = false;
  date:Date = new Date()
  private subscription: Subscription[] = []
  receiptForm: FormGroup;
  itemForm: FormGroup;
  item: any;
  // existingItem: any;
  bill: any;
  allItems: any[] = []
  // itemOptions: any[] = []
  partyOptions: any[] = []
  totalAmount: number = 0;
  voucherNo:number = 0;
  user: any = localStorage.getItem('user')

  constructor(private formBuilder: FormBuilder,
    // private productService: ProductService,
    private partyService : PartyService,
    private voucherService : VoucherService,
    private router: Router
  ) {
    // this.subscription[0] = this.productService.searchAllProducts().subscribe((result: any) => {
    //   this.itemOptions = result
    //   console.log(result)
    // })

    
    this.subscription[1] = this.partyService.searchAllAccounts().subscribe((result: any) => {
      this.partyOptions = result
      console.log(result)
    })

    this.subscription[2] = this.voucherService.findLength().subscribe((result: any) => {
      this.voucherNo = result +1 
      console.log(this.voucherNo)
    })



    this.itemForm = formBuilder.group({
      chkno: [''],
      chkdate: [''],
      amount: [''],
    })
    this.subscription[4] = this.itemForm?.valueChanges.subscribe((result: any) => {
    this.item = result;
    })

    this.receiptForm = formBuilder.group({
      billno: [''],
      name: [''],
      trans: [''],
    })
    this.subscription[5] = this.receiptForm?.valueChanges.subscribe((result: any) => {
      this.showItemTable = true;
      console.log(result)
    })

  }

  ngOnInit(): void {
  }

  ok() {
    this.allItems.push(this.item)
    this.totalAmount = this.totalAmount + this.item.amount;
    console.log(this.allItems)
    this.makeBill()
    this.showTable = true;
  }

  makeBill() {
    const tempBill = this.receiptForm.value
    const billno = "Rec-" + this.voucherNo;
    const trans:any = {}
    this.bill = {...tempBill,trans,billno}
    this.bill.items = this.allItems;
    this.subscription[6] = this.partyService.searchAccountByName(tempBill.name).subscribe((result:any)=>{
      const existingAccount = result;
      const existingtrans = existingAccount.trans;
      const length = existingtrans.length - 1;
      const existingclBal = existingtrans[length].clBal;
      this.bill.trans.opBal =existingclBal;
      this.bill.trans.date = this.date;
      this.bill.trans.desc = "Rcpt";
      this.bill.trans.billno = "Rec-" + this.voucherNo;
      this.bill.trans.Dr = 0;
      this.bill.trans.Cr = this.totalAmount;
      this.bill.trans.clBal = Number(this.bill.trans.opBal*1) + Number(this.bill.trans.Dr * 1) - Number(this.bill.trans.Cr * 1);
      this.bill.trans.items = this.allItems;
      this.bill.trans.user = this.user;
    })
  }


  save() {
    
    this.subscription[8] = this.partyService.addTransactions(this.bill.name, this.bill.trans).subscribe((result:any)=>{
      console.log(result)
      console.log(this.bill)
    })

    this.subscription[9] = this.voucherService.addVoucher(this.bill).subscribe((result:any)=>{
      console.log(result)
    })

    window.location.reload()
  }


  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe())
  }


}
