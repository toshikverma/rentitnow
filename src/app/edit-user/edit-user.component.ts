import { Component, OnInit } from '@angular/core';
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { UserService } from "../services/user.service";
import { User } from "./user";
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  userDetails: any;
  jwtHelper: any;


  constructor(private service:UserService) { 

  }
 posts:any[];
 obj2:User={};
 gotError:boolean;
 errorValue:String;

 private localdata:object;
  ngOnInit():void {
    this.jwtHelper=new JwtHelper();
    this.userDetails= this.jwtHelper.decodeToken(localStorage.getItem("token"));
  this.gotError=false;
  this.obj2.email=this.userDetails.email;
  this.obj2.token=this.userDetails.token;

    this.service.getAll(this.obj2).subscribe(response=>{
      console.log(response);
      this.posts=response.users.reverse();
    });
    
  }
  addUser(title:HTMLInputElement){
    this.obj2.query=title.value;
    this.obj2.page=1;
    this.obj2.sortby="fname";
    console.log(this.obj2)
    this.service.search(this.obj2).subscribe(response=>{
      console.log(response);
      this.posts=response.users.reverse();
    });

  }
  updateUser(obj){
    
    this.service.promote(obj._id,this.obj2).subscribe(response=>{
      this.posts[this.posts.indexOf(obj)]=response;
    });
    
  }
  deleteUser(obj){
    this.service.demote(obj._id,this.obj2).subscribe(response=>{
    this.posts[this.posts.indexOf(obj)]=response;
    });

  }}