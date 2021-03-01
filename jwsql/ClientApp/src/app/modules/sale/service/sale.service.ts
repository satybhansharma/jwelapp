import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../../shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient, private cs: CommonService) { }
  public GetTypes(): Array<any> {
    return [
      { id: "S", name: "Sale" },
      { id: "SR", name: "Sale Return" },
      { id: "P", name: "Purchase" },
      { id: "MR", name: "Metal Receipt" },
      { id: "MP", name: "Metal Payment" },
      { id: "REC", name: "Receipt" },
      { id: "PAY", name: "Payment" },
      { id: "GPB", name: "Gold Purchase Bhav" },
      { id: "GSB", name: "Gold Sale Bhav" },
      { id: "SPB", name: "Silver Purchase Bhav" },
      { id: "SSB", name: "Silver Sale Bhav" },
      { id: "TRN", name: "Transfer" }]
  }

  public GetSeries(VType:any): Observable<any> {
    let url = "/MMI/Series";
    return this.http.post(this.cs.getHost() + url, { VType:VType});
  }

  public GetMaxBill(model: any): Observable<any> {
    let url = "/MMI/GetMaxBillNumber";
    //alert(JSON.stringify(model))
   
    return this.http.post(this.cs.getHost() + url,model);
  }

  public GetAccounts(model: any): Observable<any> {
    let url = "/Sale/AccountsName";

    return this.http.post(this.cs.getHost() + url,model)
  }

}
