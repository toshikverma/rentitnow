import { Component, OnInit } from '@angular/core';
import { JwtHelper } from "angular2-jwt";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTabNumber: number;
  name: string;

  constructor() { }

  ngOnInit() {
    let jwtHelper=new JwtHelper();
    let userDetails=jwtHelper.decodeToken(localStorage.getItem('token'));
    this.name=userDetails.fname;
    this.activeTabNumber=1;
  }
changeActive(n){
this.activeTabNumber=n;

}
ColorChangedHandler(color:number)
{
  this.activeTabNumber = color;
}
}
