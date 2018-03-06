import { Component, OnInit } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  goto: any;
  activeTabNumber: number;
  name: string;

  constructor( private router:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let jwtHelper=new JwtHelper();
    let userDetails=jwtHelper.decodeToken(localStorage.getItem('token'));
    this.name=userDetails.fname;
    this.activeTabNumber=1;
     this.goto=this.activatedRoute.snapshot.params['name'];
    this.gotoPage(this.goto);
  }
changeActive(n){
this.activeTabNumber=n;

}
gotoPage(name){
  switch(name){

    case "manage-product":
    this.ColorChangedHandler(1);
    break;
    case "manage-request":
    this.ColorChangedHandler(7);
    break;
    case "messages":
    this.ColorChangedHandler(2);
    break;
    case "notifications":
    this.ColorChangedHandler(3);
    break;
    case "manage-bids":
    this.ColorChangedHandler(4);
    break;
    case "add-item":
    this.ColorChangedHandler(5);
    break;
    case "add-request":
    this.ColorChangedHandler(6);
    break;
    default:
     this.ColorChangedHandler(1);
    break;
  }
}


ColorChangedHandler(color:number)
{
  this.activeTabNumber = color;
}
}
