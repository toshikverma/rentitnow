import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  userDetails: any;
  jwtHelper: any;
  gotError: boolean;
  isSecurity: number;
  errorValue:string;

  constructor(private product:ProductService) { }

  ngOnInit() {
    this.isSecurity=2;
    this.gotError=false;
      this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
saveProduct(obj){
  console.log(obj);
   this.gotError=false;
   if(obj.productName=="" ||obj.productName==null || obj.productName==undefined){
     this.gotError=true;
     this.errorValue="Product Name Cannot be Empty!"
     return false;
   }
   if(obj.productAge=="" ||obj.productAge==null || obj.productAge==undefined || isNaN(obj.productAge)){
     this.gotError=true;
     this.errorValue="Product Age should be Number and Cannot be Empty!"
     return false;
   }
   if(obj.condition=="" ||obj.condition==null || obj.condition==undefined){
     this.gotError=true;
     this.errorValue="Condition of Product Cannot be left Empty!"
     return false;
   }
   if(obj.rentPerAmount=="" ||obj.rentPerAmount==null || obj.rentPerAmount==undefined || isNaN(obj.rentPerAmount)){
     this.gotError=true;
     this.errorValue="Rent Price should be Number and Cannot be Empty!"
     return false;
   }
   if(obj.rentTimeType=="" ||obj.rentTimeType==null || obj.rentTimeType==undefined){
     this.gotError=true;
     this.errorValue="Rent type of Product Cannot be left Empty!"
     return false;
   }
   if(obj.isSecurityAmount=="" ||obj.isSecurityAmount==null || obj.isSecurityAmount==undefined){
     this.gotError=true;
     this.errorValue="Is Security of Product Cannot be left Empty!"
     return false;
   }
   if((obj.securityAmount=="" ||obj.securityAmount==null || obj.securityAmount==undefined || isNaN(obj.securityAmount)) && this.isSecurity==1){
     this.gotError=true;
     this.errorValue="Security Amount should be Number and Cannot be Empty!"
     return false;
   }
   if((obj.referenceLink=="" ||obj.referenceLink==null || obj.referenceLink==undefined)){
     this.gotError=true;
     this.errorValue="Reference Link cannot be left Empty!"
     return false;
   }
   if((obj.description=="" || obj.description==null || obj.description==undefined) || (obj.description).length<50){
     this.gotError=true;
     this.errorValue="Description Link cannot be left Empty and greater than 50 characters!"
     return false;
   }
   obj.token=this.userDetails.token;
   obj.email=this.userDetails.email;
   this.product.add(obj).subscribe(response=>{
      console.log(response);
   });
}
isSecurityChange(val){
  console.log(val);
  this.isSecurity=val;
  
}
}
