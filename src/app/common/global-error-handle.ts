
import { ErrorHandler, Injectable} from '@angular/core';
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    alert('An Unexpected error occured!'+JSON.stringify(error));
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }
  
}