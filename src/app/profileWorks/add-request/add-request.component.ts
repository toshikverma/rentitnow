import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import { ImageService } from "../../services/image.service";
import { JwtHelper } from "angular2-jwt";
import { ReqService } from "../../services/request.service";
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  userDetails: any;
  jwtHelper: JwtHelper;
  errorValue: string;
  gotError: boolean;
  imageIsUploading: boolean;
  imageArray: Array<string>=[];
  value1: Date;
 value2:Date;
  constructor(private imageService:ImageService,private reqf:ReqService) { }

  ngOnInit() {
    this.gotError=false;
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
  saveRequest(obj){
   this.gotError=false;
   console.log(this.imageArray);
   if(this.imageIsUploading){
     this.gotError=true;
      this.errorValue="Wait Image is Uploading!";
      return false;
   }
   if(this.imageArray.length<1){
      this.gotError=true;
      this.errorValue="Aleast One Image should be uploaded";
      return false;
    }
   if(obj.requestName=="" ||obj.requestName==null || obj.requestName==undefined){
     this.gotError=true;
     this.errorValue="Request Name Cannot be Empty!"
     return false;
   }
   if(obj.fromDate=="" ||obj.fromDate==null || obj.fromDate==undefined || !(obj.fromDate instanceof Date && !isNaN(obj.fromDate.valueOf()))){
     this.gotError=true;
     this.errorValue="From Date should be Date and Cannot be Empty!"
     return false;
   }
   if(obj.toDate=="" ||obj.toDate==null || obj.toDate==undefined || !(obj.toDate instanceof Date && !isNaN(obj.toDate.valueOf()))){
     this.gotError=true;
     this.errorValue="To Date should be Date and Cannot be Empty!"
     return false;
   }
   if(obj.fromDate>obj.toDate){
      this.gotError=true;
     this.errorValue="From Date cannot be Greater than to Date!"
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
   obj.token=this.userDetails.token;
   obj.email=this.userDetails.email;
   console.log(obj);
   this.reqf.add(obj).subscribe(response=>{

     console.log(response);
   });
  }
onUploadFinished(obj)
  {
    
    this.imageArray.push(obj.serverResponse._body);
  
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
}
