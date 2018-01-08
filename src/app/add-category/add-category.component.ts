import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../services/category.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  userDetails: any;
  jwtHelper: any;

  constructor(private service:CategoryService) {
  
  }
 posts:any[];
 obj:object;
 gotError:boolean;
 errorValue:String;
 private localdata:object;
  ngOnInit():void {
  this.gotError=false;
    this.service.getAll(this.obj).subscribe(response=>{
      if(response!=undefined)
      this.posts=response.categories.reverse();
    });
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  addCategory(title:HTMLInputElement){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
    let post={
      "token":this.userDetails.token,
      "email":this.userDetails.email,
      "name":title.value
    };
    console.log(this.localdata);
    console.log(post);
    this.service.create(post).subscribe(
      response=>{
        
              this.posts.splice(0,0,response);
            title.value="";
            },(error:AppError)=>{
    this.posts.splice(0,1);

            });

  }
  updateCategory(obj,title:HTMLInputElement){
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
  deleteCategory(obj){
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