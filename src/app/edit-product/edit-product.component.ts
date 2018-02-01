import { Component, OnInit, Input, ViewChild, Output,EventEmitter  } from '@angular/core';
import { ProductService } from "../services/product.service";
import { ImageService } from "../services/image.service";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { ImageUploadComponent } from 'angular2-image-upload/lib/image-upload/image-upload.component';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
@Input() productId:any;
@ViewChild(ImageUploadComponent) imageUploadComponent: ImageUploadComponent;
@Output() productChange:EventEmitter<string> = new EventEmitter();
 @Output() saveDone: EventEmitter<any> = new EventEmitter<any>();
  imageArray: Array<string>=[];
  userDetails: any;
  jwtHelper: any;
  gotError: boolean;
  isSecurity: number;
  errorValue:string;
  imageIsUploading:boolean;

  constructor(private product:ProductService,private imageService:ImageService) { }

  ngOnInit() {
     this.gotError=false;
    this.isSecurity=2;
    this.gotError=false;
    this.imageIsUploading=false;
      this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
   // console.log(this.productId);
  }
saveProduct(id, obj){
  let count=0;
   this.gotError=false;
   console.log(obj);
   if(this.imageIsUploading){
     this.gotError=true;
      this.errorValue="Wait Image is Uploading!";
      return false;
   }
  
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
   if(this.productId.image1!="noimagefound"){
     count++;
   }
      if(this.productId.image2!="noimagefound"){
     count++;
   }
      if(this.productId.image3!="noimagefound"){
     count++;
   }
      if(this.productId.image4!="noimagefound"){
     count++;
   }
    if(this.imageArray.length+count>4){
     this.gotError=true;
     console.log(this.imageArray.length);
     this.errorValue="maximum 4 images can be uploaded!"
     return false;
   }
    if(this.imageArray.length+count<1){
      this.gotError=true;
      this.errorValue="Aleast One Image should be uploaded";
      return false;
    }
    if(this.productId.image1!="noimagefound"){
    this.imageArray.push(this.productId.image1)
   }
      if(this.productId.image2!="noimagefound"){
     this.imageArray.push(this.productId.image2)
   }
      if(this.productId.image3!="noimagefound"){
     this.imageArray.push(this.productId.image3)
   }
      if(this.productId.image4!="noimagefound"){
     this.imageArray.push(this.productId.image4)
   }
   if(this.imageArray[0]){
   obj.image1=this.imageArray[0];
   }else{
     obj.image1="noimagefound";
   }

   if(this.imageArray[1]){
   obj.image2=this.imageArray[1];
   }else{
     obj.image2="noimagefound";
   }

   if(this.imageArray[2]){
   obj.image3=this.imageArray[2];
   }else{
     obj.image3="noimagefound";
   }

   if(this.imageArray[3]){
   obj.image4=this.imageArray[3];
   }else{
     obj.image4="noimagefound";
   }
   console.log(this.userDetails.fname+" "+this.userDetails.lname);
   obj.userName=this.userDetails.fname+" "+this.userDetails.lname;
   obj.token=this.userDetails.token;
   obj.email=this.userDetails.email;
   console.log(this.imageArray)
   this.product.update(id,obj).subscribe(response=>{
     this.productId.imageApproved=0;
     this.productId.linkApproved=0;
      this.productId.productApproved=0;
     this.productId.image1=obj.image1;
     this.productId.image2=obj.image2;
     this.productId.image3=obj.image3;
     this.productId.image4=obj.image4;
     this.productChange.emit(this.productId);
     this.saveDone.emit();
   });
}
isSecurityChange(val){
  console.log(val);
  this.isSecurity=val;
  
}
onUploadFinished(obj)
  {
    
    this.imageArray.push(obj.serverResponse._body);
    console.log(this.imageArray);
  
}
onRemoved(obj)
  {
    var index = this.imageArray.indexOf(obj.serverResponse._body);
    if (index > -1) {
    this.imageArray.splice(index, 1);
                    }
console.log(this.imageArray);
console.log(obj.serverResponse._body)
this.imageService.deleteImage({key:obj.serverResponse._body}).subscribe(response=>{
      console.log(response);
});
var a="thumbnails/"+obj.serverResponse._body;
a=a.substring(0, a.length - 3)+"jpg";
console.log(a)
this.imageService.deleteImage({key:a}).subscribe(response=>{
      console.log(response);
});
  }
  onUploadStateChanged(obj){
    console.log(obj);
    this.imageIsUploading=obj;
  }
  image_name(name){
return name.substring(0, name.length - 3)+"jpg";
//return "anu";
  }
  delImage(n,add){
    if(n==1){

      this.productId.image1="noimagefound";
    }
    if(n==2){

      this.productId.image2="noimagefound";
    }
    if(n==3){

      this.productId.image3="noimagefound";
    }
    if(n==4){

      this.productId.image4="noimagefound";
    }
    this.onRemoved({serverResponse:{_body:add}});
  }
  deleteAndClear(){
     console.log("from child");
     if(this.imageUploadComponent!=undefined)
    {
      while(this.imageUploadComponent.files.length > 0) {
    this.imageUploadComponent.files.pop();
}
this.imageUploadComponent.fileCounter=0;
//this.imageUploadComponent.inputElement.nativeElement.value = '';
    }
  }
 
}
