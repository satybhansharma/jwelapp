import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { GLOBALVAR } from '../../modules/sale/global-var';
import { CommonService } from '../services/common.service';
import { LocalStorageService } from '../services/local-storage.service';
import { AlertService, AlertType } from '../_alert';
import * as moment from 'moment';
import { DatabaseQueryService } from '../services/database-query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login_Record: any;
  router: Router;
  isLoad = false;
  //_pub_VAR: IglobalVAR;
  _pub_VAR: GLOBALVAR;

  kuser: any;
  kpass: any;
  protect: any;
  m_log: any;
  m_mlogin: any;
  m_swid: any;
  apswd: any;
  r: any;

  
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    
  };
  constructor(
    private fb: FormBuilder,
    private cs: CommonService,
    public alertService: AlertService,
    private _localStorage: LocalStorageService,
    private db_query: DatabaseQueryService,
    ) { }

  ngOnInit(): void {
    this._pub_VAR = new GLOBALVAR();
    this.formInit();
    
    
    this.cs.getCfgTmpRecords().subscribe(res => {
      //Set cfgtmp Record on Local Storage 
      this._localStorage.set_cfgtmp_LocalStorage(res);
      //alert(JSON.stringify(this._localStorage.get_cfgtmp_LocalStorage()));
    })
    this.cs.getVersionTmpRecords().subscribe(res => {
      this._localStorage.set_vertmp_LocalStorage(res);
      //alert(JSON.stringify(this._localStorage.get_vertmp_LocalStorage()));
    })

  }
  formInit() {
    this.form = this.fb.group({
      userName: ['',Validators.required],
      pwd: ['',Validators.required]
    });
  }

  formSubmit() {
    this._localStorage.remove_Global_VAR();
    let _loginFormRecord: any;
    
     if (this.form.invalid) {
      this.alertService.warn("Fill the Correct Value in User Name and Password", this.alertOptions);
      return;
    }
    this.kuser = this._localStorage.getPara('kuser')[0]["vrval"];
    this.kpass = this._localStorage.getPara('kpass')[0]["vrval"];

    

    if (this.form.get('userName').value != this.kuser && this.form.get('userName').value.substring(0, 10) != "JWELLY@ERP") {
      this.protect = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["protect"];
      this.m_log = 0;
      this.m_mlogin = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["mlogin"];
      this.m_swid = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["swid"];
      if (this.m_mlogin <= 0) {
        this.m_mlogin = 1;
      }
      //Now Call API to Check Record
      this.cs.login(this.form.getRawValue()).subscribe(res => {
        alert("Im in Login Processs");
        //let query5 = "select max(tdate) as tdate from tran1 where pdc=0 AND TNO<>-1";
        //this.db_query.execute_Scalar(query5).subscribe(res => {
        //  alert(res);
        //})
        //  alert(JSON.stringify(res["_record"]));
        if (res["_record"] != null) {
        //  alert("Now the Res Records "+JSON.stringify(res["_record"]));
          let record = res["_record"];
          _loginFormRecord = res["_record"];
          // alert(record["pass"]);
          this.apswd = record["pass"];
          //alert(this.apswd);
          // alert("Data"+res["level"]);
          this._pub_VAR.pub_level = record["level"];
          
         
          this._pub_VAR.pub_login = record["login1"];
          this._pub_VAR.pub_loginid = record["loginid"];
          this._pub_VAR.pub_lnkloginid = record["lnkloginid"];
          this._pub_VAR.pub_rsite = record["siteid"];
          this._pub_VAR.pub_raccount = record["account"];
          this._pub_VAR.pub_frdays = record["freeze"];
          this._pub_VAR.pub_high = record["hi"];
          this._pub_VAR.pub_med = record["med"];
          this._pub_VAR.pub_low = record["low"];
          this._pub_VAR.pub_bothenv = record["bothenv"];
          this._pub_VAR.pub_jobpre = record["jobpre"];
         // alert("Pub Level Value" + this._pub_VAR.pub_level);
         // this._localStorage.set_Global_VAR(this._pub_VAR);
         // alert("Pub Level Value"+JSON.stringify(this._localStorage.get_Global_VAR()["pub_level"]));
          if (this._pub_VAR.pub_lnkloginid == 0) {
            this._pub_VAR.pub_almodou = record["almodou"];
            this._pub_VAR.pub_chglogin = record["chglogin"];
            this._pub_VAR.pub_hidecost = record["hidecost"];
            this._pub_VAR.pub_allow = record["allow"];
            this._pub_VAR.pub_altaudit = record["altaudit"];
            this._pub_VAR.pub_altopbal = record["altopbal"];
            this._pub_VAR.pub_resexport = record["resexport"];
            this._pub_VAR.pub_aldrep = record["aldrep"];
            this._pub_VAR.pub_dispbal = record["dispbal"];
            this._pub_VAR.pub_shhisab = record["shhisab"];
            this._pub_VAR.pub_photo = record["photo"];
            this._pub_VAR.pub_bill = record["resabill"];
            this._pub_VAR.pub_mobapp = record["mobapp"];
            this._pub_VAR.pub_reslogin = record["reslogin"];
          }
          else {
            this._pub_VAR.pub_loginid = this._pub_VAR.pub_lnkloginid;
            this._pub_VAR.pub_almodou = record["almodou"];
            this._pub_VAR.pub_chglogin = record["chglogin"];
            this._pub_VAR.pub_hidecost = record["hidecost"];
            this._pub_VAR.pub_allow = record["allow"];
            this._pub_VAR.pub_altaudit = record["altaudit"];
            this._pub_VAR.pub_altopbal = record["altopbal"];
            this._pub_VAR.pub_resexport = record["resexport"];
            this._pub_VAR.pub_aldrep = record["aldrep"];
            this._pub_VAR.pub_dispbal = record["dispbal"];
            this._pub_VAR.pub_shhisab = record["shhisab"];
            this._pub_VAR.pub_photo = record["photo"];
            this._pub_VAR.pub_bill = record["resabill"];
            this._pub_VAR.pub_mobapp = record["mobapp"];
            this._pub_VAR.pub_reslogin = record["reslogin"];
          }

          this._localStorage.set_Global_VAR(this._pub_VAR);
        }


        else {
          this.apswd = ''
          this._pub_VAR.pub_level = 1
          this._pub_VAR.pub_rsite = 0
          this._pub_VAR.pub_lnkloginid = 0
          this._pub_VAR.pub_login = ' '
          this._pub_VAR.pub_loginid = 0
          this._pub_VAR.pub_raccount = 1
          this._pub_VAR.pub_frdays = 0
          this._pub_VAR.pub_high = 0
          this._pub_VAR.pub_med = 0
          this._pub_VAR.pub_low = 0
          this._pub_VAR.pub_bothenv = 0
          this._pub_VAR.pub_almodou = 0
          this._pub_VAR.pub_chglogin = 0
          this._pub_VAR.pub_hidecost = 0
          this._pub_VAR.pub_allow = 0
          this._pub_VAR.pub_altaudit = 0
          this._pub_VAR.pub_altopbal = 0
          this._pub_VAR.pub_resexport = 0
          this._pub_VAR.pub_aldrep = 0
          this._pub_VAR.pub_dispbal = 0
          this._pub_VAR.pub_shhisab = 0
          this._pub_VAR.pub_photo = 0
          this._pub_VAR.pub_bill = 0
          this._pub_VAR.pub_mobapp = ' '
          this._pub_VAR.pub_reslogin = ' '
          this._pub_VAR.pub_jobpre = ' '
        }

        if (this.form.get('pwd').value == this.apswd) {
         // this.getQuery5Data();
          alert("Password is Correct");
          //location.href = "/MMIJewel/default";
          this.fi_Process();
          location.href = "/";
          
        
        }
        else {
          this.alertService.warn("Password is Incorrect", this.alertOptions);
          this.form.patchValue({
            pwd: ''
          });
        }
      })


    }
    else {
      if (this.form.get('userName').value.substring(0, 10) == "JWELLY@ERP") {
        this.kpass = "ERP@JWELLY";
      }
      if (this.kpass != '' && this.kpass == this.form.get('pwd').value) {

      }
    }

    
   // this.fi_Process();

  }

  
  

  fi_Process() {
    
   // alert("Fi Process");
    //let newRecord: GLOBALVAR;
    //alert( JSON.stringify(newRecord));

    alert(JSON.stringify(this._pub_VAR));
    var prop = Object.keys(this._pub_VAR).length;
    alert("Object length"+"-"+ prop);
    //ask this variable
    let l_ctr = 0;
    let maxdate: any;
    let minstkcash: any;
    let mincash: any;
    let showrem: any;
    let l_firstlogin: any;
    let max_tdate: Date;
    let c_deal: any;
    let c_no12girvi: any;
    let softpath: any;
    let dresult: any;
    let m_datarun: any;
    let clmch: any;
    let flg: any;
    let l_mchid: any;
    let t_recc: any = 0;
    let c_chkdate: any;
    let c_voudate: any;
    let c_maxdate: any;
    let c_taging: any;
    let gtmp: any;
    let c_girvi: any;
    let ktmp: any;
    let c_kitty: any;
    let bulltmp: any;
    let c_bullion: any;

    let _pub_VAR: GLOBALVAR;
    let todayDate: moment.Moment = moment(new Date());
    let tdyFormat_Date = todayDate.format('DD-MM-YYYY');
    _pub_VAR = this._localStorage.get_Global_VAR();
    
    alert("Pub Level Value"+_pub_VAR.pub_level);
    let cfg_Date = this._localStorage.getPara('chkdate')[0]["vrval"];

    if (todayDate != cfg_Date) {
      l_ctr = 1;
    }
    else {
      l_ctr = 2;
    }
    _pub_VAR.pub_amrdate = this._localStorage.getPara("amrdate")[0]["vrval"];
    _pub_VAR.pub_resfdate = this._localStorage.getPara("resfdate")[0]["vrval"];
    _pub_VAR.pub_fdate1 = this._localStorage.getPara("fdate1")[0]["vrval"];
    _pub_VAR.pub_fdate2 = this._localStorage.getPara("fdate2")[0]["vrval"];
    _pub_VAR.pub_restdate = this._localStorage.getPara("restdate")[0]["vrval"];
    _pub_VAR.pub_deal = this._localStorage.getPara("deal")[0]["vrval"];
    _pub_VAR.pub_site = this._localStorage.getPara("sites")[0]["vrval"];
    _pub_VAR.pub_no12type = this._localStorage.getPara("no12type")[0]["vrval"];
    _pub_VAR.pub_stdate = this._localStorage.getPara("stdate")[0]["vrval"];
    _pub_VAR.pub_bullion = this._localStorage.getPara("bullion")[0]["vrval"];
    maxdate = this._localStorage.getPara("maxdate")[0]["vrval"];
    minstkcash = this._localStorage.getPara("minstkcash")[0]["vrval"];
    mincash = this._localStorage.getPara("mincash")[0]["vrval"];
    showrem = this._localStorage.getPara("showrem")[0]["vrval"];
    _pub_VAR.pub_autobkp = this._localStorage.getPara("autobkp")[0]["vrval"];
    _pub_VAR.pub_mcurr = this._localStorage.getPara("mcurr")[0]["vrval"];
    _pub_VAR.pub_ctype = this._localStorage.getPara("ctype")[0]["vrval"];
    _pub_VAR.pub_fstatus = this._localStorage.getPara("fstatus")[0]["vrval"];
    _pub_VAR.pub_foxypre = this._localStorage.getPara("foxypre")[0]["vrval"];
    _pub_VAR.pub_bulljew = this._localStorage.getPara("bulljew")[0]["vrval"];
    _pub_VAR.pub_pnamebooks = this._localStorage.getPara("pnamebooks")[0]["vrval"];
    let query1 = "update cfgtmp set vrval='0' where vrcap='bkpok'";

  //  alert("Here the Value of CType is"+_pub_VAR.pub_ctype);
    this.db_query.execute(query1).subscribe(res => {
      //console.log(res["results"]);
      
    });


    if (l_firstlogin == 1) {
      let query2 = "update cfgtmp set vrval='" + _pub_VAR.pub_fdate1 + "' where vrcap='efdate1'";
      this.db_query.execute(query2).subscribe(res => {
       // console.log(res["results"]);
      });


      let query3 = "update cfgtmp set vrval='" + _pub_VAR.pub_fdate2 + "' where vrcap='efdate2'";
      this.db_query.execute(query3).subscribe(res => {
       // console.log(res["results"]);
      });
      _pub_VAR.pub_efdate1 = _pub_VAR.pub_fdate1;
      _pub_VAR.pub_efdate2 = _pub_VAR.pub_fdate2;
    }
    else {
      _pub_VAR.pub_efdate1 = this._localStorage.getPara("efdate1")[0]["vrval"];
      _pub_VAR.pub_efdate2 = this._localStorage.getPara("efdate2")[0]["vrval"];

    }

    if (_pub_VAR.pub_ctype == 4) {
      var query4 = "select count(*) from site where sfeeding = 2";
      this.db_query.execute_Scalar(query4).subscribe(res => {
        if (parseInt(res["results"] )> 0) {
          _pub_VAR.pub_fstatus = 1;
        }
      })
    }

    try {
      let query5 = "select max(tdate) as tdate from tran1 where pdc=0 AND TNO<>-1";
      this.db_query.execute_Scalar(query5).subscribe(res => {
        if (res["results"] != null || res != null) {
          max_tdate = res["results"];
        }
        else {
         
          let todayDate: moment.Moment = moment(new Date());
          let tdyFormat_Date = todayDate.format('DD-MM-YYYY');
          max_tdate =new Date(tdyFormat_Date);
        }
      })

    } catch (e) {
      console.log(e);
    }

    _pub_VAR.pub_trmaxdate = max_tdate;

    try {
      if (new Date(maxdate) > new Date(max_tdate)) {
        max_tdate = maxdate;
      }
      if (new Date() > new Date(maxdate)) {
        max_tdate = new Date();
      }
      if (parseInt(this._localStorage.getPara("resconf")[0]["vrval"]) > 0) {
          this._pub_VAR.pub_tdayend = this._localStorage.getPara("tdayend")[0]["vrval"] === "" ? 0 : this._localStorage.getPara("tdayend")[0]["vrval"];
        if (parseInt(this._pub_VAR.pub_tdayend) == 0)
            {
            this._pub_VAR.pub_tdayend = max_tdate;
           }
      }
     
    } catch (e) {

    }
  
    try {
      _pub_VAR.pub_sms = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["smstmp"];

      if (_pub_VAR.pub_sms == 0) {
        _pub_VAR.pub_sms = 2;
      }

    } catch (e) {

    }
    let vtmp: any;
    try {
      _pub_VAR.pub_mcx = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["mcx"];
     // debugger;
       vtmp = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["vtmp"] === "" ? 0 : this._localStorage.get_vertmp_LocalStorage()["decryptData"]["vtmp"];

      if (parseInt(vtmp) < 4 || (vtmp >= 10 && vtmp <= 12) || vtmp == 19) {
        _pub_VAR.pub_wr = 'W';
      }
      else {
        _pub_VAR.pub_wr = 'R';
      }
      _pub_VAR.pub_vtmp = vtmp;

    } catch (e) {

    }
    

    if (_pub_VAR.pub_vtmp == 16 || _pub_VAR.pub_vtmp == 18) {
      _pub_VAR.pub_bullion = 1;
    }
    let vtmpValue = [16,10,11, 12, 17, 19, 20, 21, 23, 26, 27, 28, 29,30];
    if (vtmp <= 6 || vtmpValue.indexOf(vtmp) != -1) {
      _pub_VAR.pub_no12 = 2;
      _pub_VAR.pub_env = 2;
    }
    else {
      let vtmpValues = [9, 13, 19, 14, 24, 31, 32, 33];
      if (vtmpValues.indexOf(vtmp) != -1 || _pub_VAR.pub_vtmp == 22) {
        _pub_VAR.pub_no12 = 1;
        if (_pub_VAR.pub_no12type == 3) {
          _pub_VAR.pub_env = 1;
        }
        else {
          _pub_VAR.pub_env = 3;
        }
      }
      else {
       _pub_VAR.pub_no12 = 3
       _pub_VAR.pub_env = 3
      }

    }

    try {

      let crcode = this._localStorage.get_vertmp_LocalStorage()["decryptData"]["crcode"] === "" ? 0 : this._localStorage.get_vertmp_LocalStorage()["decryptData"]["crcode"];
      if (parseInt(crcode) == -1) {
        _pub_VAR.pub_ctype = 6
        _pub_VAR.pub_vtmp = 7
        _pub_VAR.pub_no12 = 3
        _pub_VAR.pub_env = 3
      }
      if (_pub_VAR.pub_no12 != 2 && _pub_VAR.pub_vtmp != 31) {
        _pub_VAR.pub_restdate = 1;
      }

    } catch (e) {

    }

   

    let vtmpValues = [9,13,31,32,33,22,14];
    if (_pub_VAR.pub_med == 1 && (parseInt(_pub_VAR.pub_high) + parseInt(_pub_VAR.pub_low)) == 0
      && _pub_VAR.pub_loginid != 0 && (vtmpValues.indexOf(vtmp) != -1)) {
      _pub_VAR.pub_env = 2;
    }
    let vtmpValues1 = [9,13,31,32,33,22,14];
    if ((_pub_VAR.pub_med + _pub_VAR.pub_low) == 0
      && _pub_VAR.pub_high == 1 &&
      _pub_VAR.pub_login != 0 &&
      (vtmpValues1.indexOf(vtmp) != -1)) {
      _pub_VAR.pub_env = 3;
    }

    let vtmpValues2 = [9,13,31,32,33,22,14];
    if ((_pub_VAR.pub_med + _pub_VAR.pub_low + _pub_VAR.pub_high) == 3
      || (_pub_VAR.pub_med + _pub_VAR.pub_high) == 2 ||
      _pub_VAR.pub_loginid != 0 ||
      vtmpValues2.indexOf(vtmp) != -1) {
      if (_pub_VAR.pub_bothenv == 1) {
        _pub_VAR.pub_env = 3;
      }
      else {
        _pub_VAR.pub_env = 1;
      }
    }

    if (_pub_VAR.pub_ctype == 6 || _pub_VAR.pub_ctype == 3) {
      _pub_VAR.pub_env = 3;
    }
    debugger;
    this._localStorage.remove_Global_VAR();
    this._localStorage.set_Global_VAR(_pub_VAR);
    alert(JSON.stringify(_pub_VAR));
    let vtmpValues3 = [10, 11, 12, 13, 19, 26, 27, 31, 32];
    if (vtmpValues3.indexOf(vtmp)) {
      _pub_VAR.pub_manu = 1;
    }
    else {
      _pub_VAR.pub_manu = 0;
    }
    //debugger;
    let vtmpValues4 = [10, 11, 23, 24, 25, 26, 27, 29, 30, 31, 32];
    if (vtmpValues4.indexOf(vtmp) != -1) {
      c_deal = _pub_VAR.pub_deal;
      if (vtmp == 23 || vtmp == 24 || vtmp == 25) {
        c_deal = 4;
      }
      if (vtmp == 10 || vtmp == 26 || vtmp == 31) {
        //ask this line
        if (this._localStorage.getPara('deal')[0]["vrval"] || this._localStorage.getPara('deal')[0]["vrval"]) {
          c_deal = 2;
        }
        else {
          c_deal = 1;
        }
        this._pub_VAR.pub_deal = c_deal;
      }
      if (vtmp == 15) {
        c_no12girvi = 3;
      }
    }

    if (this._pub_VAR.pub_deal == 4) {
      this._pub_VAR.pub_grdrep = "grdrpo";
    }
    else {
      this._pub_VAR.pub_grdrep = "grdrep"
    }
    if (softpath != '' && this._pub_VAR.pub_level != -2) {
      softpath = softpath;
    }
    if (softpath != '' && this._pub_VAR.pub_level != -2) {
      softpath = softpath;
    }
    else {
      let message = "File Path Not Found";
      this._pub_VAR.pub_shdn = 1;
    }
   

    if (this._pub_VAR.pub_sqlver == 1 && dresult != -2) {
      m_datarun = new Date().toString();
      let query = "update cfgtmp set vrval=ENCODE('" + m_datarun + "','MCHID') where vrcap='datarun'";
      this.db_query.execute(query).subscribe(res => {
        if (parseInt(res["results"]) > 0) {
          
        }
      });
    }

    if (dresult != 1 && t_recc>100) {
      if (this.m_swid != '' || this.m_swid.length < 5 || this.m_swid.substr(0, 2) != "JE") {
        this._pub_VAR.pub_amcdue = 2;
      }
      else {
        this._pub_VAR.pub_amcdue = 3;
      }
    }

    if (dresult != -1) {
      if (this._pub_VAR.pub_sqlver < 1) {
        //Here is the Data from Connection string 
        this._pub_VAR.pub_sql = "";
      }
      else {
        let query = "select count(acno) as cntr from tran1";
        this.db_query.execute_Scalar(query).subscribe(res => {
          if (res["results"] > 0) {
            t_recc = res["results"];
          }
        });
      }
    }




    if (dresult != 1) {
      let query = "select count(ino) as cntr from design";
      this.db_query.execute_Scalar(query).subscribe(res => {
        if (res["result"] > 0) {
          t_recc = res["result"];
        }
      })

    }


    if (dresult != 1 && t_recc > 100) {
      if (this.m_swid != '' || this.m_swid.length < 5 || this.m_swid.substr(0, 2) != 'JE') {
        this._pub_VAR.pub_amcdue = 2;
      }
      else {
        this._pub_VAR.pub_amcdue = 3;
      }

    }

    t_recc = 0;
    if (dresult != 1) {
      let query = "select count(acno) as cntr from tran1";
      this.db_query.execute_Scalar(query).subscribe(res => {
        t_recc=res["results"]
      })
      
    }

    if (dresult != 1 && t_recc > 500) {
      if (this.m_swid == '' || this.m_swid.length < 5 || this.m_swid.substr(0, 2) != 'JE') {
        this._pub_VAR.pub_amcdue = 2;
      }
      else {
        this._pub_VAR.pub_amcdue = 3;
      }
    }

    t_recc = 0
    if (dresult != 1) {
      let query = "select count(ino) as cntr from itran1";
      this.db_query.execute_Scalar(query).subscribe(res => {
        t_recc=res["results"]
      })
    }




    if (dresult != 1 && t_recc > 500) {
      if (this.m_swid == '' || this.m_swid.length < 5 || this.m_swid.substr(0, 2) != 'JE') {
        this._pub_VAR.pub_amcdue = 2;
      }
      else {
        this._pub_VAR.pub_amcdue = 3;
      }
    }

    t_recc = 0
   if (dresult != 1) {
      let query = "select count(ino) as cntr from tgm1";
      this.db_query.execute_Scalar(query).subscribe(res => {
        t_recc=res["results"]
      });
    }

    t_recc = 0
    if (dresult != 1) {
      let query = "select count(rnameid) as cntr from gissue1";
      this.db_query.execute_Scalar(res => {
        t_recc=res["results"]
      })
    }

    if (dresult != 1 && t_recc > 250) {
      if (this.m_swid == '' || this.m_swid.length < 5 || this.m_swid.substr(0, 2) != 'JE') {
        this._pub_VAR.pub_amcdue = 2;
      }
      else {
        this._pub_VAR.pub_amcdue = 3;
      }
    }
    c_chkdate = new Date();
    c_voudate = new Date();
    if (new Date(this._localStorage.getPara('maxdate')[0]["vrval"]) < new Date()) {
      c_maxdate = new Date();
    }

    vtmpValues = [1,4,7,10,11,14,15,16,19,21,22,23,24,25,28,29];
    if (vtmpValue.indexOf(vtmp) != -1) {
      c_taging = 2
    }

    if (vtmp == 14 || vtmp == 15 || gtmp == 1 || vtmp == 21) {
      c_girvi = 1
    }
    else {
      c_girvi = 2;
    }
    if (ktmp == 2) {
      c_kitty = 2;
    }

    if (bulltmp != 1 && this._pub_VAR.pub_vtmp != 16 && this._pub_VAR.pub_vtmp != 18) {
      c_bullion = 2;
    }
    let jobir: any;
    let c_jobno: any;
    let c_sites: any;
    let c_onapproval: any;
    let rapa: any;
    let c_raparate: any;
    let dassort: any;
    let c_diaassort: any;
    let branchtmp: any;
    let c_branch: any;
    let mp: any;
    let c_memid: any;
    let insu: any;
    let c_olock: any;
    let rfid: any;
    if (jobir != 1 && this._pub_VAR.pub_vtmp != 16 && this._pub_VAR.pub_vtmp != 18) {
      c_jobno = 2;
    }
    if (vtmp == 5 && vtmp == 2) {
      c_sites = 2;
      c_onapproval = 2;
    }
    if (rapa != 1) {
      c_raparate = 2;
    }

    if (dassort != 1) {
      c_diaassort = 2;
    }
    if (branchtmp) {
      c_branch = 2;
    }
    if (mp != 1) {
      c_memid = 2;
    }
    if (insu != 1) {
      c_olock = 0;
    }

    this._pub_VAR.pub_rfid = rfid;
    this._pub_VAR.pub_kitty = this._localStorage.getPara('kitty')[0]["vrval"];
    let mcur: any;
    let c_mcurr: any;
    if (mcur != 1) {
      c_mcurr = 2;
      this._pub_VAR.pub_mcurr = c_mcurr;
    }

    if (this._pub_VAR.pub_restdate == 1 && new Date() > new Date(this._pub_VAR.pub_fdate2)) {
      this._pub_VAR.pub_voudate = this._pub_VAR.pub_fdate2;
    }
    else {
      let todayDate: moment.Moment = moment(new Date());
      let tdyFormat_Date = todayDate.format('DD-MM-YYYY');
      this._pub_VAR.pub_voudate = tdyFormat_Date;

    }
    let userlog = this._localStorage.getPara("userlog")[0]["vrval"];

   

    let askdrates = this._localStorage.getPara("askdrates")[0]["vrval"];
    let l_loginid: any;
    if (askdrates == 1 || (askdrates == 3 && (this._pub_VAR.pub_level == 1 || this._pub_VAR.pub_level == 2))) {
      if (this._pub_VAR.pub_loginid != 0) {
        let l_loginid = this._pub_VAR.pub_lnkloginid;
      }
      else {
        l_loginid = this._pub_VAR.pub_lnkloginid;
      }

     

      let query = "select rate from bhav where tdate=" + new Date().toString();
      this.db_query.query(query).subscribe(res => {
        res[0]["rate"];
        if (res[0]["rate"] != undefined) {
          let query = "select mnuid from lmenu where ((mno=3 and smno1=0) or (mno=3 and smno1=9)) and loginid=" + l_loginid;
         
          this.db_query.query(query).subscribe(res => {
            if (res[0]["mnuid"] != undefined) {
              //Do Form Bhav
            }
          })

        }
      })
    }
    //let l_firstlogin: any;
   
    if (this._pub_VAR.pub_ctype == 4) {
      let query = "select siteid from site where sfeeding=2";
      this.db_query.query(query).subscribe(res => {
        if (res[0]["siteid"] != undefined) {
          this._pub_VAR.pub_rsite = res[0]["siteid"];
        }
      })
    }
    if (minstkcash == 1) {
      let cash_bal = 0;
    
      let query = "select sum(amount) as amount from tran1 where acno=1 and account#'N' and no12#2";
      this.db_query.execute_Scalar(query).subscribe(res => {
        if (res["results"] != undefined) {
          cash_bal=res["results"]
        }
      });

      //get all the GLOBAL Variable and Update here in Local Storage
      this._localStorage.remove_Global_VAR();
      this._pub_VAR.pub_fdate2 = "No Date is found";
      this._localStorage.set_Global_VAR(this._pub_VAR);

     // alert("Now the PUB Level"+this._localStorage.get_Global_VAR()[""]);

      alert(JSON.stringify(this._pub_VAR));
      var prop = Object.keys(this._pub_VAR).length;
      alert("Now at Last Object length" + "-" + prop);
    }






   


  }


}
