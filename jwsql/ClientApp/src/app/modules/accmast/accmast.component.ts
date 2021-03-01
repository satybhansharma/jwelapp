import { Component, OnInit,Input,Output,EventEmitter, HostListener } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {AccmastService} from './accmast.service';``
import { startWith } from 'rxjs/operators';
import { map, numberFormat, color, Color } from 'highcharts';
import { BooleanLiteral, forEachChild } from 'typescript';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { stringify } from '@angular/compiler/src/util';
import { TooltipPosition } from '@angular/material/tooltip';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { KEY_CODE } from '../../shared/services/KeyBoardCode';


@Component({
  selector: 'app-accmast',
  templateUrl: './accmast.component.html',
  styleUrls: ['./accmast.component.css']
})
export class AccmastComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendacmast:string;
  @Output() event=new EventEmitter<any>();
  recievegroup(data:any){  
    if(data==""){
      //this.tstate='';
    }
    else{    
      this.acgrplist.push({
        id: data["groupid"],
        name:data["gname"],
      });
      this.acform.patchValue({  
        groupid:data["groupid"],    
        gname:data["gname"],
        
      });   
      //this.tstate=data["state1"];
      this.tgroup=data["gname"];
    }
    
    
    this.ischildshow=!this.ischildshow;
  }
  recieveloc(data:any){  
    if(data==""){    
    }
    else{        
      this.loclist.push({
        id: data["locationid"],
        name:data["location1"],
      });
      this.acform.patchValue({  
        locationid:data["locationid"],    
        location1:data["location1"],
        
      });   
      this.tlocation=data["location1"];
    }  
    this.ischildshow=false; 
  }
  recievecity(data:any){  
    if(data==""){
      
    }
    else{    
     // alert(2);
      this.citylist.push({
        id: data["cityid"],
        name:data["city1"],
      });
      this.acform.patchValue({  
        cityid:data["cityid"],    
        city:data["city1"],
        
      });   
      this.tcity=data["city1"];
    } 
    
    this.ischildshow=false;
  }
  acform:FormGroup;
  spousedetail:any = [];
  ischildshow=false;
  islocshow=false;
  isparentshow=false;
  isgroupshow=false;
  iscityshow=false;
  isdel=false;
  isaddress=false;
  isopbal=false;
  isdivShow=true;
  isShow=false;
  isjobshow=false;
  isdepartshow=false;
  iskittyshow=false;
  isgirvishow=false;
  isnew=true;
  ispopup=false;
  comboval='';
  searchText='';
  keyword1 = 'name';
  keyword2 = 'name';
  keyword3 = 'name';
  keyword4 = 'name';
  keyword5 = 'name';
  tcity='';
  tlocation='';
  tgroup='';
  count: number = 1;
  //sendgrp='';
  activeindex=-1;
  title = "Account Master";
  records:any [];
  filterrec:any [];
  retData:any [];
  acgrplist=[];
  loclist=[];
  citylist=[];
  mcurrlist=[];
  serieslist=[];
  isaddshow=false;
  iscreditshow=false;
  istaxshow=false;
  isbankshow=false;

  constructor(private myService: AccmastService,    
    private fb: FormBuilder) { }
    // @HostListener('window:keyup', ['$event'])
    // keyEvent(event: KeyboardEvent) {
    //   console.log(event);
  
    //   if (event.keyCode ===KEY_CODE.ESCAPE) {
    //     this.close();
    //   }
  
     
      
    // }
    // @HostListener('document:keydown.control.z') undo(event: KeyboardEvent) {
    //   alert("You Press the Control Z ");
    // }
  
  ngOnInit(): void {    
    if(this.sdivs ==true)
    {
      //alert(3);
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
      this.acform.patchValue({
        cname:this.sendacmast
      });
    }     
   else
   {
     //alert(4);
    this.spousedetail.push({
      name:'',
      relation:'',mob:'',dob:'0000-00-00',asary:'0000-00-00'
    });
    this.LoadRecords();
    this.loadAcgrpList();
    this.loadcityList();
    this.loadLocationList();
    this.loadmcurrList();
    this.loadseriesList();
    
    this.acform=this.fb.group({
      acno: [0],
    prefix: ['',Validators.required],
    cname: [''],
    gname:[''],
    groupid: [0],
    pname: [''],
    add1: [''],
    add2: [''],
    add3: [''],
    city: [''],
    location: [''],
    phone: [''],
    mobile: [''],
    dob: ['0000-00-00'],
    asary: ['0000-00-00'],
    stno: [''],
    pan: [''],
    percent: [0],
    crfine1: [0],
    crfine2: [0],
    cramt: [0],
    del: ['N'],
    active: [''],
    crdays: [0],
    igroupid: [0],
    email:[''],
    pin: [''],
    stopdate: ['0000-00-00'],
    shortname: [''],
    kprefix: [''],
    kmno: [''],
    kvmno: [0],
    salary: [0],
    pf: [''],
    pfacno:[''] ,
    esi: [''],
    esiacno: [''],
    no12: [0],
    photo: [''],
    quarter1: [''],
    quarter2: [''],
    quarter3: [''],
    quarter4: [''],
    tdsbill: [0],
    wtbal: [0],
    lbron: [0],
    country: [''],
    dep: [0],
    nature: [''],
    bankacno: [''],
    leave: ['0000-00-00'],
    joindate: ['0000-00-00'],
    dept: [''],
    sale: [0],
    purchase: [0],
    ord: [0],
    repair: [0],
    kitty: [0],
    advance: [0],
    issue: [0],
    receive: [0],
    taging: [0],
    jobid: [0],
    dless: [0],
    sless: [0],
    tran: [''],
    krefby: [''],
    ksman: [''],
    kremarks:[''] ,
    kinsamt: [0],
    kmonths: [0],
    kinsrec: [0],
    ksdate: ['0000-00-00'],
    kedate: ['0000-00-00'],
    refgroup: [''],
    stampid: [0],
    paydate: ['0000-00-00'],
    bankchg: [0],
    brpath: [''],
    acno12: [0],
    refby: [''],
    kpmonth: [0],
    scode: [''],
    krefmno: [''],
    bankbadla: [0],
    bankex: [0],
    metal: [''],
    loginid: [0],
    dtime: ['0000-00-00'],
    ballow: [0],
    vtds: [0],
    pvou: [''],
    intr: [0],
    comint: [0],
    comintdef: [0],
    grtran: [0],
    mint: [0],
    holiday: 0,
    dir: [''],
    khome: [0],
    acnarr: [''],
    doc: [''],
    bktrc: [0],
    orgacno: [0],
    compath: [''],
    compno: [''],
    vcom: [0],
    siteid: [0],
    mcurrid: [0],
    mcxcomex: [0],
    rscomm: [0],
    remarks: [''],
    agentacno: [0],
    hpname: [''],
    odlimit: [0],
    dep2: [0],
    occupation: [''],
    sflag: [0],
    bankchg2: [0],
    ktacno: [0],
    scbony: [''],
    bankno: [''],
    swcode: [''],
    nostro: [''],
    minlbr: [0],
    salaryb: [0],
    prnrow: [0],
    maxvtgno: [0],
    main: [0],
    add4: [''],
    othchg: [0],
    gender: [0],
    spouse: [''],
    spousedob: ['0000-00-00'],
    married: [0],
    education:[''],
    knowledge: [''],
    potential: [''],
    oppoints: [0],
    website: [''],
    cstno: [''],
    rbookday: [0],
    kinswt: [0],
    branchid: [0],
    uidno: [''],
    wrkhrs: [0],
    lottbal: [0],
    othfine: [0],
    gstin: [''],
    stcode: [''],
    stateid: [0],
    gst: [0],
    hsncode: [''],
    comps: [0],
    ecom: [0],
    exptype: [''],
    oploan: [0],
    pfsalary: [0],
    opwithdraw: [0],
    salins: [0],
    cdc: [0],
    netbank: [0],
    userid: [''],
    corpid: [''],
    accno: [''],
    ifsc: [''],
    urnid: [''],
    bnkstatus: [''],
    bnkalias: [''],
    sysid: [''],
    impcol: [''],
    spemail: [''],
    spmobile: [''],
    upd: [0],
    hisab: [0],
    salarydet: [''] ,
    stcatid: [0],
    tcs: [0],
    opbal:[0],
    opcrdr:[0],
    showopbal:['N'],
    crdr1:[0],
    crdr2:[0],
    crdr3:[0],
    crdr4:[0],
    fine1:[0],
    fine2:[0],
    amount:[0],
    state:[''],
    series:[''],
    Nostro:[''],
    ddate:['0000-00-00'],    
    mcurr:['']    
    });
    this.acform.controls['spouse'].disable();
    this.acform.controls['spemail'].disable();
    this.acform.controls['spmobile'].disable();
    this.acform.controls['spousedob'].disable();
    
    
    
   }
   
   
  }
  addRow(index) {        
    this.spousedetail.push({
      name:'',
      relation:'',mob:'',dob:'0000-00-00',asary:'0000-00-00'
    });
    return true;  
}  


