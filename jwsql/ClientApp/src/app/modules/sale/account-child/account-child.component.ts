import { Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { BillCommunicationService } from '../../../shared/services/bill-communication.service';
import { CommonService } from '../../../shared/services/common.service';
import { DatabaseQueryService } from '../../../shared/services/database-query.service';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { GLOBALVAR } from '../global-var';
import { SaleService } from '../service/sale.service';

@Component({
  selector: 'app-account-child',
  templateUrl: './account-child.component.html',
  styleUrls: ['./account-child.component.css']
})
export class AccountChildComponent implements OnInit {


  isShowPop = false;
  getRowStyle;
  cur_tmp1: any;
  _pub_VAR: GLOBALVAR;
  columnDefs = [
    {
      field: "CNAME",
      floatingFilter: true,
      sortable: true,

      filter: 'agTextColumnFilter',
        floatingFilterComponentParams: { suppressFilterButton: true },
      cellStyle: { 'padding-left': '2px','text-align':'center','font-weight':'550' }
    },
  ];


  seriesData: any;
  accounts = [];
  isRecordLoad = false;
  
  formType: string;
  constructor(private _salSer: SaleService,
    @Inject(MAT_DIALOG_DATA) public Data,
    private dialogRef: MatDialogRef<AccountChildComponent>,
    private _localStorage: LocalStorageService,
    private _dbQuery: DatabaseQueryService,
    private _billService: BillCommunicationService,
    private _cs: CommonService) {

    this.getRowStyle = function (params) {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold', 'background': 'lightGray' };
      }
    };

   
  }
  onCellClicked(event:any){
    var rowload=event.node;   
   // alert("We got the data"+rowload.data);
    //console.log(rowload.data);
    this.dialogRef.close();
    //Load Account Data Service
    this._billService.SendAccountData(rowload.data);
   //this._localStorage.set_Cname_FirstRecord(rowload.data);
    //this.GetFormBalance();

  }
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
    

  

  
  ngOnInit(): void {
    this._pub_VAR = this._localStorage.get_Global_VAR();
    //alert(JSON.stringify(this.Data));
    //if (this.Data["form_Type"] != undefined) {
    //  switch (this.Data["form_Type"]) {
    //    case 'sale': this.formType = "SALE"; break;
    //    case  'SALE':
    //    default:
    //  }
    //}
    
    this.formType = this.Data["form_Type"];
   
   //alert("Form Type is"+this.formType);
    this._pub_VAR = this._localStorage.get_Global_VAR();
   // alert("Public variable");
   // alert(JSON.stringify(this._pub_VAR));
    //console.log(JSON.stringify(this._pub_VAR));
    this._LoadAccounts();
    

    
  }
  LoadAccounts() {
    try {
      this.seriesData = this.Data;
     // alert("Series Data" + alert(this.accounts));

     // this.seriesData["seriesid"] = 52;

      this._salSer.GetAccounts(this.seriesData).subscribe(res => {
        alert(JSON.stringify(res["accounts"]));
        this.accounts = res["accounts"];
        this.isRecordLoad = true;

      })
    } catch (e) {

    }
   
  }

  Selected_account(item: any) {
    //alert(JSON.stringify(item));
    this.dialogRef.close(item);
    //Load Account Data Service
    this._billService.SendAccountData(item);
    //First Remove the Item
   
  }

  _LoadAccounts() {
   
    this.isRecordLoad = true;
    let acc_Filter = [];
    let record = this._localStorage.get_Series();
    let s_rag = record["srag"];
  

    switch (s_rag) {
      
      case 2:
     
        var query1 = `select acno,cname,groupid from accmast where exists 
          (select groupid from srgrp where seriesid =${record["seriesid"]} and groupid = accmast.groupid)
        and active <> 'N' and acno <> 1`;
        alert();
        this._dbQuery.query(query1).subscribe(res => {
          this.accounts = res;
        });
        return;
        break;
      case 3:
       
        var query2 = `select acno,cname,groupid  from accmast where not exists 
           (select groupid from srgrp where seriesid =${record["seriesid"]} and groupid = accmast.groupid)
            and active <> 'N' and acno <> 1`;
        this._dbQuery.query(query2).subscribe(res => {
          // alert(JSON.stringify());
          this.accounts = res;
        });
        return;
        break;
      default: break;
       
        this.isRecordLoad = false;
    }
    
    switch (record["no12"] == undefined ? 0 : record["no12"]) {
      case 1 || 3:
        acc_Filter.push("acno12<>2 and acno<>1"); break;
      case 2 || 0:
        acc_Filter.push("acno12<>3 and acno<>1"); break;
      default:
    }
    if (record["compno"] != 0 && this._pub_VAR.pub_ctype < 3) {
      
      this._pub_VAR.pub_sno = record["compno"];
      let query = "and (compno=" + this._pub_VAR.pub_sno + "or compno=''"
      acc_Filter.push(query);
    }
    let serMethod = record["sermethod"] == undefined ? 0 : record["sermethod"];
    switch (this.formType.toUpperCase()) {
      case "SALE" || "QUOTATION" || "ORDER"
        || "REPAIR" || "OPEN.STOCK" || "ISSUE" || "RECEIVE" && serMethod == 6:
        acc_Filter.push("and saleg='Y' and active<>'N'"); break;
      case "PURCHASE" || "PUR.RET.":
        acc_Filter.push("and purchaseg='Y' and active<>'N'");
        break;
      case "ISSUE" || "RECEIVE" || "OPENING WTBAL" || "STOCK JOURNAL":
        if ((this.formType == "ISSUE" || this.formType == "RECEIVE") && serMethod == 1) {
          acc_Filter.push("and issueg='Y' and active<>'N'");
        }
        else if ((this.formType == "ISSUE" || this.formType == "RECEIVE") && serMethod > 1) {
          acc_Filter.push("and issueg='Y' and grtype='Karigar' or (grtype='Supplier' or grtype='Branch') and active<>'N' ");
        }
        else if (this.formType == "STOCK JOURNAL") {
          acc_Filter.push("and jobid<>0 and active<>'N'");
        }
        else {
          acc_Filter.push("and active<>'N'");
        }
        break;
      default:
    }


    let billType = record["billtype"] == undefined ? 0 : record["billtype"];


    let ctype = this._localStorage.getPara("ctype")[0]["vrval"];
   
    let looseApp = this._localStorage.getPara("looseapp")[0]["vrval"];
    if (this.formType.toUpperCase() == "SALE RET." ||
      this.formType.toUpperCase() == "PUR.RET." && billType == 5 &&
      (ctype != 2 || looseApp == 1 && this.formType.toUpperCase() == "PUR.RET.")) {
      
      var query = `select * from accmast as a where 
                       exists(select acno from tran1 where(tran1.billtype = 5
                        or tran1.vtype = 'OPEN.STOCK' or tran1.vtype = 'OPEN.APPROVAL')
                        and a.acno = ACNO)`;
      this._dbQuery.query(query).subscribe(res => {
        this.accounts = res;
        alert(JSON.stringify(res));
      });
      return;
    }

    let pub_raccount = this._pub_VAR.pub_raccount;
    let loginId = this._pub_VAR.pub_loginid;

    if (pub_raccount == 2 && loginId != 0) {
      
      var query = `select* from accmast as A
                        where exists(
                        select groupid from clgrp as B where A.groupid = B.groupid and B.loginid = "+_gModel.pub_loginid+" and B.groupid <> 0) and " +${acc_Filter.join(' ')}`;
      this._dbQuery.query(query).subscribe(res => {
        this.accounts = res;
      });
      return;

    }


    let elseQuery = "select ACNO, CNAME from accmast ";

    this._dbQuery.query(elseQuery).subscribe(res => {
    
      this._localStorage.remove_Cname();
      this.accounts = res;
      this._localStorage.set_Cname(res);
     /// alert(JSON.stringify(res));
    
      
    })
   
  }




  //public GetFormBalance() {
   
  //  let acno = 1; let no12 = 1;
  //  alert("im in Child account");

  //  let record = [];


  //  let flt = [];
  //  let bflt = [];
  //  let f_Flt = [];
  //  // let cur_tmp1;
  //  let cur_tmp2;
  //  let cur_tmpb;
  //  let _cmd;
  //  let tno = 0;

  //  let t: any; let n: any; let td: any; let tn: any; let l_type: number; let l_hisab: any;
  //  let l_siteid: any; let l_mcurrid: any; let tmp_refno: any; let ar_refno: any;
  //  let tmp_point: any; let amount = 0; let fine1 = 0; let fine2 = 0; let grosswt1 = 0;
   
  //  td = this._cs.Today_Date();
  ////  acno = this.accountRecord["ACNO"];
  // // no12 = this.seriesRecord["no12"];
  //  // acno = 33674;
  // // no12 = 73;
  //  tno = 0;
  //  t = acno; 
  //  n = no12;
  //  //alert("T is" + t);
  //  //alert("And No12 is"+n)
  //  //l_type = "a/c,sub a/c,group";
  //  l_type = 1;
  //  l_hisab = "";
  //  l_siteid = 0;
  //  l_mcurrid = 0;
  //  // tn = tno;
  //  //debugger;
  //  let m_voubal: any;// = getpara("voubal")
  //  let m_mcurrid: any;// = getpara("mcurrid")
  //  let a_mcurrid: any;// = m.mcurrid
  //  m_voubal = this._localStorage.getPara('voubal')[0]["vrval"];
  //  m_mcurrid = this._localStorage.getPara('mcurrid')[0]["vrval"];
  //  a_mcurrid = m_mcurrid;
  //  if (this._pub_VAR.pub_mcurr == undefined) {
  //    this._pub_VAR.pub_mcurr = 0;
  //  }

  //  if (this._pub_VAR.pub_mcurr == 1 && (l_type == 1 || l_type == 4 || l_type == 5 || l_type == 6) && t != 0) {
  //    var sql_cmd = `SELECT mcurrid FROM accmast WHERE acno=${t}`;
  //    //alert(JSON.stringify(sql_cmd));
  //    this._dbQuery.execute_Scalar(sql_cmd).subscribe(res => {
  //      alert(JSON.stringify(res));
  //      a_mcurrid = res["results"];
  //    })
  //  }
  //  else {

  //    var sql_cmd1 = "select ifnull(mcurrid,0)  from accmast where acno =" + t;

  //    this._dbQuery.execute_Scalar(sql_cmd1).subscribe(res => {
  //      a_mcurrid = res["results"]
  //    })

  //  }

  //  if (l_mcurrid > -1) {
  //    a_mcurrid = l_mcurrid
  //  }

   
  //  switch (l_type) {

  //    case 1 || 4 || 5 || 6:
  //      alert("Im in ltype");
  //      if (l_hisab == 'Y') {
  //        flt.push(`acno=${t} and (account!='N' or vtype='OPENING WTBAL' or ((diawt!=0 or stnwt!=0) and vtype='REPAIR')) and (hisab!=0 or tno<0 or vtype='OPENING WTBAL')`);
  //      }
  //      else {
  //        flt.push(`acno=${t} and (account!='N' or vtype='OPENING WTBAL' or ((diawt!=0 or stnwt!=0) and vtype='REPAIR')) and (hisab!=0 or tno<0 or vtype='OPENING WTBAL')`);
  //      }
  //      bflt = [];

  //      if (tn != 0) {
  //        if (l_hisab == 'CASH') {
  //          bflt.push(`and tran1.tno<> ${n}`);
  //        }
  //      }
  //      if (l_siteid != 0) {
  //        bflt.push(`and tran1.siteid=${l_siteid}`);
  //      }
  //      bflt = flt;



  //      break;
  //    case 2:
  //      flt = [];
  //      flt.push(`and rnameid=${t} and (account<>='N' or vtype='OPENING WTBAL') and (tdate<=${this._cs.Today_Date} or tno<0 or vtype='OPENING WTBAL')"`);
  //      bflt = flt; break;
  //    case 3:
  //      flt = [];
  //      flt.push(`and accmast.groupid=${t} and (tran1.account<>'N' or tran1.vtype=='OPENING WTBAL') and (tran1.tdate<=${td}  or tran1.tno<0 or tran1.vtype=='OPENING WTBAL')`);
  //      bflt = flt;

  //    default:
  //  }

  //  if (n == 3 || (n == 1 && m_voubal != 1)) {
  //    // flt.push(`and tran1.no12<>2`);
  //    flt.push(` and tran1.no12<>2`);
  //  }
  //  else {
  //    // flt.push(`and tran1.no12<>3 and tran1.daily<>8 and tran1.daily<>4`);
  //    flt.push(`and tran1.no12<>3 and tran1.daily<>8 and tran1.daily<>4`);
  //  }
  //  if (tn != 0) {
  //    if (l_hisab == 'CASH') {
  //      flt.push(`and (tran1.tno <>${tn == undefined ? 0 : tn} and tran1.tdate<=${this._cs.Today_Date}`);
  //    }
  //    else {
  //      flt.push(`and (tran1.tno!=${tn == undefined ? 0 : tn} and tran1.tdate<=${td})`);
  //    }
  //  }
  //  else {
  //    // flt = flt + " and (tran1.tno<" + allt(str(tn)) + " or tran1.tdate<'" + c_td + "' or tran1.vtype='OPENING WTBAL')"
  //    flt.push(`and (tran1.tno< ${tn == undefined ? 0 : tn} or tran1.tdate<${this._cs.Today_Date} or tran1.vtype='OPENING WTBAL')`);
  //  }

  //  if (l_siteid != 0) {
  //    flt.push(`and tran1.siteid="${l_siteid}`);
  //  }
  //  f_Flt = flt;
  //  if (this._pub_VAR.pub_mcurr == 1) {
  //    if (t = 71) {
  //      flt.push(`and tran1.mcurrid=${a_mcurrid}`);
  //      bflt.push(`and tran1.mcurrid=${a_mcurrid})`);
  //    }
  //    if (l_mcurrid > -1 && t != 71) {
  //      flt.push(`and tran1.mcurrid= ${l_mcurrid}`);
  //      bflt.push(`and tran1.mcurrid=${l_mcurrid}`);
  //    }
  //  }

  //  let flt_Data = flt.join(' ');
  //  let f_flt_Data = f_Flt.join(' ');
  //  if (l_type == 3) {
  //    let sql_cmd2 = `select tran1.refno,tran1.tdate,sum(tran1.amount) as amount,
  //                   sum(tran1.fine1) as fine1, sum(tran1.fine2) as fine2,
  //                   sum(tran1.othfine) as othfine from tran1 as tran1
  //                   left outer join accmast on accmast.acno=tran1.acno where =${flt_Data} `;

  //    this._dbQuery.query(sql_cmd).subscribe(res => {
  //      //alert(JSON);
  //      this.cur_tmp1 = res;
  //    });
  //    let sql_cmd3 = `select ifnull(tran1.refno,'')as refno,
  //                    ifnull(tran1.tdate)as tdate from tran1 as tran1
  //                    left outer join accmast on accmast.acno=tran1.acno
  //                     where  ${flt} group by tran1.trnid order by tran1.trnid`

  //    //sql_cmd3 = sql_cmd + " where " + flt + " group by tran1.trnid order by tran1.trnid"
  //    this._dbQuery.query(sql_cmd3).subscribe(res => {
  //      cur_tmp2 = res;
  //    });

  //  }

  //  else {
  //    let sql_cmd4 = "";

  //    switch (l_type) {
  //      case 5 || 6:
  //        if (this._pub_VAR.pub_bullion == 1 && t == 1) {
  //          let bflt_Data = bflt.join(' ');
  //          if (l_type == 6) {

  //            sql_cmd4 = `select ifnull(sum(0-amount),0) as amount,
  //                        ifnull(sum(0 - fine1),0) as fine1,
  //                        ifnull(sum(0 - fine2),0) as fine2,
  //                        ifnull(cashbank,'') from tran1
  //                        where ${bflt_Data} group by cashbank`;

  //          }
  //          else {
  //            sql_cmd4 = `select ifnull(sum(0-amount),0) as amount,
  //                      ifnull(sum(0-fine1),0) as fine1,
  //                      ifnull(sum(0-fine2),0) as fine2 from tran1
  //                      where ${bflt_Data}`;

  //          }
  //          //cur_tmpb=db
  //          //alert(JSON.stringify(sql_cmd));
  //          this._dbQuery.query(sql_cmd4).subscribe(res => {
  //            cur_tmpb = res["results"];
  //          });

  //        }
  //        let sqlcmd5 = "";
  //        f_flt_Data = f_Flt.join(' ');
  //        if (this._pub_VAR.pub_mcurr == 1) {
  //          sql_cmd = `select ifnull(sum(amount),0) as amount,
  //                      ifnull(sum(fine1),0) as fine1,
  //                      ifnull(sum(fine2),0) as fine2,
  //                      mcurrid from tran1 as tran1 where ${f_flt_Data}
  //                      group by mcurrid`;
  //        }
  //        else {
  //          if (l_type == 6) {
  //            sqlcmd5 = `select ifnull(sum(amount),0) as amount,
  //                       ifnull(sum(fine1),0) as fine1,
  //                       ifnull(sum(fine2),0) as fine2,
  //                        cashbank from tran1 as tran1
  //                        where ${f_flt_Data} group by cashbank`;
  //          }
  //          else {
  //            sqlcmd5 = `select ifnull(sum(amount),0) as amount,
  //                      ifnull(sum(fine1),0) as fine1,
  //                      ifnull(sum(fine2),0) as fine2 from tran1 as
  //                      tran1 where ${f_flt_Data}`;
  //          }

  //          this._dbQuery.query(sqlcmd5).subscribe(res => {
  //            this.cur_tmp1 = res["results"];
  //          });

  //        }

  //        break;
  //      default:
  //        let sqlcmd6 = "";
  //        if (this._pub_VAR.pub_bullion == 1 && t == 1) {
  //          var bflt_Data = bflt.join(' ');
  //          sqlcmd6 = `select ifnull(refno,'') as refno,ifnull(tdate,'0000-00-00 00:00:00') as tdate,
  //                    ifnull(sum(0-amount),0) as amount,
  //                    ifnull(sum(0-fine1),0) as fine1,
  //                    ifnull(sum(0-fine2),0) as fine2,
  //                    ifnull(sum(0-othfine),0) as othfine
  //                    from tran1 as tran1 where  ${bflt_Data} `;
  //          this._dbQuery.query(sqlcmd6).subscribe(res => {
  //            cur_tmpb = res
  //          });
  //        }
  //        // debugger;
  //        let sql_cmd7 = "";
  //        if (this._pub_VAR.pub_mcurr == 1) {
  //          sql_cmd7 = `select ifnull(refno,'')as refno,ifnull(max(tdate),'0000-00-00 00:00:00')as tdate,
  //                      ifnull(mcurrid,0),
  //                     ifnull(sum(amount),0) as amount,ifnull(sum(fine1),0) as fine1,
  //                     ifnull(sum(fine2),0) as fine2,ifnull(sum(othfine),0) as othfine,
  //                      ifnull(sum(grosswt1),0) as grosswt1,
  //                    ifnull(sum(grosswt2),0) as grosswt2,ifnull(sum(diawt),0) as diawt,
  //                    ifnull(sum(stnwt),0) as stnwt from tran1 as tran1 where ${f_Flt.join(' ')}  group by mcurrid`

  //        }
  //        else {

  //          sql_cmd7 = `select ifnull(refno,'')as refno,ifnull(max(tdate),'0000-00-00 00:00:00')as tdate,0 as mcurrid,
  //                     ifnull(sum(amount),0) as amount, ifnull(sum(fine1),0) as fine1,ifnull(sum(fine2),0) as fine2,
  //                     ifnull(sum(othfine),0) as othfine,
  //                      ifnull(sum(grosswt1),0) as grosswt1,ifnull(sum(grosswt2),0) as grosswt2,
  //                     ifnull(sum(diawt),0) as diawt,ifnull(sum(stnwt),0) as stnwt from tran1 as tran1 
  //                  where ${f_Flt.join(' ')}`

  //        }

  //        debugger;
  //        this.fetchQueryData(sql_cmd7);
  //        //this._dbQuery.query(sql_cmd7).subscribe(res => {
  //        //  this.cur_tmp1 = res;
  //        //  alert("Now the data in sql command 7");
  //        //  alert(JSON.stringify(this.cur_tmp1));
  //        //  this._localStorage.set_QueryData(res);


  //        //})




  //        sql_cmd7 = `SELECT ifnull(refno,''),ifnull(tdate,'0000-00-00 00:00:00')as tdate FROM tran1  WHERE ${f_Flt.join(' ')} ORDER BY tno desc limit 1`
  //        if (tmp_refno == null || tmp_refno == undefined) {
  //          this._dbQuery.query(sql_cmd7).subscribe(res => {

  //            ar_refno = res["results"];
  //          });
  //        }
  //    }
  //  }

  //  if (l_type == 4) {
  //    let sql_cmd8 = "";
  //    sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itran1 as it JOIN itemmast ON itemmast.ino=it.ino
  //              JOIN igroup ON igroup.igroupid=itemmast.igroupid JOIN tran1 ON tran1.vono=it.vono
  //              WHERE tran1.acno= ${t} AND (it.type=='S' OR it.type=='AS')`
  //    this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
  //      tmp_point = res["results"]
  //    })
  //    sql_cmd8 = "";
  //    sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itemtran as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
  //             JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`;
  //    this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
  //      tmp_point = parseFloat(tmp_point) + parseFloat(res["results"]);
  //    })
  //    sql_cmd8 = "";
  //    sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
  //               JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`

  //    this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
  //      tmp_point = parseFloat(tmp_point) - parseFloat(res["results"]);
  //    });
  //    sql_cmd8 = "";
  //    sql_cmd8 = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
  //                sql_cmd = sql_cmd + "JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND (it.type=='S' OR it.type=='AS')`
  //    this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
  //      tmp_point = parseFloat(tmp_point) + parseFloat(res["results"]);
  //    });
  //    sql_cmd8 = "";
  //    sql_cmd = `SELECT ifnull(SUM(it.tvalue*igroup.cpoint),0) as tpoint FROM itstd as it JOIN itemmast ON itemmast.ino=it.ino JOIN igroup ON igroup.igroupid=itemmast.igroupid
  //                JOIN tran1 ON tran1.vono=it.vono WHERE tran1.acno=${t} AND it.type='SR'`;
  //    this._dbQuery.execute_Scalar(sql_cmd8).subscribe(res => {
  //      tmp_point = parseFloat(tmp_point) - parseFloat(res["results"]);
  //    })





  //  }
  //  alert(JSON.stringify("Cur Tmp data"+this.cur_tmp1));
  //  // this.cur_tmp1 = this._localStorage.get_QueryData();

  //  // alert("Here is the Value of Cur Tmpe Values");
  //  // alert(JSON.stringify(this.cur_tmp1));

  //  tmp_point = 0;
  //  let tmp_amt = 0;
  //  let tmp_Amt2 = 0;
  //  let tmp_fine1 = 0.0; let tmp_fine2 = 0.0; let tmp_othfine = 0.0;
  //  let tmp_grosswt1 = 0.0; let tmp_grosswt2 = 0.0; let tmp_diawt = 0.0; let tmp_stnwt = 0.0;
  //  let tmp_cash = 0.0; let tmp_chq = 0.0;

  //  tmp_refno = '';
  //  let tmp_tdate = this._cs.Today_Date();

  //  debugger;



  //  if ((this._pub_VAR.pub_mcurr == 1 && l_type != 5) || l_type == 6) {
  //    if (l_type != 5 && l_type != 6) {

  //      tmp_fine1 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine1");
  //      tmp_fine2 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine2");
  //      tmp_othfine = this._cs.Calc_List_Sum(this.cur_tmp1, "othfine");

  //      // CALCULATE SUM(fine1), SUM(fine2), SUM(othfine) TO tmp_fine1, tmp_fine2, tmp_othfine
  //      if (l_type != 3) {
  //        tmp_grosswt1 = this._cs.Calc_List_Sum(Array(this.cur_tmp1), "grosswt1");
  //        tmp_grosswt2 = this._cs.Calc_List_Sum(Array(this.cur_tmp1), "grosswt2");
  //        tmp_diawt = this._cs.Calc_List_Sum(this.cur_tmp1, "diawt");
  //        tmp_stnwt = this._cs.Calc_List_Sum(this.cur_tmp1, "stnwt");
  //        //CALCULATE SUM(grosswt1), SUM(grosswt2), SUM(diawt), SUM(stnwt) TO tmp_grosswt1, tmp_grosswt2, tmp_diawt, tmp_stnwt
  //      }
  //      else {
  //        tmp_fine1 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine1");
  //        tmp_fine2 = this._cs.Calc_List_Sum(this.cur_tmp1, "fine2");

  //      }

  //    }

  //    if (l_type == 6) {

  //      //if Cash Bank !=2
  //      if (Array.isArray(this.cur_tmp1)) {
  //        //let sum = 0.0;
  //        Array(this.cur_tmp1).forEach(function (item, index) {
  //          if (item["cashbank"] != 2) {
  //            tmp_cash += item["amount"];
  //          }

  //        })
  //      }

  //      //if Cash Bank ==2
  //      if (Array.isArray(this.cur_tmp1)) {
  //        //let sum = 0.0;
  //        Array(this.cur_tmp1).forEach(function (item, index) {
  //          if (item["cashbank"] == 2) {
  //            tmp_chq += item["amount"];
  //          }

  //        })
  //      }
  //      tmp_amt = tmp_cash + tmp_chq;
  //    }
  //    else {
  //      if (m_mcurrid != 1) {
  //        tmp_amt = amount;
  //      }
  //      if (m_mcurrid == 1) {
  //        tmp_Amt2 = amount;
  //      }
  //    }
  //  }
  //  else {
  //    if (l_type != 3 && l_type != 5) {
  //      tmp_grosswt1 = this.cur_tmp1[0]["grosswt1"] == undefined ? 0 : this.cur_tmp1[0]["grosswt1"];
  //      tmp_grosswt2 = this.cur_tmp1[0]["grosswt2"] == undefined ? 0 : this.cur_tmp1[0]["grosswt2"];
  //      tmp_diawt = this.cur_tmp1[0]["diawt"] == undefined ? 0 : this.cur_tmp1[0]["diawt"];
  //      tmp_stnwt = this.cur_tmp1[0]["stnwt"] == undefined ? 0 : this.cur_tmp1[0]["stnwt"];
  //    }
  //    //alert(JSON.stringify(this.cur_tmp1));
  //    //console.log(this.cur_tmp1);
  //    tmp_amt = this.cur_tmp1[0]["amount"] == undefined ? 0 : this.cur_tmp1[0]["amount"];
  //    tmp_fine1 = this.cur_tmp1[0]["fine1"] == undefined ? 0 : this.cur_tmp1[0]["fine1"];
  //    tmp_fine2 = this.cur_tmp1[0]["fine2"] == undefined ? 0 : this.cur_tmp1[0]["fine2"];;
  //  }
  //  if (l_type != 5) {
  //    tmp_othfine = this.cur_tmp1[0]["othfine"] == undefined ? 0 : this.cur_tmp1[0]["othfine"];
  //    tmp_refno = this.cur_tmp1[0]["refno"] == undefined ? 0 : this.cur_tmp1[0]["refno"]; //refno==undefined?"":refno;
  //    tmp_tdate = this.cur_tmp1[0]["tdate"] == undefined ? 0 : this.cur_tmp1[0]["tdate"];
  //  }
  //  //alert("ref No in " + JSON.stringify(ar_refno));

  //  //assign data from ar_refno
  //  if (ar_refno != undefined) {
  //    try {
  //      tmp_refno = ar_refno["refno"];
  //      tmp_tdate = ar_refno["tdate"];
  //    } catch (e) {
  //      tmp_refno = "";
  //      tmp_tdate = this._cs.Today_Date;
  //    }
  //  }

  //  if (cur_tmpb != undefined) {
  //    if (tmp_tdate == undefined || tmp_tdate == null) {
  //      tmp_tdate = this._cs.Today_Date;
  //    }
  //    if (tmp_refno == undefined || tmp_refno == null) {
  //      tmp_refno = '';
  //    }
  //    amount = 0;
  //    fine1 = 0;
  //    fine2 = 0;

  //    if (l_type == 6) {
  //      let tmp_fine1b = this._cs.Calc_List_Sum(cur_tmpb, "fine1");
  //      let tmp_fine2b = this._cs.Calc_List_Sum(cur_tmpb, "fine1");
  //      let tmp_cash2 = this._cs.Calc_List_Sum(cur_tmpb, "amount");
  //      let tmp_chq2 = this._cs.Calc_List_Sum(cur_tmpb, "amount");
  //      tmp_cash = tmp_cash + tmp_cash2;
  //      tmp_chq = tmp_chq + tmp_chq2;
  //      tmp_amt = tmp_amt + tmp_cash2 + tmp_chq2;
  //      tmp_fine1 = tmp_fine1 + tmp_fine1b;
  //      tmp_fine2 = tmp_fine2 + tmp_fine2b;
  //    }
  //    else {
  //      tmp_amt = tmp_amt + amount;
  //      tmp_fine1 = tmp_fine1 + fine1;
  //      tmp_fine2 = tmp_fine2 + fine2;
  //      if (l_type != 5) {
  //        tmp_othfine = tmp_othfine + cur_tmpb[0]["othfine"];
  //      }
  //    }
  //  }





  //  let curchk: any;
  //  if (this._pub_VAR.pub_bullion == 1 && this._pub_VAR.pub_mcurr == 1 && t == 71) {
  //    if (n == 3 || (n == 1 && m_voubal != 1)) {
  //      sql_cmd = `SELECT type,ifnull(SUM(amount),0) as amount FROM bull1 WHERE vtype='IMPORT'
  //                AND tdate<='${this._cs.Today_Date}' AND no12!=2 GROUP BY 1`;
  //    }
  //    else {
  //      sql_cmd = `SELECT type,ifnull(SUM(amount),0) as amount FROM bull1 WHERE vtype='IMPORT' AND tdate<='${this._cs.Today_Date}' AND no12!=3 GROUP BY 1`

  //    }
  //    this._dbQuery.query(sql_cmd).subscribe(res => {
  //      curchk = res["results"];
  //    });
  //    amount = 0;
  //    if (curchk["type"] == "P") {
  //      tmp_amt = tmp_amt - curchk["amount"];
  //    }
  //    else {
  //      tmp_amt = tmp_amt + curchk.amount;
  //    }


  //  }

  //  alert("tmp_fine1" + tmp_fine1);
  //  alert("tmp_fine2" + tmp_fine2);
  //  alert("cal_amt"+tmp_amt);
  // // this.cal_fine1 = tmp_fine1;
  // // this.cal_fine2 = tmp_fine2;
  // // this.cal_amt = tmp_amt;


  //}


  //public async fetchQueryData(query:any) {
  //  const data = await this._dbQuery.query(query).toPromise();
  //  this.cur_tmp1 = data;
  //  alert(JSON.stringify(this.cur_tmp1));
  //}



  

  

}
