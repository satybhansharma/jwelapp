import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { AfterViewInit, Component, HostListener, Inject, OnChanges, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { ActivatedRoute } from '@angular/router';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';
import { delay, isEmpty, map, takeUntil } from 'rxjs/operators';
import { createJSDocPublicTag, getEffectiveConstraintOfTypeParameter, isNamedTupleMember } from 'typescript';
import { BillCommunicationService } from '../../../shared/services/bill-communication.service';
import { CommonService } from '../../../shared/services/common.service';
import { DatabaseQueryService } from '../../../shared/services/database-query.service';
import { DatacommunicationService } from '../../../shared/services/datacommunication.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { AlertType } from '../../../shared/_alert';
import { SeriesComponent } from '../../sale/series/series.component';
import { AccountChildComponent } from '../account-child/account-child.component';
import { GLOBALVAR } from '../global-var';
import { SaleChildFormComponent } from '../sale-child-form/sale-child-form.component';
//import { SaleChildFormComponent } from '../sale-child-form/sale-child-form.component';
import { Sale } from './sale';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit  {

  routeName: string;
  constructor(
    public dialog: MatDialog,
    private ds: DatacommunicationService,
    private route: ActivatedRoute,
    private billComService: BillCommunicationService,
    private _cs: CommonService,
    private _localStorage: LocalStorageService,
    private _dbQuery: DatabaseQueryService,
    private http:HttpClient) {
    this.currentStringDate = new Date().toISOString().substring(0, 10);
    //this.GetFormBalance();
  }
 // private _destroyed$ = new Subject();
  destroy$: Subject<boolean> = new Subject<boolean>();
  cur_tmp1: any;
  cur_tmpb:any;
  _pub_VAR: GLOBALVAR;
  IsPaymentHidden = true;
  IsParentHidden = false;
  GridRecords: Array<Sale> = [];
  rowIndex: number = -1;
  newObj = {};
  action = "Add";
  dialogResult: boolean = false;
  value = 0;
  formType = "";

  Show_Receipt = false;
  Show_Payment = false;
  Show_Adjust = false;
  Show_MetalR = false;
  Show_MetalP = false;
  Show_GoldB = false;
  Show_SilvB = false;
  Show_Trans = false;
  Show_BalAdj = false;
  Show_Commission = false;
  Show_RateB = false;
  adsmntTitle = "";
  Value_Collection = true;
  //Get Series Name
  seriesName: string = "";
  maxBillNo: string = "";
  currentStringDate;
  seriesRecord: any;
  accountRecord: any;
  account: string;

 // isSeriesDialogOpen = true;
  //Balance Variable
  cal_fine1: any=0.0;
  cal_fine2: any=0.0;
  cal_amt: any=0.0;


  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
   
    

    //if (event.key === KEY_CODE.RIGHT_ARROW) {
    //  this.increment();
    //}
}

  


  ngOnInit() {

    //Assign the Global Variable to Global Variable
    this._pub_VAR = this._localStorage.get_Global_VAR();
    //alert(JSON.stringify("F date 2" + this._pub_VAR.pub_fdate2));
   // console.log(JSON.stringify(this._pub_VAR));
   // alert(JSON.stringify(this._pub_VAR));
    this.ds._getSaleChildData.subscribe(res => {

      this.bindExistData(res);
      
     
    });
   
    this.formType = this.route.snapshot.paramMap.get('id');

    //alert(this.formType);
    
 
   const result= this.billComService._billData.pipe(isEmpty());
    result.subscribe(x => console.log(x));
    if (this.billComService._billData.pipe(isEmpty())) {
     //alert("Pipe is Null");
      this.SeriesDialog();
    }
    else {
      alert("Pipe is not Null");
    }

      this.billComService._billData.subscribe(res => {
        let billType = res["bill_Type"];
        this.formType = res["bill_Type"]
        if (billType === "sale" || billType == "sale_Ret" || billType == "purchase"
          || billType == "purchase_Ret" || billType == "issue" || billType == "receive" || billType =="order") {
          this.SeriesDialog();
        }
        else {
          this.SeriesDialog();
        }
      })
   
    

    //Call Series Record
    this.billComService._SeriesData.subscribe(res => {
     // alert(JSON.stringify(res));
      this.seriesName = res["series"]["pname"];
      this.maxBillNo = res["maxBillNo"];
      this.seriesRecord = res["series"];
      alert(JSON.stringify(this.seriesRecord["no12"]));
      
    })

    //Get Account Service
    this.billComService._AccountData.subscribe(res => {
      this.accountRecord = res;
      this.account = res["CNAME"];
      let accontsREec: Array<any> = this.account.split("!");
     // alert(JSON.stringify(this.accountRecord));
     // alert(this.accountRecord["ACNO"]);
     // console.log(this.account.split("!")[1]);
     // alert(JSON.stringify(accontsREec));
      //console.log(res["ACNO"]);
    //  alert(JSON.stringify(res["acno"]));
    //  alert(JSON.stringify("CNAME First record"+this._localStorage.get_Cname_FirstRecord()));
      //alert("ACNO Value is" + JSON.stringify(this.accountRecord["ACNO"]));

        // this.GetFormBalance();
      
      //alert(JSON.stringify(res));
     // alert("Account data");
     // alert(JSON.stringify(res));

      this.GetFormBalance();
    })
    
    
  }



  callPaymentForm() {
    this.IsParentHidden = !this.IsParentHidden;
    this.IsPaymentHidden = !this.IsPaymentHidden;
  }

  cancelPaymentForm() {
    this.IsParentHidden = !this.IsParentHidden;
    this.IsPaymentHidden = !this.IsPaymentHidden;
  }
  openDialog(index, operation) {
   
    this.action = operation;
    this.rowIndex = index;
    if (this.action == "Add") {
    //  alert("Yes this ius add");
      this.newObj = {};
    }
    
    const dialogRef = this.dialog.open(SaleChildFormComponent, {
      // height: '100%',
      height: '60%',
      width: '60%',
      data: {action:this.action,data:this.newObj}
    });
    dialogRef.afterClosed().subscribe(res => {
      //alert(JSON.stringify(res));
      
    });
  }

  bindExistData(responseData: any) {
    let actionType = responseData["actionType"];
    if (responseData != null) {
      this.GridRecords[this.rowIndex] = responseData;
      let objectData = Object.getOwnPropertyNames(responseData);

        for (const key of objectData) {
          this.newObj[key] = ""
        }
      
      if (responseData != undefined && actionType!="Edit") {

        this.GridRecords.push(<any>this.newObj);

      }
     
    }
    else {
      alert("Value is null");
    }
  }

 public getName(val: any):string {
    let valId = "";
    try {
      valId = val["name"];
    } catch (e) {

    }
    return valId;
  }

  public tran1ionType(val: any): string {
    let valId = "";
    try {
      //valId = val["name"];
      valId = val["id"];
    } catch (e) {

    }
    return valId;
  }

  getValue(val: any): string {
  
    return "NA";
  }

  editRecord(item, index) {
    this.action = "Edit";
    this.newObj = item;
    this.openDialog(index,this.action);
  }
  deleteRecord(item) {
    let message = "Are You Confirm to Delete this Record";
   // const dialogData = new confirmDialogModel("Confirm Action", message);
    //const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //  maxWidth: "400px",
    //  data: dialogData
    //});
    //dialogRef.afterClosed().subscribe(dialogResult => {

    //  this.dialogResult = dialogResult["result"]
    //  if (this.dialogResult) {
    //    const index = this.GridRecords.indexOf(item);

    //    if (index > -1) {
    //      this.GridRecords.splice(index, 1);

    //    }
    //  }
    // })

    //this.confirmDialog();
    //if (this.dialogResult) {
    //  const index = this.GridRecords.indexOf(item);
      
    //  if (index > -1) {
    //    this.GridRecords.splice(index,1);
        
    //  }
    }

  
  SeriesDialog() {
   
    const dialogRef = this.dialog.open(SeriesComponent, {
      height: '60%',
      width: '30%',
      data: { FormType:this.formType}
    });

  }
  
  adjustmentType(adj: any) {
    this.Value_Collection = false;
    switch (adj) {
      case 'Receipt':
        this.AdjustmentFormDisplay();
        this.Show_Receipt = true;
        this.adsmntTitle = "Receipt";
        break;
      case 'Payment':
        this.AdjustmentFormDisplay();
        this.Show_Payment = true;
        this.adsmntTitle = "Payment";
        this.Show_Receipt = true;
        break;
      case 'Adjust':
        this.AdjustmentFormDisplay();
        this.Show_Adjust = true;
        this.adsmntTitle = "Adjust";
        break;
      case 'MetalR':
        this.AdjustmentFormDisplay();
        this.Show_MetalR = true;
        this.adsmntTitle = "Metal Receipt";
        break;
      case 'MetalP':
        this.AdjustmentFormDisplay();
        this.Show_MetalR = true;
        this.adsmntTitle = "Metal Payment";
        break;
      case 'GoldB':
        this.AdjustmentFormDisplay();
        this.Show_GoldB = true;
        this.adsmntTitle = "Gold Bhav";
        break;
      case 'SilvB':
        this.AdjustmentFormDisplay();
        this.adsmntTitle = "Silver Bhav";
        this.Show_GoldB = true;
        break;
      case 'Trans':
        this.AdjustmentFormDisplay();
        this.Show_Trans = true;
        this.adsmntTitle = "Transfer";
        break;
      case 'Commission':
        this.AdjustmentFormDisplay();
        this.Show_Commission = true;
        this.adsmntTitle = "Commission";
        break;
      case 'RateB':
        this.AdjustmentFormDisplay();
        this.Show_RateB = true;
        this.adsmntTitle = "Rate Booking";
        break;
      default:
    }
  }

  AdjustmentFormDisplay() {
    this.Show_Receipt = false;
    this.Show_Payment = false;
    this.Show_Adjust = false;
    this.Show_MetalR = false;
    this.Show_MetalP = false;
    this.Show_GoldB = false;
    this.Show_SilvB = false;
    this.Show_Trans = false;
    this.Show_BalAdj = false;
    this.Show_Commission = false;
    this.Show_RateB = false;
   // this.Value_Collection = true;

  }
  cancelAdjustType() {
    this.Value_Collection = !this.Value_Collection;
    this.AdjustmentFormDisplay();
  }

  //Open Accounts Dialog Form
  accDialog() {

    if (this.seriesRecord === undefined) {
      alert("Select the Series First");
    }
    else {
      const accMastDialog = this.dialog.open(AccountChildComponent, {

        height: '70%',
        width: '40%',
        data: {
          "form_Type": this.formType,
          "seriesId": this.seriesRecord["series"]["seriesid"],
          "looseapp": 0
        }
      })
      accMastDialog.afterClosed().subscribe(res => {
       // this.accountRecord = res;
       // this.accName = res["cname"];
       // alert("i have been closed");
       // this.GetFormBalance();
       // alert(JSON.stringify(this.accountRecord));
      //   alert("C_Name" + JSON.stringify(this._localStorage.get_Cname()));
      
      })
    }
  }


  public GetFormBalance() {

    let acno = 0; let no12 = 0;
    let record = [];
    

    let flt = [];
    let bflt = [];
    let f_Flt = [];
   // let cur_tmp1;
    let cur_tmp2;
    let cur_tmpb;
    let _cmd;
    let tno = 0;
  
    let t: any; let n: any; let td: any; let tn: any; let l_type: number; let l_hisab: any;
    let l_siteid: any; let l_mcurrid: any; let tmp_refno: any; let ar_refno: any;
    let tmp_point: any; let amount = 0; let fine1 = 0; let fine2 = 0; let grosswt1 = 0;
    let sql_cmd1 = "";
    let sql_cmd2 = "";
    let sql_cmd3 = "";
    let sql_cmd4 = "";
    let sql_cmd5 = "";
    let sql_cmd6 = "";
    let sql_cmd7 = "";
    let sql_cmd77 = "";
    let sql_cmd8 = "";
    //let cur_tmpb = "";
    
    td = this._cs.Today_Date();
    acno = this.accountRecord["ACNO"];
    no12 = this.seriesRecord["no12"];

    tno = 0;
    t = acno;
    n = no12;
    //alert("T is" + t);
    //alert("And No12 is"+n)
    //l_type = "a/c,sub a/c,group";
    l_type = 1;
    l_hisab = "";
    l_siteid = 0;
    l_mcurrid = 0;
   // tn = tno;

    let m_voubal: any;// = getpara("voubal")
    let m_mcurrid: any;// = getpara("mcurrid")
    let a_mcurrid: any;// = m.mcurrid
    m_voubal = this._localStorage.getPara('voubal')[0]["vrval"];
    m_mcurrid = this._localStorage.getPara('mcurrid')[0]["vrval"];
    a_mcurrid = m_mcurrid;
    if (this._pub_VAR.pub_mcurr == undefined) {
      this._pub_VAR.pub_mcurr = 0;
    }
    debugger;

    if (this._pub_VAR.pub_mcurr == 1 && (l_type == 1 || l_type == 4 || l_type == 5 || l_type == 6) && t != 0) {
      var sql_cmd = `SELECT mcurrid FROM accmast WHERE acno=${t}`;
      
      this._dbQuery.execute_Scalar(sql_cmd).subscribe(res => {
        a_mcurrid = res["results"];
      })
    }
    else {

       sql_cmd1 = "select ifnull(mcurrid,0)  from accmast where acno =" + t;
      
      this._dbQuery.execute_Scalar(sql_cmd1).subscribe(res => {
        a_mcurrid=res["results"]
      })
      
    }

    if (l_mcurrid > -1) {
      a_mcurrid = l_mcurrid
    }

    switch (l_type) {
      
      case 1 ||  4 || 5 ||6:
       // alert("Im in ltype");
        if (l_hisab == 'Y') {
          flt.push(`acno=${t} and (account!='N' or vtype='OPENING WTBAL' or ((diawt!=0 or stnwt!=0) and vtype='REPAIR')) and (hisab!=0 or tno<0 or vtype='OPENING WTBAL')`);
        }
        else {
          flt.push(`acno=${t} and (account!='N' or vtype='OPENING WTBAL' or ((diawt!=0 or stnwt!=0) and vtype='REPAIR')) and (hisab!=0 or tno<0 or vtype='OPENING WTBAL')`);
        }
        bflt = [];

        if (tn != 0) {
          if (l_hisab == 'CASH') {
            bflt.push(`and tran1.tno<> ${n}`);
          }
        }
        if (l_siteid != 0) {
          bflt.push(`and tran1.siteid=${l_siteid}`);
        }
        bflt = flt;



        break;
      case 2:
        flt = [];
        flt.push(`and rnameid=${t} and (account<>='N' or vtype='OPENING WTBAL') and (tdate<=${this._cs.Today_Date} or tno<0 or vtype='OPENING WTBAL')"`);
        bflt = flt; break;
      case 3:
        flt = [];
        flt.push(`and accmast.groupid=${t} and (tran1.account<>'N' or tran1.vtype=='OPENING WTBAL') and (tran1.tdate<=${td}  or tran1.tno<0 or tran1.vtype=='OPENING WTBAL')`);
        bflt = flt;
        
      default:
    }

    if (n == 3 || (n == 1 && m_voubal != 1)) {
     // flt.push(`and tran1.no12<>2`);
      flt.push(` and tran1.no12<>2`);
    }
    else {
     // flt.push(`and tran1.no12<>3 and tran1.daily<>8 and tran1.daily<>4`);
      flt.push(`and tran1.no12<>3 and tran1.daily<>8 and tran1.daily<>4`);
    }
    if (tn != 0) {
      if (l_hisab == 'CASH') {
        flt.push(`and (tran1.tno <>${tn==undefined?0:tn} and tran1.tdate<=${this._cs.Today_Date}`);
      }
      else {
        flt.push(`and (tran1.tno!=${tn==undefined?0:tn} and tran1.tdate<=${td})`);
      }
    }
    else {
     // flt = flt + " and (tran1.tno<" + allt(str(tn)) + " or tran1.tdate<'" + c_td + "' or tran1.vtype='OPENING WTBAL')"
      flt.push(`and (tran1.tno< ${tn==undefined?0:tn} or tran1.tdate<${this._cs.Today_Date} or tran1.vtype='OPENING WTBAL')`);
    }
   
    if (l_siteid != 0) {
      flt.push(`and tran1.siteid="${l_siteid}`);
    }
    f_Flt = flt;
    if (this._pub_VAR.pub_mcurr == 1) {
      if (t = 71) {
        flt.push(`and tran1.mcurrid=${a_mcurrid}`);
        bflt.push(`and tran1.mcurrid=${a_mcurrid})`);
      }
      if (l_mcurrid > -1 && t!=71) {
        flt.push(`and tran1.mcurrid= ${l_mcurrid}`);
        bflt.push(`and tran1.mcurrid=${l_mcurrid}`);
      }
    }

    let flt_Data = flt.join(' ');
    let f_flt_Data = f_Flt.join(' ');
    if (l_type == 3) {
      sql_cmd2 = `select tran1.refno,tran1.tdate,sum(tran1.amount) as amount,
                     sum(tran1.fine1) as fine1, sum(tran1.fine2) as fine2,
                     sum(tran1.othfine) as othfine from tran1 as tran1
                     left outer join accmast on accmast.acno=tran1.acno where =${flt_Data} `;

      //this._dbQuery.query(sql_cmd2).subscribe(res => {
      //  //alert(JSON);
      // // alert(JSON.stringify(res));
      // this.cur_tmp1 = res;
      //});
      sql_cmd3 = `select ifnull(tran1.refno,'')as refno,
                      ifnull(tran1.tdate)as tdate from tran1 as tran1
                      left outer join accmast on accmast.acno=tran1.acno
                       where  ${flt} group by tran1.trnid order by tran1.trnid`
                
      //sql_cmd3 = sql_cmd + " where " + flt + " group by tran1.trnid order by tran1.trnid"
      //this._dbQuery.query(sql_cmd3).subscribe(res => {
      //  cur_tmp2 = res;
      //});

    }

    else {
      sql_cmd4 = "";

      switch (l_type) {
        case 5 || 6:
          if (this._pub_VAR.pub_bullion == 1 && t == 1) {
            let bflt_Data = bflt.join(' ');
            if (l_type == 6) {

              sql_cmd4 = `select ifnull(sum(0-amount),0) as amount,
                          ifnull(sum(0 - fine1),0) as fine1,
                          ifnull(sum(0 - fine2),0) as fine2,
                          ifnull(cashbank,'') from tran1
                          where ${bflt_Data} group by cashbank`;

            }
            else {
              sql_cmd4 = `select ifnull(sum(0-amount),0) as amount,
                        ifnull(sum(0-fine1),0) as fine1,
                        ifnull(sum(0-fine2),0) as fine2 from tran1
                        where ${bflt_Data}`;

            }
           
            //cur_tmpb=db
            //alert(JSON.stringify(sql_cmd));
            //this._dbQuery.query(sql_cmd4).subscribe(res => {
            //  cur_tmpb = res["results"];
            //});

          }
          sql_cmd5 = "";
     // sqlcmd5 = "";
          f_flt_Data = f_Flt.join(' ');
          if (this._pub_VAR.pub_mcurr == 1) {
            sql_cmd5 = `select ifnull(sum(amount),0) as amount,
                        ifnull(sum(fine1),0) as fine1,
                        ifnull(sum(fine2),0) as fine2,
                        mcurrid from tran1 as tran1 where ${f_flt_Data}
                        group by mcurrid`;
          }
          else {
            if (l_type == 6) {
              sql_cmd5 = `select ifnull(sum(amount),0) as amount,
                         ifnull(sum(fine1),0) as fine1,
                         ifnull(sum(fine2),0) as fine2,
                          cashbank from tran1 as tran1
                          where ${f_flt_Data} group by cashbank`;
            }
            else {
              sql_cmd5 = `select ifnull(sum(amount),0) as amount,
                        ifnull(sum(fine1),0) as fine1,
                        ifnull(sum(fine2),0) as fine2 from tran1 as
                        tran1 where ${f_flt_Data}`;
            }

            //this._dbQuery.query(sql_cmd5).subscribe(res => {
            // this.cur_tmp1 = res["results"];
            //});

          }
          
          break;
        default:
      sql_cmd6 = "";
          if (this._pub_VAR.pub_bullion == 1 && t == 1) {
            var bflt_Data = bflt.join(' ');
            sql_cmd6= `select ifnull(refno,'') as refno,ifnull(tdate,'0000-00-00 00:00:00') as tdate,
                      ifnull(sum(0-amount),0) as amount,
                      ifnull(sum(0-fine1),0) as fine1,
                      ifnull(sum(0-fine2),0) as fine2,
                      ifnull(sum(0-othfine),0) as othfine
                      from tran1 as tran1 where  ${bflt_Data} `;
            this._dbQuery.query(sql_cmd6).subscribe(res => {
              cur_tmpb = res
            });
          }
         // debugger;
          //let sql_cmd7 = "";
         // let sql_cmd77=";"
          if (this._pub_VAR.pub_mcurr == 1) {
            sql_cmd7 = `select ifnull(refno,'')as refno,ifnull(max(tdate),'0000-00-00 00:00:00')as tdate,ifnull(mcurrid,0),
                       ifnull(sum(amount),0) as amount,ifnull(sum(fine1),0) as fine1,
                       ifnull(sum(fine2),0) as fine2,ifnull(sum(othfine),0) as othfine,
                        ifnull(sum(grosswt1),0) as grosswt1,
                      ifnull(sum(grosswt2),0) as grosswt2,ifnull(sum(diawt),0) as diawt,
                      ifnull(sum(stnwt),0) as stnwt from tran1 as tran1 where ${f_Flt.join(' ')}  group by mcurrid`
            
          }
          else {
            
            sql_cmd7 = `select ifnull(refno,'')as refno,ifnull(max(tdate),'0000-00-00 00:00:00')as tdate,0 as mcurrid,
                       ifnull(sum(amount),0) as amount, ifnull(sum(fine1),0) as fine1,ifnull(sum(fine2),0) as fine2,
                       ifnull(sum(othfine),0) as othfine,
                        ifnull(sum(grosswt1),0) as grosswt1,ifnull(sum(grosswt2),0) as grosswt2,
                       ifnull(sum(diawt),0) as diawt,ifnull(sum(stnwt),0) as stnwt from tran1 as tran1 
                    where ${f_Flt.join(' ')}`
              
          }

          
          

         

          
          sql_cmd77 = `SELECT ifnull(refno,''),ifnull(tdate,'0000-00-00 00:00:00')as tdate FROM tran1  WHERE ${f_Flt.join(' ')} ORDER BY tno desc limit 1`
          //if (tmp_refno == null || tmp_refno == undefined) {
          //  this._dbQuery.query(sql_cmd7).subscribe(res => {
            
          //    ar_refno = res["results"];
          //  });
          //}
        }
    }

    if (l_type == 4) {
      sql_cmd8 = "";
      sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itran1 as it JOIN itemmast ON itemmast.ino=it.ino
                JOIN igroup ON igroup.igroupid=itemmast.igroupid JOIN tran1 ON tran1.vono=it.vono
                WHERE tran1.acno= ${t} AND (it.type=='S' OR it.type=='AS')`
      //this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
      //  tmp_point=res["results"]
      //})
      sql_cmd8 = "";
      sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itemtran as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
               JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`;
      //this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
      //  tmp_point = parseFloat(tmp_point) + parseFloat(res["results"]);
      //})
      sql_cmd8 = "";
      sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
                 JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`

      //this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
      //  tmp_point =parseFloat(tmp_point) -parseFloat(res["results"]);
      //});
      sql_cmd8 = "";
      sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
                  sql_cmd = sql_cmd + "JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND (it.type=='S' OR it.type=='AS')`
      //this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
      //  tmp_point = parseFloat(tmp_point) + parseFloat(res["results"]); 
      //});
      sql_cmd8 = "";
      sql_cmd = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
                  JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`;
      //this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
      //  tmp_point = parseFloat(tmp_point) - parseFloat(res["results"]);

      //})


      
      
     
    }
 
    tmp_point = 0;
    let tmp_amt = 0;
    let tmp_Amt2 = 0;
    let tmp_fine1 = 0.0; let tmp_fine2 = 0.0; let tmp_othfine = 0.0;
    let tmp_grosswt1 = 0.0; let tmp_grosswt2 = 0.0; let tmp_diawt = 0.0; let tmp_stnwt = 0.0;
    let tmp_cash = 0.0; let tmp_chq = 0.0;

     tmp_refno = '';
    let tmp_tdate = this._cs.Today_Date();
    
    
    //Call the Process one by one in nested form
    if (sql_cmd2 != "" || sql_cmd7 != "" || sql_cmd5 != "") {
      let cmd_1 = sql_cmd2;
      if (cmd_1 == "") { cmd_1 = sql_cmd5; }; if (cmd_1 == "") { cmd_1 = sql_cmd7; }
   //   alert("We Found cmd_1" + cmd_1);
      this._dbQuery.query(cmd_1).subscribe(res => {

        if (res != "") {
          this.cur_tmp1 = res;
        //   alert("Response is not null");
         // alert("Cur_tmp1" + JSON.stringify(this.cur_tmp1));

          
          
         //Now Call sql_cmd1
          this._dbQuery.execute_Scalar(sql_cmd1).subscribe(res => {
            a_mcurrid = res["results"];
           
            //call sql cmd3
            if (sql_cmd3 != "") {
              this._dbQuery.query(sql_cmd3).subscribe(res => {
                //alert("Alert 3 Data" + JSON.stringify(res));
                cur_tmp2 = res;
              })
             }
            
            //call sql_cmd4 and sql_cmd6
            if (sql_cmd4 != "" || sql_cmd6 != "") {
              if (sql_cmd4 == "") {
                sql_cmd4 = sql_cmd6;
              }
              this._dbQuery.query(sql_cmd4).subscribe(res => {
                this.cur_tmpb = res;
               // alert("Sql Commnd 4"+JSON.stringify(this.cur_tmpb));
              })
            }

            //call sql_cmd77
            if (sql_cmd77 != "") {
              this._dbQuery.query(sql_cmd77).subscribe(res => {
                ar_refno = res;
              }); 
            }

            //call sql_cmd8
            if (sql_cmd8 != "") {
              this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
                tmp_point = res["results"];
              //  alert("Im in command 8");
              //  alert(JSON.stringify(tmp_point));
              })
            }

            //Now Assign the Procedure Data here
            //this.cur_tmp1 = res;
            if ((this._pub_VAR.pub_mcurr == 1 && l_type != 5) || l_type == 6) {
              if (l_type != 5 && l_type != 6) {
                alert("Now in Best methiod" + JSON.stringify(this.cur_tmp1));
                tmp_fine1 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine1");
                tmp_fine2 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine2");
                tmp_othfine = this._cs.Calc_List_Sum(this.cur_tmp1, "othfine");

                // CALCULATE SUM(fine1), SUM(fine2), SUM(othfine) TO tmp_fine1, tmp_fine2, tmp_othfine
                if (l_type != 3) {
                  tmp_grosswt1 = this._cs.Calc_List_Sum(Array(this.cur_tmp1), "grosswt1");
                  tmp_grosswt2 = this._cs.Calc_List_Sum(Array(this.cur_tmp1), "grosswt2");
                  tmp_diawt = this._cs.Calc_List_Sum(this.cur_tmp1, "diawt");
                  tmp_stnwt = this._cs.Calc_List_Sum(this.cur_tmp1, "stnwt");
                  //CALCULATE SUM(grosswt1), SUM(grosswt2), SUM(diawt), SUM(stnwt) TO tmp_grosswt1, tmp_grosswt2, tmp_diawt, tmp_stnwt
                }
                else {
                  tmp_fine1 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine1");
                  tmp_fine2 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine2");

                }

              }

              if (l_type == 6) {

                //if Cash Bank !=2
                if (Array.isArray(this.cur_tmp1)) {
                  //let sum = 0.0;
                  Array(this.cur_tmp1).forEach(function (item, index) {
                    if (item["cashbank"] != 2) {
                      tmp_cash += item["amount"];
                    }

                  })
                }

                //if Cash Bank ==2
                if (Array.isArray(this.cur_tmp1)) {
                  //let sum = 0.0;
                  Array(this.cur_tmp1).forEach(function (item, index) {
                    if (item["cashbank"] == 2) {
                      tmp_chq += item["amount"];
                    }

                  })
                }
                tmp_amt = tmp_cash + tmp_chq;
              }
              else {
                if (m_mcurrid != 1) {
                  tmp_amt = amount;
                }
                if (m_mcurrid == 1) {
                  tmp_Amt2 = amount;
                }
              }
            }
            else {
              if (l_type != 3 && l_type != 5) {
                tmp_grosswt1 = this.cur_tmp1[0]["grosswt1"] == undefined ? 0 : this.cur_tmp1[0]["grosswt1"];
                tmp_grosswt2 = this.cur_tmp1[0]["grosswt2"] == undefined ? 0 : this.cur_tmp1[0]["grosswt2"];
                tmp_diawt = this.cur_tmp1[0]["diawt"] == undefined ? 0 : this.cur_tmp1[0]["diawt"];
                tmp_stnwt = this.cur_tmp1[0]["stnwt"] == undefined ? 0 : this.cur_tmp1[0]["stnwt"];
              }
              //alert(JSON.stringify(this.cur_tmp1));
              //console.log(this.cur_tmp1);
              tmp_amt = this.cur_tmp1[0]["amount"] == undefined ? 0 : this.cur_tmp1[0]["amount"];
              tmp_fine1 = this.cur_tmp1[0]["fine1"] == undefined ? 0 : this.cur_tmp1[0]["fine1"];
              tmp_fine2 = this.cur_tmp1[0]["fine2"] == undefined ? 0 : this.cur_tmp1[0]["fine2"];;
            }
            if (l_type != 5) {
              tmp_othfine = this.cur_tmp1[0]["othfine"] == undefined ? 0 : this.cur_tmp1[0]["othfine"];
              tmp_refno = this.cur_tmp1[0]["refno"] == undefined ? 0 : this.cur_tmp1[0]["refno"]; //refno==undefined?"":refno;
              tmp_tdate = this.cur_tmp1[0]["tdate"] == undefined ? 0 : this.cur_tmp1[0]["tdate"];
            }

            //Now Call Other Procedures

            if (ar_refno != undefined) {
              try {
                tmp_refno = ar_refno["refno"];
                tmp_tdate = ar_refno["tdate"];
              } catch (e) {
                tmp_refno = "";
                tmp_tdate = this._cs.Today_Date;
              }
            }

            if (cur_tmpb != undefined) {
              if (tmp_tdate == undefined || tmp_tdate == null) {
                tmp_tdate = this._cs.Today_Date;
              }
              if (tmp_refno == undefined || tmp_refno == null) {
                tmp_refno = '';
              }
              amount = 0;
              fine1 = 0;
              fine2 = 0;

              if (l_type == 6) {
                let tmp_fine1b = this._cs.Calc_List_Sum(cur_tmpb, "fine1");
                let tmp_fine2b = this._cs.Calc_List_Sum(cur_tmpb, "fine1");
                let tmp_cash2 = this._cs.Calc_List_Sum(cur_tmpb, "amount");
                let tmp_chq2 = this._cs.Calc_List_Sum(cur_tmpb, "amount");
                tmp_cash = tmp_cash + tmp_cash2;
                tmp_chq = tmp_chq + tmp_chq2;
                tmp_amt = tmp_amt + tmp_cash2 + tmp_chq2;
                tmp_fine1 = tmp_fine1 + tmp_fine1b;
                tmp_fine2 = tmp_fine2 + tmp_fine2b;
              }
              else {
                tmp_amt = tmp_amt + amount;
                tmp_fine1 = tmp_fine1 + fine1;
                tmp_fine2 = tmp_fine2 + fine2;
                if (l_type != 5) {
                  tmp_othfine = tmp_othfine + cur_tmpb[0]["othfine"];
                }
              }
            }





            let curchk: any;
            if (this._pub_VAR.pub_bullion == 1 && this._pub_VAR.pub_mcurr == 1 && t == 71) {
              if (n == 3 || (n == 1 && m_voubal != 1)) {
                sql_cmd = `SELECT type,ifnull(SUM(amount),0) as amount FROM bull1 WHERE vtype='IMPORT'
                  AND tdate<='${this._cs.Today_Date}' AND no12!=2 GROUP BY 1`;
              }
              else {
                sql_cmd = `SELECT type,ifnull(SUM(amount),0) as amount FROM bull1 WHERE vtype='IMPORT' AND tdate<='${this._cs.Today_Date}' AND no12!=3 GROUP BY 1`

              }
              this._dbQuery.query(sql_cmd).subscribe(res => {
                curchk = res["results"];
              });
              amount = 0;
              if (curchk["type"] == "P") {
                tmp_amt = tmp_amt - curchk["amount"];
              }
              else {
                tmp_amt = tmp_amt + curchk.amount;
              }


            }
            this.cal_fine1 = tmp_fine1;
            this.cal_fine2 = tmp_fine2;
            this.cal_amt = tmp_amt;


          })

        }
        else {
          //alert("Response is null");
        }
      })
    }
    

   
  }


 
  }

export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  TAB = 'Tab',
  ESCAPE = 'Escape',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  DELETE = 'Delete',
  INSERT = 'Insert',
  HOME = 'Home',
  END = 'End',
  PAGE_UP = 'PageUp',
  PAGE_DOWN = 'PageDown',
  BACK_SPACE = 'BackSpace',
  NUM_1 = '1',
  NUM_2 = '2',
  NUM_3 = '3',
  NUM_4 = '4',
  NUM_5 = '5',
  NUM_6 = '6',
  NUM_7 = '7',
  NUM_8 = '8',
  NUM_9 = '9',
  NUM_0 = '0',
  CAPS_LOCK = 'CapsLock',



}
