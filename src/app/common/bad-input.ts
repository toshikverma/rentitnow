import { ErrorHandler, Injectable} from '@angular/core';
@Injectable()
export class BadInput implements ErrorHandler {
    private err:any;
  constructor(err) {
      this.err=err;
   }
  handleError(error) {
    alert('Incorrect Request'+this.err);
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }
  
}