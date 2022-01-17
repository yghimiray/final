import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  template: `
<div class="flex-container">

      <div class="flex-child">
       <img src="../assets/images/Login-image.jpg" class="img1" >
       <br>
      <form [formGroup]="signInForm" >
      <div class = "form-group">
      <label for = "loginUsername" >Username: </label>
      <input type = "text" class ="form-control" id ="loginUsername" formControlName = "username" placeholder="Username">
      </div>
      <br/>
      <div class = "form-group">
      <label for = "LoginPassword" >Password: </label>
      <input type = "password" class ="form-control" id ="LoginPassword" formControlName = "password" placeholder="Password">
      </div>
      </form>
      <br>
      <button (click)="login()" class="button" >Login </button>
      </div>


      <div class="flex-child">
      <img src="../assets/images/SignUp.jpg" class="img2" >
      <br>
      <form [formGroup]="signUpForm" >
      <div class = "form-group">
      <label for = "fullName" >Full Name: </label>
      <input type = "text" class ="form-control" id ="fullName" formControlName = "fullname" placeholder="Full Name">
      </div>
      <br>
      <div class = "form-group">
      <label for = "SignUpUsername" >Username: </label>
      <input type = "text" class ="form-control" id ="SignUpUsername" formControlName = "username" placeholder="Username">
      </div>
      <br/>
      <div class = "form-group">
      <label for = "signUpPassword" >Password: </label>
      <input type = "password" class ="form-control" id ="signUpPassword" formControlName = "password" placeholder="Password">
      </div>
      </form>
      <br>
      <button  (click)="signUp()" class="button" >Sign Up</button>
    </div>
     
    </div>

<!-- <router-outlet></router-outlet> -->
  `,
  styles: [
`

input{
  position: absolute;
  /* left: 200px; */
  width: 25%;
}

 .button {
  left:65%;
  position:relative;
  display: inline-block;
  padding: 15px 25px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
h2 {
    font-size: 29px;
    font-weight: lighter;
    display: inline-block;
    font-family:'Open Sans', sans-serif;
    margin:0;
    margin-right: 42px;
}

.flex-container {
    display: flex;
}

.flex-child {
    margin-right: 20px;
    margin-top:5px;
    column-width: 500px;
    /* flex: 1; */
    /* border: 5px solid rgb(252, 7, 7); */
}  


.img1{      
     height: 200px;      
     width: 200px; 
     display: block;
    margin-left: auto;
    margin-right: auto;
} 


.img2{      
     height: 150px;      
     width: 150px; 
     display: block;
    margin-left: auto;
    margin-top: 30px;
    margin-right: auto;
} 


    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy{
  loggedUser:any;
  newUser:any;
  signInForm:FormGroup;
  signUpForm:FormGroup;
  private subscription : Subscription [] = [];

  constructor(private formBuilder : FormBuilder,
    private userService : UserService,
    private router : Router
    ){
    this.signInForm = formBuilder.group({
      'username':[''],
      'password':['']
    })
    this.subscription[0]= this.signInForm?.valueChanges.subscribe((result:any)=>{
     this.loggedUser = result
      console.log(this.loggedUser)
    })
    this.signUpForm = formBuilder.group({
      'fullname':[''],
      'username':[''],
      'password':['']
    })
    this.subscription[1]= this.signUpForm?.valueChanges.subscribe((result:any)=>{
      const tempUser = result;
      const role = "user"
      this.newUser = {...tempUser,role}
      console.log(this.newUser)
    })


  }

  ngOnInit(){

  }
  
  
  login(){
    this.subscription[2] = this.userService.login(this.loggedUser).subscribe((result:any)=>{
      console.log(result)
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', result.user.fullname)
      // console.log(this.loggedUser)
      this.router.navigate(['/','purchase'])
    })
  }

  signUp(){
    this.subscription[2] = this.userService.signUp(this.newUser).subscribe((result:any)=>{
      console.log(result)
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', result.user.fullname)
    })
    // this.router.navigate(['/','purchase'])
  }

ngOnDestroy(){
this.subscription.forEach(item=> item.unsubscribe())
}

}
