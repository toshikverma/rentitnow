import { Component, OnInit } from '@angular/core';
import { CollegeService } from "../services/college.service";
import { NotFoundError } from "../common/not-found-error";
import { AppError } from "../common/app-error";
import { CityService } from "../services/city.service";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.scss']
})
export class AddCollegeComponent implements OnInit {
  userDetails: any;
  jwtHelper: any;

  constructor(private service:CollegeService,private city:CityService) { }
posts:any[];
 obj:object;
 cities:any[];
 gotError:boolean;
 errorValue:String;
 private localdata:object;
  ngOnInit():void {
  this.gotError=false;
 
    
    this.city.getAll(this.obj).subscribe(response=>{
      this.cities=response.cities;
    });
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  addCollege(title:HTMLInputElement,city:HTMLSelectElement){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
    let post={
      "token":this.userDetails.token,
      "email":this.userDetails.email,
      "name":title.value,
      "city":city.value
    };
    console.log(post);
    this.service.create(post).subscribe(
      response=>{
        console.log(response);
              this.posts.splice(0,0,response);
            title.value="";
            },(error:AppError)=>{
    this.posts.splice(0,1);

            });

  }
  updateCollege(obj,title:HTMLInputElement,city){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
   obj.name=title.value;
    obj.token=this.userDetails.token;
      obj.email=this.userDetails.email;
      obj.city=city;

    this.service.update(obj._id,obj).subscribe(response=>{
      console.log(response);
      title.value="";

    });
    
  }
  deleteCollege(obj){
     this.gotError=false;
  obj.email=this.userDetails.email;
    obj.token=this.userDetails.token;
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

  }

loadColleges(id){
  console.log("am here");
   this.obj={cityId:id};
this.service.getAll(this.obj).subscribe(response=>{
      this.posts=response.college.reverse();
    });
  
}
}