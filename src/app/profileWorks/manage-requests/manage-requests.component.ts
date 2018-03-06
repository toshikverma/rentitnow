import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { ReqService } from "../../services/request.service";
import { ReasonsService } from "../../services/reasons.service";
import { AppError } from "../../common/app-error";
import { NotFoundError } from "../../common/not-found-error";
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.scss']
})
export class ManageRequestsComponent implements  OnInit{
    rejectIndex: number;
    reasonsArray: any;
    @ViewChild('child') child;
    @ViewChild('lgModal2') lgModal2: ModalDirective;
    @ViewChild('lgModal3') lgModal3: ModalDirective;
    prodId: any;
    subcategories: Array < any > = [];
    obj: Object;
    categories: any;
    image4: any;
    image3: any;
    image2: any;
    image1: any;
    linkAddress: any;
    userDetails: any;
    jwtHelper: JwtHelper;
 gotPageNumber:number;
    gotTotalPages:number;
    posts: Array < any > = [];

    constructor(private loadingBar: LoadingBarService,private products: ReqService, private reasons: ReasonsService) {}

    ngOnInit() {
         this.loadingBar.start();
        this.jwtHelper = new JwtHelper();
        this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem("token"));
        this.products.customQuery(this.userDetails.token + '/%7B "userId"%3A"'+this.userDetails._id+'" %7D/lastEdit/1').subscribe(response => {
            this.posts = response.requests;
             this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
            this.posts.forEach(function (value) {
    value.fromDate=new Date(value.fromDate);
    value.toDate=new Date(value.toDate);
       
      });
     });
        this.reasons.getAll({}).subscribe(response => {
            this.reasonsArray = response.cities;
        });
    }
    putImages(a, b, c, d) {
        this.image1 = a;
        this.image2 = b;
        this.image3 = c;
        this.image4 = d;

    }
    setLink(link) {
       // console.log(link);
        this.linkAddress = link;
    }
    approveImage(obj) {
        obj.email = this.userDetails.email;
        obj.token = this.userDetails.token;
        if (obj.imageApproved == 0) {
            this.products.approveImage(obj).subscribe(response => {
                if (response.status == 200) {
                    obj.imageApproved = 1;
                }
            })
        } else {

            this.products.rejectImage(obj).subscribe(response => {
                if (response.status == 200) {
                    obj.imageApproved = 0;
                }
            })
        }

    }
    approveLink(obj) {
        obj.email = this.userDetails.email;
        obj.token = this.userDetails.token;
        if (obj.linkApproved == 0) {
            this.products.approveLink(obj).subscribe(response => {
                if (response.status == 200) {
                    obj.linkApproved = 1;
                }
            })
        } else {

            this.products.rejectLink(obj).subscribe(response => {
                if (response.status == 200) {
                    obj.linkApproved = 0;
                }
            })
        }


    }
  
    changeProductId(id) {
        this.prodId = id;
    }
    clearingOldImages() {
        this.child.deleteAndClear();
        this.child.imageArray = [];
        this.child.gotError = false;
    }
    hideModal() {
        this.lgModal2.hide();
    }
    rejectProduct(obj) {
        console.log(obj)
        this.lgModal3.hide();
        let des = ""
        for (let i = 0; i < this.reasonsArray.length; i++) {

            if (obj[i] == true) {

                des += this.reasonsArray[i].name + ", ";
            }
        }
        des += obj.description;
        console.log({
            email: this.userDetails.email,
            _id: this.posts[this.rejectIndex]._id,
            token: this.userDetails.token,
            description: des
        });
        this.products.rejectProduct({
            email: this.userDetails.email,
            _id:  this.posts[this.rejectIndex]._id,
            token: this.userDetails.token,
            description: des
        }).subscribe(response => {
          
            this.posts[this.rejectIndex].productApproved = 2;
           
        });
    }
    rejectSetUp(i) {
        this.rejectIndex = i;
    }
    approveProduct(post) {
        if (post.imageApproved == 1 && post.linkApproved == 1) {
            this.products.approveProduct({
                _id: post._id,
                token: this.userDetails.token,
                email: this.userDetails.email
            }).subscribe(response => {

                console.log(response);
                post.productApproved = 1;
            }, (Error) => {
                console.log(Error);
            });
        } else {
            alert("cannot approve product until link and images are approved!")
        }

    }
    imageName(original_name){
          if(original_name!="noimagefound" && original_name!="" && original_name!=undefined && original_name!=null ){
var fileExt = original_name.split('.').pop();
original_name=original_name.substr(0,original_name.length- fileExt.length);
original_name+="jpg";
return original_name;
         }
         return original_name;
    }
     ClickDelete(post){
    if(confirm("Are you sure to delete ")) {
        let index=this.posts.indexOf(post);
    this.posts.splice(index,1);
    this.products.delete(post._id,this.userDetails.token,this.userDetails.email).subscribe(response=>{
console.log(response);
},(error:AppError)=>{
  this.posts.splice(index,0,post);
  
  if(error instanceof NotFoundError){
    alert('This Post is already deleted!');
  }else{
    throw error;
  }
}

);
  }
}
ClickHold(post){

     this.products.togglehold(post._id,{email:this.userDetails.email,token:this.userDetails.token}).subscribe(response=>{
console.log(response);
if(post.onHold==0){
      post.onHold=1;
  }else{
      post.onHold=0;
  }
},(error:AppError)=>{
  
  if(error instanceof NotFoundError){
    alert('This Post is already deleted!');
  }else{
    throw error;
  }
}

);
}
 changePage(n:number){
       this.loadingBar.start();
        console.log("parent : "+n);
        this.products.customQuery(this.userDetails.token + '/%7B "userId"%3A"'+this.userDetails._id+'" %7D/lastEdit/'+n).subscribe(response => {
            this.posts = response.products;
           // console.log(response);
          
            this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
        });

    }
}