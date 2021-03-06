import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ProductService } from "../services/product.service";
import { ReasonsService } from "../services/reasons.service";
import { CategoryService } from "../services/category.service";
import { SubCategoryService } from "../services/sub-category.service";
import { ReqService } from "../services/request.service";
import { LoadingBarService } from '@ngx-loading-bar/core';
@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss']
})
export class ApproveRequestComponent implements OnInit {
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
    posts: Array < any > = [];
 gotPageNumber:number;
    gotTotalPages:number;
    constructor(private loadingBar: LoadingBarService,private products: ReqService, private reasons: ReasonsService, private category: CategoryService, private subcat: SubCategoryService) {}

    ngOnInit() {
         this.loadingBar.start();
        this.category.getAll(this.obj).subscribe(response => {
            this.categories = response.categories;
        });
        this.jwtHelper = new JwtHelper();
        this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem("token"));
        this.products.customQuery(this.userDetails.token + '/%7B %7D/date/1').subscribe(response => {
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
          console.log(response)
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
        console.log(link);
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
    loadSubCategories(post, id, i) {

        this.products.assigncategory({
            _id: post._id,
            email: this.userDetails.email,
            token: this.userDetails.token,
            category: id
        }).subscribe(response => {

            console.log(response);
        });
        this.subcat.getAll({
            category: id
        }).subscribe(response => {
            console.log(response);
            this.subcategories[i] = response.subCategories;
        });
    }
    changeSubCategories(post, id) {

        if (id == null || id == undefined || id == "") {} else {
            this.products.assignsubcategory({
                _id: post._id,
                email: this.userDetails.email,
                token: this.userDetails.token,
                subcategory: id
            }).subscribe(response => {

                console.log(response);
            });
        }
    }
    changeProductId(id) {
        this.prodId = id;
    }
    clearingOldImages() {
        console.log("from PArent");
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
         if(original_name!="noimagefound" && original_name!="" && original_name!=undefined ){
var fileExt = original_name.split('.').pop();
original_name=original_name.substr(0,original_name.length- fileExt.length);
original_name+="jpg";
return original_name;
         }
         return original_name;
    }
   changePage(n:number){
       this.loadingBar.start();
        console.log("parent : "+n);
        this.products.customQuery(this.userDetails.token + '/%7B %7D/lastEdit/'+n).subscribe(response => {
            this.posts = response.products;
           // console.log(response);
           console.log(this.userDetails.token + '/%7B %7D/lastEdit/'+n);
            this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
        });

    }
}