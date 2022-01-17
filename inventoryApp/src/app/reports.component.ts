import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
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
    
    <h3 style="font-weight: bold; font-size: 20px; color: green" ><a [routerLink]="['/','reports']">Reports</a></h3>
  </div>

  <div class="flex-child">
  <h1 >Reports</h1>
  <h3><a style="cursor: pointer; font-size: 20px;" [routerLink]="['/','inventories']">Inventory Report</a></h3>
  <br>
  <h3><a style="cursor: pointer; font-size: 20px;" [routerLink]="['/','allparties']">Party's Report</a></h3>
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
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