marriedselection(event:any)
{  
  if(event==1)
  {
    this.acform.controls['spouse'].enable();
    this.acform.controls['spemail'].enable();
    this.acform.controls['spmobile'].enable();
    this.acform.controls['spousedob'].enable();
  }
  else
  {
    this.acform.controls['spouse'].disable();
    this.acform.controls['spemail'].disable();
    this.acform.controls['spmobile'].disable();
    this.acform.controls['spousedob'].disable();
  }
}
deleteRow(index) {  
    if(this.spousedetail.length ==1) {  
      alert("Can't delete the row when there is only one row");  
        return false;  
    } else {  
        this.spousedetail.splice(index, 1);  
        alert('Row deleted successfully',);  
        return true;  
    }  
}  
  toggleDisplay() {    
    if(this.sdivs ==true)
    {      
      this.event.emit("");
    }
    else
    {
      this.isnew=!this.isnew;
      this.isShow = !this.isShow;
      this.isdivShow=!this.isdivShow;        
      if(this.isdivShow==true)
      {          
        this.isdel=false;
        this.acform.reset();
        this.title='Submit';        
        this.activeindex=-1;             
    }
  }
}
  LoadRecords() {   
    this.records = [];
    this.retData=[];
    this.filterrec=[];
    this.myService.Records().subscribe(res => {
      this.records = res; 
      this.filterrec=res;      
      this.retData = this.records.slice(0, 15);              
    });    
    err => {
      console.log(err);
    }
  }
  loadAcgrpList()
    {
      this.myService.AcRecords().subscribe(res=>
        {
          this.acgrplist = [];   
          for (let i = 0; i < res.length; i++) {
            //   
            this.acgrplist.push({
              id: res[i]["GROUPID"],
              name:res[i]["GNAME"],
              address:res[i]["ADDRESS"]
            });
          }
          this.acgrplist.push({
            id: "-1",
            name:"Add New"
          });  
        })
    }
    loadcityList()
    {
     // alert(JSON.stringify(this.citylist));
      this.myService.GetCity().subscribe(res=>
        {
          //alert(JSON.stringify(res));
          this.citylist = [];   
          for (let i = 0; i < res.length; i++) {
            //   
            this.citylist.push({
              id: res[i]["CITYID"],
              name:res[i]["CITY"],
              state:res[i]["state"],
              stateid:res[i]["STATEID"],
              country:res[i]["country"]
            });
          }
          
          this.citylist.push({
            id: "-1",
            name:"Add New"
          });  
        })
    }
    loadLocationList()
    {
     // alert(JSON.stringify(thi));
      this.myService.Getlocation().subscribe(res=>
        {
         
          this.loclist = [];   
          for (let i = 0; i < res.length; i++) {
            //   
            this.loclist.push({
              id: res[i]["locationid"],
              name:res[i]["location1"]
              
            });
            //alert(JSON.stringify(res));
          }
          this.loclist.push({
            id: "-1",
            name:"Add New"
          });  
        })
    }
    loadmcurrList()
    {
      this.myService.GetMcurr().subscribe(res=>
        {
          this.mcurrlist = [];   
          for (let i = 0; i < res.length; i++) {
            //   
            this.mcurrlist.push({
              id: res[i]["mcurrid"],
              name:res[i]["mcurr1"]
            });
          }
         
          this.mcurrlist.push({
            id: "-1",
            name:"Add New"
          });  
        })
        
    }
    loadseriesList()
    {
      this.myService.GetSeries().subscribe(res=>
        {
         
          this.serieslist = [];   
          for (let i = 0; i < res.length; i++) {
            //   
            this.serieslist.push({
              id: res[i]["seriesid"],
              name:res[i]["series1"]
            });
          }
          this.serieslist.push({
            id: "-1",
            name:"Add New"
          });  
        })
    }

  sendgrp(e)
  {
    this.comboval=e.target.value;
  }
  selectFineop(event)
  {let value=event.target.value;
    if(value=='Y')
    {
      this.isopbal=true;
    }
    else
    {
      this.isopbal=false;
    }
  }
  onsubmit()
  { 
    //alert(this.acform.value.spmobile);    
    let model= {
      "prefix": this.acform.value.prefix,
      "cname": this.acform.value.cname,
      "pname": this.acform.value.pname,
      "shortname": this.acform.value.shortname,
      "add1": this.acform.value.add1,
      "add2": this.acform.value.add2,
      "add3": this.acform.value.add3,
      "city": this.tcity,
      "location": this.tlocation,
      "occupation": this.acform.value.occupation,
      "stateid":this.acform.value.stateid,
      "pin": this.acform.value.pin,
      "phone": this.acform.value.phone,
      "country": this.acform.value.country,
      "mobile": this.acform.value.mobile,
      //"dob": this.acform.value.dob=='0000-00'?'0001-01-01':this.acform.value.dob,
      "education": this.acform.value.education,
      "knowledge": this.acform.value.knowledge,
      "potential": this.acform.value.potential,
      "website": this.acform.value.website,
      "gender": this.acform.value.gender,
      "email": this.acform.value.email,
      "refby": this.acform.value.refby,
      //"asary": this.acform.value.asary=='0000-00'?'0001-01-01':this.acform.value.asary,
      "agentacno": this.acform.value.agentacno,
      "married": this.acform.value.married,
      "spouse": this.acform.getRawValue().spouse==null?'':this.acform.getRawValue().spouse,
      "spemail": this.acform.getRawValue().spemail==null?'':this.acform.getRawValue().spemail,
      //"spousedob": this.acform.getRawValue().spousedob=='0000-00'?'0001-01-01':this.acform.getRawValue().spousedob,
      "spmobile": this.acform.getRawValue().spmobile==null?'':this.acform.getRawValue().spmobile,
      "intr": this.acform.value.intr,
      "grtran": this.acform.value.grtran,      
      "comint": this.acform.value.comint,
      "comintdef": this.acform.value.comintdef,
      "mint": this.acform.value.mint,
      "othfine": this.acform.value.othfine,
      "lottbal": this.acform.value.lottbal,
      "gstin": this.acform.value.gstin,
      "pan": this.acform.value.pan,
      "uidno": this.acform.value.uidno,
      "ecom": this.acform.value.ecom,
      "gst": this.acform.value.gst,
      "dep": this.acform.value.dep,
      "hsncode": this.acform.value.hsncode,
      "mcurrid": this.acform.value.mcurrid,
      "mcxcomex": this.acform.value.mcxcomex,
      "no12": this.acform.value.no12,
      "exptype": this.acform.value.exptype,
      "kprefix": this.acform.value.kprefix,
      "kvmno": this.acform.value.kvmno,
      "comps": this.acform.value.comps,
      "compno": this.acform.value.compno,
      "rscomm": this.acform.value.rscomm,
      "percent": this.acform.value.percent,
      "branchid": this.acform.value.branchid,
      "compath": this.acform.value.compath,
      "brpath": this.acform.value.brpath,
      "nature": this.acform.value.nature,
      "bankacno": this.acform.value.bankacno,
      "bankno": this.acform.value.bankno,
      "swcode": this.acform.value.swcode,
      "scbony": this.acform.value.scbony,
      "nostro": this.acform.value.nostro,
      "netbank": this.acform.value.netbank,
      "bankchg": this.acform.value.bankchg,
      "bankchg2": this.acform.value.bankchg2,
      "odlimit": this.acform.value.odlimit,
      "bankbadla": this.acform.value.bankbadla,
      "bankex": this.acform.value.bankex,
      "siteid": this.acform.value.siteid,
     // "dep": this.acform.value.dep,  department
      "dep2": this.acform.value.dep2,
      "kmno": this.acform.value.kmno,
      "krefmno": this.acform.value.krefmno,
      "krefby": this.acform.value.krefby,
      "ksman": this.acform.value.ksman,
      "kremarks": this.acform.value.kremarks,
      "kinsrec": this.acform.value.kinsrec,
      "kpmonth": this.acform.value.kpmonth,
     // "kedate": this.acform.value.kedate=='0000-00'?'0001-01-01':this.acform.value.kedate,
      "rbookday": this.acform.value.rbookday,
      "khome": this.acform.value.khome,
      "kinsamt": this.acform.value.kinsamt,
      "kmonths": this.acform.value.kmonths,      
      //"ksdate": this.acform.value.ksdate=='0000-00'?'0001-01-01':this.acform.value.ksdate,
      "kinswt": this.acform.value.kinswt,
      "stampid": this.acform.value.stampid,
      "jobid": this.acform.value.jobid,
      //"stampid": this.acform.value.stampid,  jbstmp
      //"nature": this.acform.value.nature, dptpost
      "pfacno": this.acform.value.pfacno,
      "pfsalary": this.acform.value.pfsalary,
      "holiday": this.acform.value.holiday,
      "scode": this.acform.value.scode,
      "ballow": this.acform.value.ballow,
      "salaryb": this.acform.value.salaryb,
      //"leave": this.acform.value.leave,
      "esiacno": this.acform.value.esiacno,
      "wrkhrs": this.acform.value.wrkhrs,
      "sale": this.acform.value.sale,
      "purchase": this.acform.value.purchase,
      "issue": this.acform.value.issue,
      "receive": this.acform.value.receive,
      "ord": this.acform.value.ord,
      "repair": this.acform.value.repair,
      "kitty": this.acform.value.kitty,
      "advance": this.acform.value.advance,
      "taging": this.acform.value.taging,
      "crfine1": this.acform.value.crfine1,
      "crfine2": this.acform.value.crfine2,
      "cramt": this.acform.value.cramt,
      "crdays": this.acform.value.crdays,
      "loginid": this.acform.value.loginid,
      "acno": this.acform.value.acno,
      "fine1":this.acform.value.fine1,
      "crdr1":this.acform.value.crdr1,
      "fine2":this.acform.value.fine2,
      "crdr2":this.acform.value.crdr2,
      "amount":this.acform.value.amount,
      "crdr3":this.acform.value.crdr3,
      "crdr4":this.acform.value.crdr4,      
      

      "groupid": this.acform.value.groupid==null?0:this.acform.value.groupid,
      
    }

    console.log(model);

    if(this.activeindex==-1)
     {      
       alert('save');
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["acno"]))
         {
           alert(data.message);
         }
         else
         {
            alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();         
            //form.submitted=false;
            this.toggleDisplay();
            this.count = 1;    
            }
         }
       })   
     }     
     else
     { 
     // alert(JSON.stringify(model)); 
         this.myService.Update(model).subscribe(data=>{
           //alert(data["catid"]);
          if(isNaN(data["acno"]))
         {
           alert(data.message);
         }
         else
         {
          alert("Updated Successfully");          
          this.LoadRecords();         
          //form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
  }
  edit(record)
  {
    try
    {
    this.toggleDisplay();   
    this.isdel=true; 
    this.activeindex=1;
    
    this.myService.GetOpbal(record.ACNO).subscribe(res=>
      { 
        //alert(record.GROUPID);
        if(res.length>0 && res[0]["NO12"]==3)
        {
          if(res[0]["AMOUNT"]<0)
          {
          this.acform.patchValue({
            opbal:-res[0]["AMOUNT"],
            opcrdr:0
              });
          }
          else
          {
            this.acform.patchValue({
              opbal:res[0]["AMOUNT"],
              opcrdr:1
                });
          }
        }
        
        if(res.length>0 && res[0]["NO12"]==2)
        {
          if(res[0]["FINE1"]!=0 || res[0]["FINE2"]!=0 ||res[0]["AMOUNT"]!=0 || record.OTHFINE!=0)
          {
            this.acform.patchValue({
              showopbal:'Y'             
                });
          }
          else
          {
            this.acform.patchValue({
              showopbal:'N'             
                });
          }
          if(res[0]["FINE1"]<0)
          {
            this.acform.patchValue({
              FINE1:-res[0]["FINE1"], 
              crdr1:0                           
                });
          }
          else
          {
            this.acform.patchValue({
              FINE1:res[0]["FINE1"],
              crdr1:1              
                });
          }
          if(res[0]["FINE2"]<0)
          {
            this.acform.patchValue({
              fine2:-res[0]["FINE2"],
              crdr2:0              
                });
          }
          else
          {
            this.acform.patchValue({
              fine2:res[0]["FINE2"],
              crdr2:1              
                });
          }
          if(res[0]["AMOUNT"]<0)
          {
            this.acform.patchValue({
              amount:-res[0]["AMOUNT"],
              crdr3:0             
                });
          }
          else
          {
            this.acform.patchValue({
              amount:res[0]["AMOUNT"],
              crdr3:1              
                });
          }
        }        
      }); 
      //this.tcity=tcitylist[0]["name"];
    this.acform.patchValue({
      prefix:record.PREFIX,
      cname:record.CNAME,
      pname:record.PNAME,
      shortname:record.SHORTNAME,
      add1:record.ADD1,
      add2:record.ADD2,
      add3:record.ADD3,
      city:record.CITY,
      location:record.LOCATION,
      occupation:record.OCCUPATION,
      stateid:record.STATEID,
      pin:record.PIN,
      phone:record.PHONE,
      country:record.COUNTRY,
      mobile:record.MOBILE,
      //"dob": this.acform.value.dob=='0000-00'?'0001-01-01':this.acform.value.dob,
      education:record.EDUCATION,
      knowledge:record.KNOWLEDGE,
      potential:record.POTENTIAL,
      website:record.WEBSITE,
      gender:record.GENDER,
      email:record.EMAIL,
      refby:record.REFBY,
      //"asary": this.acform.value.asary=='0000-00'?'0001-01-01':this.acform.value.asary,
      agentacno:record.AGENTACNO,
      married:record.MARRIED,
      spouse:record.SPOUSE,
      spemail:record.spemail,
      //"spousedob": this.acform.value.spousedob=='0000-00'?'0001-01-01':this.acform.value.spousedob,
      spmobile:record.spmobile,
      intr:record.INTR,
      grtran:record.GRTRAN,      
      comint:record.COMINT,
      comintdef:record.COMINTDEF,
      mint:record.MINT,
      othfine:record.OTHFINE,
      lottbal:record.LOTTBAL,
      gstin:record.GSTIN,
      pan:record.PAN,
      uidno:record.UIDNO,
      ecom:record.ECOM,
      gst:record.GST,
      dep:record.DEP,
      hsncode:record.HSNCODE,
      mcurrid:record.MCURRID,
      mcxcomex:record.MCXCOMEX,
      no12:record.NO12,
      exptype:record.EXPTYPE,
      kprefix:record.KPREFIX,
      kvmno:record.KVMNO,
      comps:record.COMPS,
      compno:record.COMPNO,
      rscomm:record.RSCOMM,
      percent:record.PERCENT,
      branchid:record.BRANCHID,
      compath:record.COMPATH,
      brpath:record.BRPATH,
      nature:record.NATURE,
      bankacno:record.BANKACNO,
      bankno:record.BANKNO,
      swcode:record.SWCODE,
      scbony:record.SCBONY,
      nostro:record.NOSTRO,
      netbank:record.NETBANK,
      bankchg:record.BANKCHG,
      bankchg2:record.BANKCHG2,
      odlimit:record.ODLIMIT,
      bankbadla:record.BANKBADLA,
      bankex:record.BANKEX,
      siteid:record.SITEID,
     // "dep": this.acform.value.dep,  department
      dep2:record.DEP2,
      kmno:record.KMNO,
      krefmno:record.KREFMNO,
      krefby:record.KREFBY,
      ksman:record.KSMAN,
      kremarks:record.KREMARKS,
      kinsrec:record.KINSREC,
      kpmonth:record.KPMONTH,
     // "kedate": this.acform.value.kedate=='0000-00'?'0001-01-01':this.acform.value.kedate,
      rbookday:record.RBOOKDAY,
      khome:record.KHOME,
      kinsamt:record.KINSAMT,
      kmonths:record.KMONTHS,      
      //"ksdate": this.acform.value.ksdate=='0000-00'?'0001-01-01':this.acform.value.ksdate,
      kinswt:record.KINSWT,
      stampid:record.stampid,
      jobid:record.JOBID,
      //"stampid": this.acform.value.stampid,  jbstmp
      //"nature": this.acform.value.nature, dptpost
      pfacno:record.PFACNO,
      pfsalary:record.PFSALARY,
      holiday:record.HOLIDAY,
      scode:record.SCODE,
      ballow:record.BALLOW,
      salaryb:record.SALARYB,
      //"leave": this.acform.value.leave,
      esiacno:record.ESIACNO,
      wrkhrs:record.WRKHRS,
      sale:record.SALE,
      purchase:record.PURCHASE,
      issue:record.ISSUE,
      receive:record.RECEIVE,
      ord:record.ORD,
      repair:record.REPAIR,
      kitty:record.KITTY,
      advance:record.ADVANCE,
      taging:record.TAGING,
      crfine1:record.CRFINE1,
      crfine2:record.CRFINE2,
      cramt:record.CRAMT,
      crdays:record.CRDAYS,
      loginid:record.LOGINID,
      acno:record.ACNO,
      fine1:record.FINE1,
      crdr1:record.CRDR1,
      fine2:record.FINE2,
      crdr2:record.CRDR2,
      amount:record.amount,
      crdr3:record.CRDR3,
      crdr4:record.CRDR4,
      groupid:record.GROUPID,
      gname:record.gname

  
    });
    this.tlocation=record.LOCATION; 
    this.tcity=record.CITY;
    var tcitylist=this.citylist.filter(x=>x.name.toLocaleLowerCase()==record.CITY.toLocaleLowerCase());    
    
    
    this.acform.patchValue({
      stateid:tcitylist[0]["stateid"],
      state:tcitylist[0]["state"]    
    });
    this.acform.patchValue({
      stateid:tcitylist[0]["stateid"],
      state:tcitylist[0]["state"]    
    });
    
    
    var tgrplist=this.acgrplist.filter(x=>x.id==record.GROUPID); 
    this.tgroup= tgrplist[0]["name"] ;   
    this.acform.patchValue({
      groupid:tgrplist[0]["id"],
      gname:tgrplist[0]["name"]    
    });
    
    this.showpopup(tgrplist[0]);
    this.marriedselection(record.MARRIED);
    
    var tmcurr=this.mcurrlist.filter(x=>x.id==record.MCURRID);
    console.log(tmcurr);
    this.acform.patchValue({
      mcurrid:tmcurr[0]["id"],
      mcurr:tmcurr[0]["name"]    
    });
     
    
    /* alert(record.LOCATION); */
    }
    catch(error)
    {
console.log(error);
    }
  }
  
  pageChanged(event: PageChangedEvent): void {
    this.count = (event.page-1)*event.itemsPerPage+1;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.retData = this.filterrec.slice(startItem, endItem);
  } 
  showpopup(event:any)
  {   
    if(event["name"]=='Bank' || event["name"]=='Bank Occ' ||event["id"]==6 || event["id"]==15)
    {
      this.ispopup=true;
      this.isbankshow=true;
      this.istaxshow=false;
      this.isaddshow=false;
      this.iscreditshow=false;
      this.isaddress=false;
    }
    else if(event["address"]!='' && event["address"]=='Y')
    {
      this.isaddress=true;
    }
    else if(event["name"]=='Karigar-Contract')
    {
      this.isjobshow=true;
    }
    else if(event["name"]=='Staff-Salary' || event["name"]=='Salesman')
    {
      this.isdepartshow=true;
    }
    else if(event["name"]=='Karigar-Salary')
    {
      this.isjobshow=true;
      this.isdepartshow=true;
    }
    else if(event["name"]=='Kitty')
    {
       this.iskittyshow=true;
    }
    else if(event["name"]=='Girvi')
    {
        this.isgirvishow=true;
    }
    else
    {
      this.isaddress=false;
    }
  }
  selectEvent(event: Event) {      
    try
    { 
      if(event["id"]=="-1")
      {        
          this.childDisplay(1); 
      }
      else{
        
        if(event["name"]=="" || event["name"]=="undefined")
        { 
          event["name"]=this.tgroup;  
        }
        else
        {
          if(this.tgroup=='')
          {
            this.tgroup=event["name"];
          }
          
          var tgrplist=this.acgrplist.filter(x=>x.name==this.tgroup);   
          this.acform.patchValue({
            groupid:tgrplist[0]["id"],
            gname:tgrplist[0]["name"]
          });             
          this.showpopup(tgrplist[0]);
          this.tgroup=tgrplist[0]["name"];
          
      }      
      
    }
     
    }
    catch{}  
   
  }
  selectEvent2(event: Event) {   
    try{
      if(event["id"]=="-1")
      {
        this.childDisplay(2);
      }
    else{
       this.acform.patchValue({
         locationid:event["locationid"],
         location:event["name"]
       });
    }
  }
  catch{}
  //this.showpopup(event);
}

     

  selectEvent3(event: Event) {          
    try{
      if(event["id"]=="-1")
      {
        this.childDisplay(3);
      }
      else{
        var tcitylist=this.citylist.filter(x=>x.name.toLocaleLowerCase()==this.tcity.toLocaleLowerCase());    
    
    
        this.acform.patchValue({
          stateid:tcitylist[0]["stateid"],
          state:tcitylist[0]["state"] ,
          country:tcitylist[0]["country"]   
        });
      }
    }
   catch{}
  }
  selectEvent5(event: Event) {     
    this.acform.patchValue({      
      mcurrid:event["id"],
      mcurr:event["name"]
    });
  }
  childDisplay (show:any)
  {   
    
     this.ischildshow=!this.ischildshow;
     
     this.isparentshow=!this.isparentshow;
     if(show==1){
      
       this.isgroupshow=true;
       this.islocshow=false;
       this.iscityshow=false;

     }
      else if(show==2)
      {      
        this.isgroupshow=false;
        this.islocshow=true;
        this.iscityshow=false;
      }
      else if(show==3)
      {
        this.iscityshow=true;
        this.isgroupshow=false;
        this.islocshow=false;  
      }
       

  }
  close()
  {
    this.ispopup=false;
    this.istaxshow=false;
    this.isaddshow=false;
    this.isbankshow=false;
    this.iscreditshow=false;
    
  }
  taxselection(value:string,cntrl)
  {
    if(value=='1')
    {this.ispopup=true;}
    else
    {this.ispopup=false;}    
    this.istaxshow=false;
    this.isaddshow=false;
    this.isbankshow=false;
    this.iscreditshow=false;
    switch(cntrl)
    {
      case 'tax':
        if(value=='1')
        {          
          this.istaxshow=true;
        }
        break;
      case 'credit':
        if(value=='1')
        {
          this.iscreditshow=true;
        }
        break;
        case 'add':
        if(value=='1')
        {
          this.isaddshow=true;
        }
        break;
    }    
  }
  Delete() {      
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.acform.value.acno).subscribe(data=>{       
        if(isNaN(data["stampid"]))
         {
           alert(data.message);
         }
         else
         {
          alert("Deleted");
          this.LoadRecords();                   
          this.toggleDisplay();
          this.count = 1;
         }
      });      
    }
    else {
      
    }

  } 
  Search()
    {
      if(this.searchText=="")
      {      
        this.ngOnInit();
        this.filterrec=this.records; 
      }
      else
      { 
        this.filterrec=[];     
        this.retData=[];     
        this.filterrec=this.records.filter(x => x.CNAME.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
        console.log(JSON.stringify(this.filterrec));
        this.retData=this.filterrec.slice(0,15);
      }
    } 
    name:string='';
    sendgroup(e)
{
  this.name=e.target.value;
  //alert(this.name);
}
sendloc(e)
{
  this.name=e.target.value;
}
sendcity(e)
{
  this.name=e.target.value;
}
}
