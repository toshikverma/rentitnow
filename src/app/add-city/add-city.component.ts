import { Component, OnInit } from '@angular/core';
import { CityService } from "../services/city.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import {JwtHelper} from 'angular2-jwt'

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  constructor(private service:CityService) { 
  
  }
 posts:any[];
 obj:object;
 userDetails:any;
 jwtHelper:any;
 gotError:boolean;
 errorValue:String;
 private localdata:object;
  ngOnInit():void {
  this.gotError=false;
    this.service.getAll(this.obj).subscribe(response=>{
      this.posts=response.cities.reverse();
    });
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  addCity(title:HTMLInputElement){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
      let jwtHelper=new JwtHelper();
    
    let post={
    
      "token":this.userDetails.token,
      "email":this.userDetails.email,
      "name":title.value
    };
    console.log(post);
    this.service.create(post).subscribe(
      response=>{
        
              this.posts.splice(0,0,response);
            title.value="";
            },(error:AppError)=>{
   alert("City not added!")

            });

  }
  updateCity(obj,title:HTMLInputElement){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
   obj.name=title.value;
    obj.token=this.userDetails.token,
      obj.email=this.userDetails.email,
    this.service.update(obj._id,obj).subscribe(response=>{
      console.log(response);
      title.value="";

    });
    
  }
  deleteCity(obj){
     this.gotError=false;
    obj.token=this.userDetails.token;
      obj.email=this.userDetails.email;
    let index=this.posts.indexOf(obj);
    this.posts.splice(index,1);
this.service.delete(obj._id,obj.token,obj.email).subscribe(response=>{
console.log(response);
},(error:AppError)=>{
  this.posts.splice(index,0,obj);
  
  if(error instanceof NotFoundError){
    alert('This Post is already deleted!');
  }else{
    console.log("i was nnnn")
    throw error;
  }
}

);

  }}