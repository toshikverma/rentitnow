import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from "../services/category.service";
import { SubCategoryService } from "../services/sub-category.service";

@Component({
  selector: 'app-approve-products',
  templateUrl: './approve-products.component.html',
  styleUrls: ['./approve-products.component.scss']
})
export class ApproveProductsComponent implements OnInit {
  subcategories: any;
  obj: Object;
  categories: any;
  image4: any;
  image3: any;
  image2: any;
  image1: any;
  linkAddress: any;
  userDetails: any;
  jwtHelper: JwtHelper;
  posts: Array<any> = [];

  constructor(private products:ProductService,public sanitizer: DomSanitizer,private category:CategoryService,private subcat:SubCategoryService) { }

  ngOnInit() {
    this.category.getAll(this.obj).subscribe(response=>{
      this.categories=response.categories;
    });
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
     this.products.customQuery(this.userDetails.token+'/%7B"productApproved":0%7D/date/1').subscribe(response=>{
      this.posts=response.products;
    });
  }
putImages(a,b,c,d){
  this.image1=a;
  this.image2=b;
  this.image3=c;
  this.image4=d;

}
setLink(link){
console.log(link);
  this.linkAddress=link;
}
approveImage(obj){
  obj.email=this.userDetails.email;
  obj.token=this.userDetails.token;
  if(obj.imageApproved==0){
  this.products.approveImage(obj).subscribe(response=>{
    if(response.status==200){
      obj.imageApproved=1;
    }
  })
 }else{

   this.products.rejectImage(obj).subscribe(response=>{
    if(response.status==200){
      obj.imageApproved=0;
    }
  })
 }

}
approveLink(obj){
  obj.email=this.userDetails.email;
  obj.token=this.userDetails.token;
  if(obj.linkApproved==0){
  this.products.approveLink(obj).subscribe(response=>{
    if(response.status==200){
      obj.linkApproved=1;
    }
  })
 }else{

   this.products.rejectLink(obj).subscribe(response=>{
    if(response.status==200){
      obj.linkApproved=0;
    }
  })
 }


}
loadSubCategories(id){
 
     this.subcat.getAll({category:id}).subscribe(response=>{
      console.log(response);
      this.subcategories=response.subCategories;
    });
}
}
