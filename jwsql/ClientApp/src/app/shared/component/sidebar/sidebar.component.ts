import { Component, OnInit } from '@angular/core';
import { DatacommunicationService } from '../../services/datacommunication.service';
import { DataService } from '../../services/data.service';
import { BillCommunicationService } from '../../services/bill-communication.service';
import { throwIfEmpty } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private ds: DataService,
    private dc: DatacommunicationService,
    private _billService: BillCommunicationService,
    private route:ActivatedRoute) {
   // this.ds.remove("OperationFrom");
   // this.ds.remove("OperationData");
  }

  ngOnInit(): void {
  }
  clearAllform() {
    this.ds.set("OperationFrom", null);
    this.ds.set("OperationData", null);
  }
  issideshow = false;
  //isSideMenuShow = false;
  isviewside(actionType:any)
  {
    let showData = !this.issideshow;
    this.dc._sendSidebarReponse({ "sideBarShow": showData });
    //this.isSideMenuShow != this.isSideMenuShow;
    //alert(this.issideshow);
   // this.issideshow=!this.issideshow;
   // alert("You Call me");
    //alert(actionType);

    let formType=this.route.snapshot.paramMap.get('id');
   // alert(formType);
    this._billService.sendData({
      "bill_Type":actionType
    });
  }

  onClick(linkType:any) {
    alert(linkType);
  }

  
 
}


