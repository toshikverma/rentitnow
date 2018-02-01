import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
@Input() pageNumber:number;
@Input() totalPages:number;
@Output() callPageChange: EventEmitter<number> = new EventEmitter<number>();
pageArray:Array<number>=[];
  constructor() { }

  ngOnInit() {
  this.createNumberArray(this.pageNumber,this.totalPages)
    console.log(this.pageNumber);
  }
PageNumberChanged(n){
  n=eval(n);
  this.createNumberArray(n, this.totalPages);
  console.log("beforechild : "+this.pageNumber);
  
  this.pageNumber=n;
  console.log("afterchild : "+this.pageNumber);
this.callPageChange.emit(n);
}
createNumberArray(presentPage,totalPages){
  console.log("present:"+presentPage+"total pages:"+totalPages);
if(presentPage==1){
  this.pageArray=[];
  console.log("first");
this.pageArray[0]=1;
if(totalPages>=2)
this.pageArray[1]=2;
if(totalPages>=3)
this.pageArray[2]=3;
if(totalPages>=4)
this.pageArray[3]=4;
if(totalPages>=5)
this.pageArray[4]=0;
}
//page is 3 when total pages are 8
if(presentPage!=1 && presentPage<totalPages-3){
  this.pageArray=[];
console.log("second");
this.pageArray[0]=0;
this.pageArray[1]=presentPage;
if(totalPages>=presentPage+1)
this.pageArray[2]=presentPage+1;
if(totalPages>=presentPage+2)
this.pageArray[3]=presentPage+2;
if(totalPages>=presentPage+3)
this.pageArray[4]=0;
console.log(this.pageArray)
}
//page is 3 when total pages are 8
if(presentPage!=1 && presentPage>=totalPages-3){
  this.pageArray=[];
console.log("third");
this.pageArray[0]=0;
this.pageArray[1]=presentPage;
if(totalPages>=presentPage+1)
this.pageArray[2]=presentPage+1;
if(totalPages>=presentPage+2)
this.pageArray[3]=presentPage+2;
if(totalPages>=presentPage+3)
this.pageArray[4]=presentPage+3;
}


}
}
