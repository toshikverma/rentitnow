import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { DataService } from "./data.service";

@Injectable()
export class SubCategoryService extends DataService {
  constructor(http: Http) {
    super("https://rentophila.herokuapp.com/v1/subcategory", http);
   }
}
