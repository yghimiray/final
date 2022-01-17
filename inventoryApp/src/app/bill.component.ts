import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { VoucherService } from './voucher.service';

@Component({
  selector: 'app-bill',
  template: `
  <div class="flex-container">

  <div class="flex-child-Index">
    <h3 ><a [routerLink]="['/','purchase']" >Purchase</a></h3>
    <br>
    <h3><a [routerLink]="['/','purchasereturn']">Purchase Return</a></h3>
    <br>
    <h3><a [routerLink]="['/','sales']">Sales</a></h3>
    <br>
    <h3><a [routerLink]="['/','salesreturn']">Sales Return</a></h3>
    <br>
    
    <h3><a [routerLink]="['/','payment']">Payment</a></h3>
    <br>
    <h3><a [routerLink]="['/','receipt']">Receipt</a></h3>
    <br>
    <h3><a [routerLink]="['/','journal']"> Journal </a></h3>
    <br>
    
    <h3 style="font-weight: bold; font-size: 20px; color: green"><a [routerLink]="['/','reports']">Reports</a></h3>
  </div>


<div class="flex-child">
<h1 >Voucher No. {{billno}} </h1>
<h4><a style="cursor: pointer; color: blue" (click)="back()">Back</a></h4>

<table style="width:100%">
  <tr>
    <th>Date:</th>
    <td>{{transaction.date | date: 'MM/dd/yyyy'}}</td>
  </tr>
  <tr>
    <th>Party:</th>
    <td>{{item.name}}</td>
  </tr>
  <tr>
    <th>Description:</th>
    <td>{{transaction.desc}}</td>
  </tr>
  <tr>
    <th>Debit $:</th>
    <td>{{transaction.Dr}}</td>
  </tr>
  <tr>
    <th>Credit $:</th>
    <td>{{transaction.Cr}}</td>
  </tr>
  <tr>
    <th>User:</th>
    <td>{{transaction.user}}</td>
  </tr>
</table>

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

export class BillComponent implements OnInit {
  billno : any;
  item : any;
  transaction: any;
  private subscription: Subscription[] = []


  constructor(private router :Router,
    private location : Location,
    private voucherService : VoucherService,
    ) { 
    const result :any = this.router.getCurrentNavigation()?.extras.state
    this.billno = result.billno;
    console.log(this.billno)
    
  }

  ngOnInit(): void {
    this.subscription[0] = this.voucherService.searchVoucherByNumber(this.billno).subscribe((result: any) => {
      this.item = result;
      this.transaction = result.trans;
      console.log(this.item)
      console.log(this.transaction)
    })
  }

  back(){
    this.location.back()
  }

}
