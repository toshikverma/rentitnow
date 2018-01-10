import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { JwtHelper } from "angular2-jwt";
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  errorValue: any;
  gotError: boolean;
  private invalidLogin: boolean;
  private initialLogin: boolean;
  private temp:String[];
  constructor(private auth:AuthService,
  private router:Router) { }

  ngOnInit() {
this.initialLogin=true;
this.gotError=false;
 }

status: { isopen: boolean } = { isopen: false };
 
  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
 
  change(value: boolean): void {
    this.status.isopen = value;
  }
  changeLoginTabs(value){

  if(value==true){
    this.initialLogin=true;
  }else
  this.initialLogin=false;
}

logIn(credentials) {
  this.gotError=false;
  if(credentials.email=="" || credentials.email==undefined || credentials.email==null || !(this.validateEmail(credentials.email))){
 this.gotError=true;
 this.errorValue="Email is empty or not Valid!"; 
 return false;
}

  if(credentials.password=="" || credentials.password==undefined || credentials.password==null ){
 this.gotError=true;
 this.errorValue="Password cannot empty!";
 return false; 
}
  console.log(credentials);
   this.invalidLogin = false;
    this.auth.addLogin(credentials)
      .subscribe(result => { 
        if (result){
        console.log(result.token);
         let jwthelper=new JwtHelper();
        let userDetails=jwthelper.decodeToken(result.token);
         localStorage.setItem("token", result.token);
         if(userDetails.userType==3)
         this.router.navigate(['/admin']);
         if(userDetails.userType==0)
         this.router.navigate(['/profile']);
        }else  
          this.invalidLogin = true; 
      },
      error=>{
      console.log(error);
      this.invalidLogin = true;
      this.gotError=true; 
      this.errorValue=error.error.message;
      })
  //console.log("am here");
}
 showLogin(){
    return !this.auth.isLoggedIn();

  }
  logOut(){
    let jwthelper=new JwtHelper();
    let userDetails=jwthelper.decodeToken(localStorage.getItem('token'));
   this.auth.logout(userDetails.email,userDetails.token);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
}
