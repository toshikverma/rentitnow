import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgxCarousel } from 'ngx-carousel';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ProductService } from "../services/product.service";
@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  categoryName: any;
  category: any;
  subcategory: any;
  subcategoryName: any;
  referenceLink: any;
  productAge: any;
  rentPerAmount: any;
  rentTimeType: any;
  securityAmount: any;
  security: string;
  condition: any;
  userName: any;
  dateAdded: any;
  image4: any;
  image3: any;
  image2: any;
  image1: any;
  discription: any;
  ratings: any;
  wishlist: number;
  pageView: any;
  productId: string;
prodName:string;
  constructor(private router:Router,private loadingBar: LoadingBarService, private activatedRoute: ActivatedRoute,private products: ProductService) {

    
         this.productId=this.activatedRoute.snapshot.params['id'];
      
   }
public carouselOne: NgxCarousel;
  ngOnInit() {
    this.loadingBar.start();
 this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }
    this.products.getsingle(this.productId).subscribe(response=>{

     this.prodName=response.product.productName;
    this.pageView=response.product.pageView;
     this.wishlist=0;
     if(response.product.wishList && response.product.wishList!=null && response.product.wishList!="" && response.product.wishList!=undefined  ){
       this.wishlist=response.product.wishList.split(',').length;
     }
     this.ratings=response.product.ratings;
     
     this.discription=response.product.productDescription;
     this.image1=response.product.image1;
     this.image2=response.product.image2;
     this.image3=response.product.image3;
     this.image4=response.product.image4;
     this.userName=response.product.userName;
     this.dateAdded=new Date(response.product.lastEdit);
     this.condition=response.product.condition;
     if(response.product.isSecurityAmount==1){
       this.security="Yes";
       this.securityAmount=response.product.securityAmount;
     }else{
       this.security="No";
       this.securityAmount=0;
     }
     this.rentTimeType=response.product.rentTimeType;
     this.referenceLink=response.product.referenceLink;
  switch(this.rentTimeType){
case 1:
this.rentTimeType="Per Day";
break;
case 2:this.rentTimeType="Per Week";
break;
case 3:this.rentTimeType="Per Month";
break;
case 4:this.rentTimeType="Per Hour";
break;
default:
this.rentTimeType="Per Day";

  }
  this.rentPerAmount=response.product.rentPerAmount;
this.productAge=response.product.productAge;
  switch(this.condition){
case 1:
this.condition="Okay";
break;
case 2:this.condition="Good";
break;
case 3:this.condition="Better";
break;
case 4:this.condition="Best";
break;
case 5:this.condition="Damaged";
break;
default:
this.condition="Okay";

  }
  this.subcategoryName=response.product.subcategoryName;
  this.subcategory=response.product.subcategory;
   this.categoryName=response.product.categoryName;
  this.category=response.product.category;
   this.loadingBar.complete();
    },err=>{

       this.router.navigate(['/notfound']);
    });
  }
 
  public myfunc(event: Event) {
     // carouselLoad will trigger this funnction when your load value reaches
     // it is helps to load the data by parts to increase the performance of the app
     // must use feature to all carousel
  }

}
