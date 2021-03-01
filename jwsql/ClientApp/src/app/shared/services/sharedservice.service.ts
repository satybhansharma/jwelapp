import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SharedserviceService {

  constructor() { }

  private showst = new BehaviorSubject<boolean>(false);
  sts=this.showst.asObservable();
  public startLoading(status: boolean) {
    this.showst.next(false);
  } 
  
}
