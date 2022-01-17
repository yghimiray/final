import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-party',
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
<h1 >{{account.name}} Account</h1>
<h4><a [routerLink]="['/','allparties']">Back</a></h4>
<table style="width:100%">
<tr>
 <th>Date</th>
 <th>Desc.</th>
 <th>V.N</th>
 <th>Op.Bal</th>
 <th>Dr.</th>
 <th>Cr.</th>
 <th>Cl.Bal</th>
</tr>
<tr  *ngFor="let trans of transactions" >
<td>{{trans.date | date: 'MM/dd/yyyy' }}</td>
 <td>{{trans.desc}}</td>
 <td><a [routerLink]="['/','bill']" [state]="{billno: trans.billno}">{{trans.billno}}</a></td>
 <!-- <td>{{trans.billno}}</td> -->
 <td>{{trans.opBal}}</td>
 <td>{{trans.Dr}}</td>
 <td>{{trans.Cr}}</td>
 <td>{{trans.clBal}}</td>
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

export class PartyComponent implements OnInit {
  account : any;
  transactions: any;

  constructor(private router :Router) { 
    const result :any = this.router.getCurrentNavigation()?.extras.state
    const resultItem = result.account;
    this.account = resultItem
    this.transactions = resultItem.trans;
    console.log(this.transactions)
  }

  ngOnInit(): void {
  }

}
