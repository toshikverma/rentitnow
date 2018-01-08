import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/catch';
import  'rxjs/add/observable/throw';
import { AppError } from "../common/app-error";
import { Router } from "@angular/router";
//import { NotFoundError } from "app/common/not-found-error";
@Injectable()
export class AuthService {

  constructor(private router:Router,
  private http:HttpClient) { }
public addLogin(obj){

    return this.http.post("https://rentophila.herokuapp.com/v1/login/add",obj).catch(
      (error:Response)=>{
       if(error.status===400)
       return Observable.throw(error);

        return Observable.throw(new AppError(error));
      }
    );
  }


logout(email,token){
  
  this.http.delete("https://rentophila.herokuapp.com/v1/login/logout/"+email+"/"+token).subscribe(result => { });

  localStorage.removeItem('token');
this.router.navigate(['/']);
}
isLoggedIn(){

  if (localStorage.getItem('token') === null) {
    return false;
}
return true;
}
}