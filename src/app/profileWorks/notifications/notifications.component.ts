import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from "@ngx-loading-bar/core";
import { ChatService } from "../../services/chat.service";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { NotificationService } from "../../services/notification.service";
import slugify from 'slugify';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    linkHere: string;
    myname: any;
    myid: any;
    chatData: any;
    chatLoading: boolean;
    chatToId: any;
    chatTo: any;
    gotTotalPages: any;
  gotPageNumber: any;
  posts: any;
  userDetails: any;
  jwtHelper: any;
  searchBy:string;
@ViewChild('scrollMe') scroller; 
scrollvalue:any;
  constructor(private loadingBar: LoadingBarService, private chats : ChatService,private noti:NotificationService) {}
  ngOnInit() {
       
          this.loadingBar.start();
        this.jwtHelper = new JwtHelper();
        this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem("token"));
        this.noti.getAll({email:this.userDetails.email,token:this.userDetails.token,page:1}).subscribe(response => {
            this.posts = response.products;
             this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
            console.log(response);
        });
        
    }
    changePage(n:number){
       this.loadingBar.start();
       
      this.noti.getAll({email:this.userDetails.email,token:this.userDetails.token,page:n}).subscribe(response => {
            this.posts = response.products;
           
           
            this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
        });

    }
    clickedChat(post){
       this.chatLoading=true;
       this.myid=this.userDetails._id;
       this.myname=this.userDetails.fname+" "+this.userDetails.lname;
       // alert(JSON.stringify(post))
        
         this.chatToId=post.refId;
         this.chatTo="blank";
       
       
        this.chats.getAll({userId:this.chatToId,email:this.userDetails.email,token:this.userDetails.token}).subscribe(response=>{

            this.chatData=response;
            this.chatLoading=false;
            console.log(this.scroller.nativeElement.scrollHeight)
           this.scrollvalue= 10000+Math.random();
        })
    }
    sendChat(message:HTMLTextAreaElement){
        console.log(message)
        this.chats.add({towards:this.chatToId,message:message.value,token:this.userDetails.token,email:this.userDetails.email}).subscribe(response=>{


message.value="";
this.chatData.push(response);
this.scrollvalue= this.scrollvalue+1;
});
    }
    checkIfEqual(index){

        if(this.chatData[index].from==this.chatToId){
            return true;
        }
        return false;
    }

    changeSearchBy(by){

        this.searchBy=by;
        this.changePage(1);
    }
    getMessenger(post)
    {
      console.log(post)
      if(post.from==this.userDetails._id){

        return post.towardsName[0].fname+" "+post.towardsName[0].lname;
      }else{
         return post.fromName[0].fname+" "+post.fromName[0].lname;
      }
    }
    gettype(n){
      if(n==1){
        return ("Product Status");
      }
      if(n==4){
return "Bid Status"

      }
       if(n==6){
return "Chats"

      }
      return "Bidding"
    }
    showLink(n){
if(n==1){
    this.linkHere="profile/manage-product";
    return true;
}
if(n==3){
    this.linkHere="profile/manage-bids";
    return true;
}
if(n==4){
    this.linkHere="profile/manage-request";
    return true;
}


 return false;
    }
   
}
