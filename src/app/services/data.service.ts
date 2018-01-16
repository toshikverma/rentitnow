import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll(obj) {
    return this.http.post(this.url+"/get",obj)
      .map(response => response.json())
      .catch(this.handleError);
  }
    customQuery(query) {
      console.log(this.url+"/dynamic/"+query);
    return this.http.get(this.url+"/dynamic/"+query)
      .map(response => response.json())
      .catch(this.handleError);
  }
search(obj) {
    return this.http.post(this.url+"/search",obj)
      .map(response => response.json())
      .catch(this.handleError);
  }
  create(resource) {
    return this.http.post(this.url+"/add", resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(id,obj) {
    return this.http.put(this.url+"/update" + '/' + id, obj)
      .map(response => response.json())      
      .catch(this.handleError);
  }

  delete(id,token,email) {
    return this.http.delete(this.url+"/delete" + '/' + id+'/'+token+'/'+email)
      .map(response => response.json())
      .catch(this.handleError);
  }

  promote(id,obj) {
    return this.http.put(this.url+"/promote/"+ id,obj)
      .map(response => response.json())
      .catch(this.handleError);
  }
 demote(id,obj) {
    return this.http.put(this.url+"/demote/"+ id,obj)
      .map(response => response.json())
      .catch(this.handleError);
  }
  add(obj) {
    return this.http.post(this.url+"/add",obj)
      .map(response => response.json())
      .catch(this.handleError);
  }
  deleteImage(obj) {
    return this.http.post(this.url+"/delete",obj);
  }
  approveImage(obj){
    return this.http.put(this.url+"/approveimages/"+obj._id,obj);
  }
  rejectImage(obj){
    return this.http.put(this.url+"/rejectimages/"+obj._id,obj);
  }
  approveLink(obj){
    return this.http.put(this.url+"/approvelink/"+obj._id,obj);
  }
  rejectLink(obj){
    return this.http.put(this.url+"/rejectlink/"+obj._id,obj);
  }
  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));
  
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
    
    return Observable.throw(new AppError(error));
  }
}
