import { Component, OnInit } from '@angular/core';
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { SubCategoryService } from "../services/sub-category.service";
import { CategoryService } from "../services/category.service";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  userDetails: any;
  jwtHelper: any;

  constructor(private service:SubCategoryService,private category:CategoryService) { }
posts:any[];
 obj:object;
 categories:any[];
 gotError:boolean;
 errorValue:String;
 private localdata:object;
  ngOnInit():void {
  this.gotError=false;
 
    
    this.category.getAll(this.obj).subscribe(response=>{
      this.categories=response.categories;
    });
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  addSubCategory(title:HTMLInputElement,category:HTMLSelectElement){
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
      "category":category.value
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
  updateSubCategory(obj,title:HTMLInputElement,category){
     this.gotError=false;
    if(title.value==""){

      this.gotError=true;
      this.errorValue="Field Cannot be empty";
      return false;
    }
   obj.name=title.value;
    obj.token=this.userDetails.token;
      obj.email=this.userDetails.email;

    this.service.update(obj._id,obj).subscribe(response=>{
      console.log(response);
      title.value="";

    });
    
  }
  deleteSubCategory(obj){
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

loadSubCategories(id){
  console.log("am here");
   this.obj={category:id};
this.service.getAll(this.obj).subscribe(response=>{
  console.log(response);
      this.posts=response.subCategories.reverse();
    });
  
}
}