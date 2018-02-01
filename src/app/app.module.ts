import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FormsModule }   from '@angular/forms';
import { AuthService } from "./services/auth.service";
import { AppErrorHandler } from "./common/global-error-handle";
import { HttpClientModule } from "@angular/common/http";
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CityService } from "./services/city.service";
import { DataService } from "./services/data.service";
import { HttpModule } from "@angular/http";
import { AlertModule } from 'ngx-bootstrap/alert';
import { AddCollegeComponent } from './add-college/add-college.component';
import { CollegeService } from "./services/college.service";
import { AddReasonsComponent } from './add-reasons/add-reasons.component';
import { ReasonsService } from "./services/reasons.service";
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserService } from "./services/user.service";
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { CategoryService } from "./services/category.service";
import { SubCategoryService } from "./services/sub-category.service";
import { AuthGaurd } from "./services/auth-gaurd.service";
import { AdminAuthGaurd } from "./services/admin-auth-gaurd.service";
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProductComponent } from './profileWorks/add-product/add-product.component';
import { ProductService } from "./services/product.service";
import { ImageUploadModule } from "angular2-image-upload";
import { ImageService } from "./services/image.service";
import { AddRequestComponent } from './profileWorks/add-request/add-request.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarModule} from 'primeng/primeng';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {ReqService } from "./services/request.service";
import { ApproveProductsComponent } from './approve-products/approve-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { ManageProductsComponent } from './profileWorks/manage-products/manage-products.component';
import { ManageRequestsComponent } from './profileWorks/manage-requests/manage-requests.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    AdminComponent,
    NoAccessComponent,
    NotFoundComponent,
    AdminNavComponent,
    AddCityComponent,
    AddCollegeComponent,
    AddReasonsComponent,
    EditUserComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    RegistrationComponent,
    ProfileComponent,
    AddProductComponent,
    AddRequestComponent,
    ApproveProductsComponent,
    EditProductComponent,
    ApproveRequestComponent,
    EditRequestComponent,
    ManageProductsComponent,
    ManageRequestsComponent,
    PaginationComponent
  ],
  imports: [HttpModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    AngularFontAwesomeModule,
     LoadingBarModule.forRoot(),
    CalendarModule,
    ImageUploadModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
     RouterModule.forRoot([
     { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent,canActivate:[AdminAuthGaurd]},
       { path: 'profile', component: ProfileComponent},
         { path: 'accessdenied', component: NoAccessComponent},
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [ReqService,ImageService,ProductService,AdminAuthGaurd,AuthGaurd,SubCategoryService,CategoryService,UserService,ReasonsService,CollegeService,CityService,DataService,AuthService,{
    provide: ErrorHandler, 
    useClass: AppErrorHandler
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
