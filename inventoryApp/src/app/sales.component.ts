import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartyService } from './party.service';
import { ProductService } from './product.service';
import { VoucherService } from './voucher.service';


@Component({
  selector: 'app-sales',
  template: `
  <div class="flex-container">

  <div class="flex-child-Index">
    <h3 ><a [routerLink]="['/','purchase']" >Purchase</a></h3>
    <br>
    <h3><a [routerLink]="['/','purchasereturn']">Purchase Return</a></h3>
    <br>
    <h3 style="font-weight: bold; font-size: 20px; color: green"><a [routerLink]="['/','sales']">Sales</a></h3>
    <br>
    <h3><a [routerLink]="['/','salesreturn']">Sales Return</a></h3>
    <br>
    
    <h3><a [routerLink]="['/','payment']">Payment</a></h3>
    <br>
    <h3><a [routerLink]="['/','receipt']">Receipt</a></h3>
    <br>
    <h3><a [routerLink]="['/','journal']"> Journal </a></h3>
    <br>
    
    <h3><a [routerLink]="['/','reports']">Reports</a></h3>
  </div>


  <div class="flex-child">
  <h1 >Sales Invoice</h1>
  <form [formGroup]="addPartyForm" >
        <div class = "form-group">
        <label for = "newcustomer" >New Customer ?: </label>
        <input  type = "text" class ="form-control" id ="newcustomer" formControlName = "name" placeholder="New Customer " >
        <button (click)="addCustomer()" style="color: green; margin-left:10px" class="primary" >Add </button>
        <label style="color: red " >{{message}}</label>
      </div>
      </form>



  <form [formGroup]="salesForm" >
  <div>
  <label for = "date" >Date: {{date | date: 'MM/dd/yyyy' }}</label>
  <!-- <input style="margin-left:26px" type = "date" class ="form-control" id ="date" formControlName = "date" > -->
  <label style="margin-left:50px"  for = "billno" >Invoice No: Sales-{{voucherNo}}</label>
  <!-- <input size="10" type = "text" class ="form-control" id ="billno" formControlName = "billno"> -->
  
  <label style="margin-left:50px" for = "party" >Select Customer: </label>
  <select style="width: 180px; margin: 10px;" type = "text" class ="form-control" id ="party" formControlName = "name">
  <option *ngFor="let item of partyOptions; let i = index" [value]="partyOptions[i].name">{{item.name}}</option>
  </select>
 
  </div>
  <br>
  <div style="border-bottom: 5px solid green"></div>
  </form>

  <div *ngIf = "showTable" >
  <table style="width:100%">
  <tr>
    <th>Items</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Amount</th>
  </tr>
  <tr *ngFor="let item of allItems">
    <td>{{item.name}}</td>
    <td>{{item.qty}}</td>
    <td>&#36; {{item.price.toLocaleString()}}</td>
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
  <label for = "item" >Item: </label>
  <select style="width: 180px; " type = "text" class ="form-control" id ="item" formControlName = "name">
  <option *ngFor="let elem of itemOptions; let i = index" [value]="itemOptions[i].name">{{elem.name}}</option>
  </select>
  <label style="margin-left:20px" for = "qty" >Qty: </label>
  <input size="4" type = "number" class ="form-control" id ="qty" formControlName = "qty">
  <label style="margin-left:20px" for = "price" >Price: </label>
  <input size="5" type = "number" class ="form-control" id ="price" formControlName = "price">
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
export class SalesComponent implements OnInit {
  showTable = false;
  showItemTable = false;
  addPartyForm:FormGroup;
  date:Date = new Date()
  private subscription: Subscription[] = []
  salesForm: FormGroup;
  itemForm: FormGroup;
  item: any;
  existingItem: any;
  bill: any;
  allItems: any[] = []
  itemOptions: any[] = []
  partyOptions: any[] = []
  totalAmount: number = 0;
  voucherNo:number = 0;
  message:string = ''
  user: any = localStorage.getItem('user')

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private partyService : PartyService,
    private voucherService : VoucherService,
    private router: Router
  ) {
    this.subscription[0] = this.productService.searchAllProducts().subscribe((result: any) => {
      this.itemOptions = result
      console.log(result)
    })

    
    this.subscription[0] = this.partyService.searchAllAccounts().subscribe((result: any) => {
      this.partyOptions = result
      console.log(result)
    })

    this.subscription[0] = this.voucherService.findLength().subscribe((result: any) => {
      this.voucherNo = result +1 
      console.log(this.voucherNo)
    })


    this.addPartyForm = formBuilder.group({
      'name':[''],
      'trans':[''],
    })
    this.subscription[0]= this.addPartyForm?.valueChanges.subscribe((result:any)=>{
      console.log(result)
    })

    this.itemForm = formBuilder.group({
      name: [''],
      qty: [''],
      price: [''],
      trans: [''],
    })
    this.subscription[2] = this.itemForm?.valueChanges.subscribe((result: any) => {

      // console.log(this.item)
    })

    this.salesForm = formBuilder.group({
      // date: [''],
      billno: [''],
      name: [''],
      trans: [''],
      // total: ['']
    })
    this.subscription[3] = this.salesForm?.valueChanges.subscribe((result: any) => {
    this.showItemTable = true;
      console.log(result)
    })

  }

  ngOnInit(): void {
  }

  ok() {
    const tempBill = this.salesForm.value
    const tempItem = this.itemForm.value;
    const trans:any= {};
    this.item = {...tempItem, trans}
    this.item.amount = this.item.qty * this.item.price;
    this.item.trans.date = this.date;
    this.item.trans.party = tempBill.name;
    this.item.trans.billno = "Sales-" + this.voucherNo;
    this.item.trans.amount = this.item.amount;
    this.item.trans.price = this.item.price;
    this.item.trans.user = this.user;
    
    this.subscription[4] = this.productService.searchProductByName(this.item.name).subscribe((result: any) => {
      this.existingItem = result
      const existingtrans = this.existingItem.trans
      const length = existingtrans.length - 1;
      const existingclBal = existingtrans[length].clBal
      this.item.trans.opBal = existingclBal
      this.item.trans.Dr = 0;
      this.item.trans.Cr = this.item.qty;;
      this.item.trans.desc = "Sales"
      this.item.trans.clBal = this.item.trans.opBal + Number(this.item.trans.Dr * 1) - Number(this.item.trans.Cr * 1)
      if(existingclBal < this.item.qty){
        this.message = "Insufficient Inventory";
      }
    })
    this.allItems.push(this.item)
      this.totalAmount = this.totalAmount + this.item.amount;
      this.makeBill()
    console.log(this.allItems)
    this.showTable = true;
  }


  makeBill() {
    const tempBill = this.salesForm.value
    const billno = "Sales-" + this.voucherNo;
    const trans:any = {}
    this.bill = {...tempBill,trans,billno}
    this.bill.items = this.allItems;
    this.subscription[6] = this.partyService.searchAccountByName(tempBill.name).subscribe((result:any)=>{
      const existingAccount = result;
      const existingtrans = existingAccount.trans;
      const length = existingtrans.length - 1;
      const existingclBal = existingtrans[length].clBal;
      // this.bill.name = tempBill.party;
      this.bill.trans.opBal =existingclBal;
      this.bill.trans.date = this.date;
      this.bill.trans.desc = "Sales.";
      this.bill.trans.billno = "Sales-" + this.voucherNo;
      this.bill.trans.Dr = this.totalAmount;
      this.bill.trans.Cr = 0;
      this.bill.trans.clBal = Number(this.bill.trans.opBal*1) + Number(this.bill.trans.Dr * 1) - Number(this.bill.trans.Cr * 1);
      this.bill.trans.items = this.allItems;
      this.bill.trans.user = this.user;
    })
  }


  save() {
    if(this.message === "Insufficient Inventory"){
      this.message = "Insufficient Inventory! Cannot be saved."
    }else{


      for(let item of this.allItems){
        this.subscription[5] = this.productService.addAllTransactions(item.name, item.trans).subscribe((result:any)=>{
          console.log(result)
          console.log(this.allItems)
        })
      }
  
      this.subscription[6] = this.partyService.addTransactions(this.bill.name, this.bill.trans).subscribe((result:any)=>{
        console.log(result)
        console.log(this.bill)
      })
  
      this.subscription[6] = this.voucherService.addVoucher(this.bill).subscribe((result:any)=>{
        console.log(result)
      })
  
      window.location.reload()
  
    }
  }

  addCustomer(){
    const tempParty = this.addPartyForm.value;
    const trans : any[] = [{
      desc:"Op. Bal.",
      opBal:0,
      clBal:0
    }]
    const party = {...tempParty, trans}
    this.subscription[1]= this.partyService.addAccount(party).subscribe((result:any)=>{
      if(! result.success){
        this.message = "This Customer already exists in your database !"
      }else{
        window.location.reload()  
        }
      console.log(result)
    })  
  }

  ngOnDestroy() {
    this.subscription.forEach(item => item.unsubscribe())
  }

}
