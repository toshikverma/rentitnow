import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { ProductService } from "../services/product.service";
import { ImageService } from "../services/image.service";
import { ImageUploadComponent } from "angular2-image-upload";
import { ReqService } from "../services/request.service";

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})
export class EditRequestComponent implements OnInit  {
  saveDiabled: boolean;
  @Input() productId: any;
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

  constructor(private request:ReqService,private imageService:ImageService) { }

  ngOnInit() {
    //console.log(this.productId);
     this.gotError=false;
    this.isSecurity=2;
    this.gotError=false;
    this.imageIsUploading=false;
      this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
saveRequest(id, obj){
  let count=0;
   this.gotError=false;
   console.log(obj);
   if(this.imageIsUploading){
     this.gotError=true;
      this.errorValue="Wait Image is Uploading!";
      return false;
   }
  
   if(obj.requestName=="" ||obj.requestName==null || obj.requestName==undefined){
     this.gotError=true;
     this.errorValue="Request Name Cannot be Empty!"
     this.saveDiabled=false;
     return false;
   }
   if(obj.fromDate=="" ||obj.fromDate==null || obj.fromDate==undefined || !(obj.fromDate instanceof Date && !isNaN(obj.fromDate.valueOf()))){
     this.gotError=true;
     this.errorValue="From Date should be Date and Cannot be Empty!"
     this.saveDiabled=false;
     return false;
   }
   if(obj.toDate=="" ||obj.toDate==null || obj.toDate==undefined || !(obj.toDate instanceof Date && !isNaN(obj.toDate.valueOf()))){
     this.gotError=true;
     this.errorValue="To Date should be Date and Cannot be Empty!"
     this.saveDiabled=false;
     return false;
   }
   if(obj.fromDate>obj.toDate){
      this.gotError=true;
     this.errorValue="From Date cannot be Greater than to Date!"
     this.saveDiabled=false;
     return false;
   }
   
   if((obj.referenceLink=="" ||obj.referenceLink==null || obj.referenceLink==undefined)){
     this.gotError=true;
     this.errorValue="Reference Link cannot be left Empty!"
     this.saveDiabled=false;
     return false;
   }
   if((obj.description=="" || obj.description==null || obj.description==undefined) || (obj.description).length<50){
     this.gotError=true;
     this.errorValue="Description Link cannot be left Empty and greater than 50 characters!"
     this.saveDiabled=false;
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
   this.request.update(id,obj).subscribe(response=>{
     this.productId.imageApproved=0;
     this.productId.linkApproved=0;
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
