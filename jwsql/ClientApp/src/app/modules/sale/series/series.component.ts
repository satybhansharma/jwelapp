import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemMast } from '../../../shared/models/item-mast';
import { BillCommunicationService } from '../../../shared/services/bill-communication.service';
import { DatacommunicationService } from '../../../shared/services/datacommunication.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { GLOBALVAR } from '../global-var';
import { SaleService } from '../service/sale.service';
import * as moment from 'moment';
import { DatabaseQueryService } from '../../../shared/services/database-query.service';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  seriesList = [];
  seriesRecord = {};
  formType = "";

  //ask about the variable
  formNo12Type: number = 0;
  branchtype: number = 0;
  irrent: number = 0;
  m_onapproval: number = 0;
  m_onappsale: number = 0;
  m_jobno: number = 0;
  m_raparate: number = 0;
  //Gst Date
  m_gstdate: moment.Moment;
  //Current Date
  ctdate: any;


 // pname: string = "";
  searchText: string = "";
  isListLoad = false;
  //_pub_VAR: GLOBALVAR;
  _pub_VAR: GLOBALVAR;
   flt = [];
  
  constructor(
    public dialog: MatDialog,
    private saleService: SaleService,
    private fb: FormBuilder,
    private ds: DatacommunicationService,
    private billService:BillCommunicationService,
    @Inject(MAT_DIALOG_DATA) public Data,
    private _localStorage: LocalStorageService,
    private _dbQuery:DatabaseQueryService) {
   
   // let todayDate: moment.Moment = moment(new Date());
   // let tdyFormat_Date = todayDate.format('DD-MM-YYYY');
  }

  public bind_Variable() {
    this.formNo12Type = this._localStorage.getPara('no12type')[0]["vrval"];
    this.branchtype = this._localStorage.getPara('branchtype')[0]["vrval"];
    this.irrent = this._localStorage.getPara('irrent')[0]["vrval"];
    this.m_onapproval = this._localStorage.getPara('onapproval')[0]["vrval"];
    this.m_onappsale = this._localStorage.getPara('onappsale')[0]["vrval"];
    this.m_jobno = this._localStorage.getPara('jobno')[0]["vrval"];
    this.m_raparate = this._localStorage.getPara('raparate')[0]["vrval"];
    this.m_gstdate = this._localStorage.getPara('gstdate')[0]["vrval"];

   let todayDate: moment.Moment = moment(new Date());
   let tdyFormat_Date = todayDate.format('DD-MM-YYYY');
    this.ctdate = tdyFormat_Date;
   //9 alert(this.ctdate);
   // alert(this.m_gstdate);

    //alert("GST Date");
   // alert(this.m_gstdate.format("YYYY-MM-DD"));

  }

  ngOnInit(): void {
   // this.GetSeriesList();
    //this.seriesList
   
    this._pub_VAR = this._localStorage.get_Global_VAR();
    this.GetSeriesList();
   // this.bind_Variable();
    //this.S_Init();
   
  }

  public GetSeriesList(): void {
    this.bind_Variable();
    this.formType = this.Data["FormType"];
    switch (this.Data["FormType"]) {
      case "sale_Ret":
        this.formType = "SALE RET."; break;
      case "purchase_Ret":
        this.formType = "PUR.RET.";
        break;
      default:
    }
    //alert("Form Type" + this.formType);

    this.S_Init();
    ////alert(this.seriesList.length);
    //if (this.seriesList.length > 0) {
    //  this.isListLoad = true;
    //}

    //this.saleService.GetSeries(this.formType).subscribe(res => {
    //  this.seriesList = res["records"];
    //  this.isListLoad = true;
      
    //})
  }

  public Selected_Series(item: any):void {
    this.seriesRecord = item;
    alert("You Selected Me" + JSON.stringify(item));
    this._localStorage.set_Series(item);
    //get Max Bill Number
    let model = {
      "t": parseInt(this.seriesRecord["seriesid"]),
      "td": "2021-01-29T12:53:08.429Z",
      "type": "tran1",
      "l_acno": 0
    };

    this.saleService.GetMaxBill(model).subscribe(res => {
     
      this.billService.SendSeriesData({
        "series": item,
        "maxBillNo": res["billNumber"],

      });
    });
     this.dialog.closeAll();
    
  }

  public S_Init() {
   
    if (this.formType == "TAG GEN" || this.formType == "OPEN.STOCK" || this.formType == "QUOTATION") {
      this.flt.push("and no12<>0");
    }
    else {
      if (this._pub_VAR.pub_no12 == 2 || this._pub_VAR.pub_env == 2) {
        if (this.formType == "SALE" && (this._pub_VAR.pub_wr == "R" || this._pub_VAR.pub_gst == 1) && this._pub_VAR.pub_deal != 4) {
          if (this._pub_VAR.pub_gst == 1) {
            this.flt.push(" and(no12 = 2 or seriesid = 1 or seriesid = 130 or(taxtype = 3 and vtype = 'SALE'))");
          }
          else {
            this.flt.push(" and (no12=2 or seriesid=1 or seriesid=130)");
          }
        }
        else {

          this.flt.push("and no12=2");
        }
      }

      if (this._pub_VAR.pub_no12 ==3||(this.formNo12Type==3 && this._pub_VAR.pub_no12==1)||this._pub_VAR.pub_env==3) {
        if (this.formType == "SALE" || this._pub_VAR.pub_vtmp == 8) {
          this.flt.push(" and (no12=1 or seriesid=119)");
        }

        if (this.formType == "STOCK JOURNAL" && this._pub_VAR.pub_vtmp == 8) {
          //flt = "and (no12=1 or seriesid=113)"
          this.flt.push(" and (no12=1 or seriesid=113)");
        }
        else {
          this.flt.push(" and no12=1");
        }
      }

      if (this._pub_VAR.pub_no12 == 1) {
        if ((this._pub_VAR.pub_high == 1 || this._pub_VAR.pub_low == 1) && this._pub_VAR.pub_med == 1) {
          this.flt.push(" and no12<>0");
        }
        if ((this._pub_VAR.pub_high == 0 && this._pub_VAR.pub_low == 0) && this._pub_VAR.pub_med == 1) {
          this.flt.push(" and no12 = 2");
        }
        //case(pub_high = 1 or pub_low = 1) and pub_med = 0
        if ((this._pub_VAR.pub_high == 1 || this._pub_VAR.pub_low == 1) && this._pub_VAR.pub_med == 0) {
          this.flt.push(" and no12 = 1");
        }
        else {
          this.flt.push(" and no12<>0");
        }
      }
      else {
        this.flt.push(" and no12<>0");
      }

    }

    if (this.formType == "ORDER") {
      this.flt.push(" and (sermethod<3 or sermethod=5)");
    }

    if (this._pub_VAR.pub_ctype == 3) {
     let m_cnbook = this._localStorage.getPara('cnbook')[0]["vrval"];
      if (m_cnbook != 0) {
        this.flt.push(" and compno="+m_cnbook==undefined?0:m_cnbook);
      }
    }

    if (this._pub_VAR.pub_taging == 2) {
      this.flt.push(" and taging=0 ");
    }
    if (this.branchtype == 0) {
      this.flt.push(" and branch=0");
    }

    if (this.irrent == 0 && (this.formType == "ORDER" || this.formType == "ISSUE" || this.formType == "RECEIVE")) {
      if (this.formType == "ORDER") {
        this.flt.push(" and sermethod<>5");
      }
      else {
        this.flt.push("and sermethod<>6");

      }
    }

    if (this._pub_VAR.pub_vtmp == 2 || this._pub_VAR.pub_vtmp == 5) {
      this.flt.push(" and (vtype<>'ISSUE' or sermethod<>4)");
    }

    if (this.m_onapproval == 2) {
      this.flt.push(" and setting<>1");
    }
    if (this.m_jobno != 1) {
      this.flt.push(" and manu<>1");
    }
    if (this._pub_VAR.pub_manu == 0) {
      this.flt.push(" manu<>2");
    }

    if (this.m_raparate != 1) {
      this.flt.push(" and seriesid<>152");
    }
    if (this._pub_VAR.pub_ctype == 4) {
      this.flt.push("and brsiteid= "+ this._pub_VAR.pub_rsite);
     // this.flt.push("and brsiteid= " + this._pub_VAR.pub_rsite === undefined ? 0 : this._pub_VAR.pub_rsite);
    }
    else {
      if (this._pub_VAR.pub_rsite != 0) {
        let pub_rsite = this._pub_VAR.pub_rsite;
        if (pub_rsite == undefined) {
          pub_rsite = 0;
        }
       // alert(pub_rsite);
        this.flt.push("and (brsiteid=" + pub_rsite +" or brsiteid=0)");
       // this.flt.push("and (brsiteid=" + this._pub_VAR.pub_rsite === undefined ? 0 : this._pub_VAR.pub_rsite+" or brsiteid=0)");
      }
    }
 
 
   // let ctdate = "";
    if (this._pub_VAR.pub_gst == 0) {
      this.flt.push("and taxtype<>3");
    }
    else {
       if (this.m_gstdate.day!=null && this.formType.substr(0, 4) == "SALE"
        || this.formType.substr(0, 3) == "PUR" || this.formType == "ISSUE"
        || this.formType == "RECEIVE") {
        if (this.ctdate >=this.m_gstdate) {
          this.flt.push(" and (taxtype=3 or no12<>1 or billtype>3)");
        }
        else {
          this.flt.push("taxtype<>3 or no12<>1 or billtype>3");
        }
      }
    }

   

    if (this.formType != "CASH SALE") {
      this.flt.push(" and `show`<>'Y'");
    }

    let m_vtype = this.formType;
    if (m_vtype == 'CASH SALE') {
      m_vtype = "SALE";
    }
    
    let fltQuery = this.flt.join(' ');
    //alert("Here is the Querying the Filter");
  //  alert(JSON.stringify(fltQuery));
    var query = `select  pname, series, seriesid, vtype,${"`Show`"},sdate, edate, billtype, taging, sermethod, lnkgrdset, brsiteid, no12,srag,compno
                 from series as A where vtype="${m_vtype}"
                 and (edate>=${this.ctdate} or day(edate)=0)  ${fltQuery} and
                 not exists(select mnuid from lmenu  
                 where mnuid=A.seriesid and mno=2 and sdisp=1) order by srno,series`;

   // alert(JSON.stringify(query));
   // console.log(query);
    this._dbQuery.query(query).subscribe(res => {
    // alert(JSON.stringify(res));
      this.seriesList = res;
      this.isListLoad = true;
    });


   // alert("Now the Final Filter Query is");
   // alert(JSON.stringify(this.seriesList));

	

  }



  }




