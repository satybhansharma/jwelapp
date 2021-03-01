import { Injectable } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExcelService } from 'src/app/shared/services/excel.service';


@Injectable({
  providedIn: 'root'
})
export class SupplywiseService {

  constructor(private _comser: CommonService,private http: HttpClient,private excel:ExcelService) {
    
   }
   Records(cname: string): Observable<any>{
    let url = "/MMI/Query/Suppliers";
    //alert(url);
    //alert(this._comser.getHost() + url);
    //return this.http.get(this._comser.getHost() + url);
    return this.http.post(this._comser.getHost()+url,{Cname:cname})
  }

  getRecords(twhere: string): Observable<any>{
    let url = "/MMI/Query/Suppliers/filter";
    //alert(url);
    //alert(this._comser.getHost() + url);
    //return this.http.get(this._comser.getHost() + url);
    return this.http.post(this._comser.getHost()+url,{twhere:twhere})
  }

  getigroup(): Observable<any>{
    let url = "/MMI/Query/Suppliers/igroup";    
    return this.http.get(this._comser.getHost()+url)
  }
  getitem(): Observable<any>{
    let url = "/MMI/Query/Suppliers/idesc";    
    return this.http.get(this._comser.getHost()+url)
  }
  getcategory(): Observable<any>{
    let url = "/MMI/Query/Suppliers/category";    
    return this.http.get(this._comser.getHost()+url)
  }
  
}
