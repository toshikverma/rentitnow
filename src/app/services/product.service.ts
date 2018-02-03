import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class ProductService  extends DataService {
  constructor(http: Http) {
    super('https://rentophila.herokuapp.com/v1/product', http);
   }
}
