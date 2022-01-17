import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
  <h1>Inventory Accounting System &reg; </h1>
<button (click)="LogOut()" class="button"> Logout>></button>
<div style="border-bottom: 10px solid green"></div>
<router-outlet></router-outlet>


  `,
  styles: [
`
h1 {
   margin: 0;
   display: inline-block;
   color:green;
}
.button {
  left:90%;
  /* position:relative; */
  float: right;
  display: inline-block;
  padding: 10px 15px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 15px;
  box-shadow: 0 2px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

`
  ]
})
export class AppComponent implements OnInit, OnDestroy{

  constructor(private router:Router){}


  ngOnInit(){

  }
  
  LogOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/','home'])

  }
ngOnDestroy(){
}

}
