import { Component, OnInit } from '@angular/core';
import { CityService } from "../services/city.service";
import { CollegeService } from "../services/college.service";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  posts: any;
  cities: any;
  obj:object;
  gotError:boolean;
  registerTrue:boolean;
  errorValue:String;
  constructor(private city:CityService,private collegeService:CollegeService,private user:UserService) { }

  ngOnInit() {
    this.gotError=false;
    this.registerTrue=true;
    this.city.getAll(this.obj).subscribe(response=>{
      this.cities=response.cities;
    });
  }

loadColleges(id){
  console.log("am here");
   this.obj={cityId:id};
   this.collegeService.getAll(this.obj).subscribe(response=>{
   this.posts=response.college.reverse();
    });
  
}
addUser(obj){
  this.gotError=false;
  if(obj.fname==null || obj.fname=="" ||obj.fname==undefined ){
    this.gotError=true;
  this.errorValue="First Name cannot be empty";
  return false;
}
if(obj.email==null || obj.email=="" ||obj.email==undefined || !(this.validateEmail(obj.email))){
    this.gotError=true;
  this.errorValue="Email entered is not proper or empty!";
  return false;
}
if(obj.city==null || obj.city=="" ||obj.city==undefined ){
    this.gotError=true;
  this.errorValue="City cannot be empty";
  return false;
}
if(obj.college==null || obj.college=="" ||obj.college==undefined ){
    this.gotError=true;
  this.errorValue="College cannot be empty";
  return false;
}
if(obj.password==null || obj.password=="" ||obj.password==undefined ){
    this.gotError=true;
  this.errorValue="Password cannot be empty";
  return false;
}
this.user.add(obj).subscribe(response=>{

  if(!(response.succes))
  {this.gotError=true;
  this.errorValue=response.message}else{
  this.registerTrue=false;
  }
});

}
validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
}
