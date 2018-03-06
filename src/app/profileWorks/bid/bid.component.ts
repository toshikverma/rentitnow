import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from "@ngx-loading-bar/core";
import { BidService } from "../../services/bid.service";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {
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
  constructor(private loadingBar: LoadingBarService,private bids: BidService, private chats : ChatService) {}

    ngOnInit() {
        this.searchBy="userId";
          this.loadingBar.start();
        this.jwtHelper = new JwtHelper();
        this.userDetails = this.jwtHelper.decodeToken(localStorage.getItem("token"));
        this.bids.customQuery(this.userDetails.token + '/%7B "'+this.searchBy+'"%3A"'+this.userDetails._id+'" %7D/lastEdit/1').subscribe(response => {
            this.posts = response.bids;
             this.gotPageNumber=response.page;
            this.gotTotalPages=response.total_pages;
            this.loadingBar.complete();
        });
        
    }
    changePage(n:number){
       this.loadingBar.start();
       
        this.bids.customQuery(this.userDetails.token + '/%7B "'+this.searchBy+'"%3A"'+this.userDetails._id+'" %7D/lastEdit/'+n).subscribe(response => {
            this.posts = response.bids;
           
           console.log(this.userDetails.token + '/%7B "'+this.searchBy+'"%3A"'+this.userDetails._id+'" %7D/lastEdit/'+n);
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
        this.chatTo=post.userName;
        if(this.searchBy=='userId'){
         this.chatToId=post.productById;
        }else{
            this.chatToId=post.userId;
        }
       
        this.chats.getAll({userId:this.chatToId,email:this.userDetails.email,token:this.userDetails.token}).subscribe(response=>{

            this.chatData=response;
            this.chatLoading=false;
            console.log(this.scroller.nativeElement.scrollHeight)
           this.scrollvalue= 10000;
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
}
