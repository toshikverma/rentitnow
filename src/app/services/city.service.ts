import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CityService extends DataService {
  constructor(http: Http) {
    super("https://rentophila.herokuapp.com/v1/city", http);
   }
}
