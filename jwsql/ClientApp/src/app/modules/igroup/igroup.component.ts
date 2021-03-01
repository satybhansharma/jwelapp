import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS,ElementRef } from '@angular/core';
//import { ShapeService} from '../shape/shape.service';
import { Form, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DatacommunicationService } from '../../shared/services/datacommunication.service';
import * as jquery from 'jquery'
declare var $: any;
import { DataTableDirective } from 'angular-datatables';
import { from, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CustomValidators } from 'ngx-custom-validators';
import { CommonService } from '../../shared/services/common.service';
import { AlertService, AlertType } from '../../shared/_alert';
import { DataService } from '../../shared/services/data.service';
import {SharedserviceService} from '../../shared/services/sharedservice.service';
import { data } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { IgroupService } from './igroup.service';
import{UnitmasterService} from '../unitmaster/unitmaster.service'
import { StampService } from '../../shared/services/stamp.service';
import { AccmastService } from '../accmast/accmast.service';

@Component({
  selector: 'app-igroup',
  templateUrl: './igroup.component.html',
  styleUrls: ['./igroup.component.css']
})
export class IgroupComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendigroup: string;
  @Output() event=new EventEmitter<any>();
  @ViewChild('input1') inputEl:ElementRef;

  recieveunit(data:any){  
    if(data=="")
    {
      this.tunit='';
    }
    else{
      this.unitlist.push({
        id: data["unitid"],
        name:data["unit"]
      });
      this.igForm.patchValue({  
        unitid:data["unitid"],    
        unit:data["unit"]
      });   
      this.tunit=data["unit"];
    }
    
    this.ischildshow=!this.ischildshow;
}
recievestamp(data:any){  
  if(data==""){
    this.tstamp='';
  }
  else{    
    this.stamplist.push({
      id: data["stampid"],
      name:data["stamp1"]
    });
    this.igForm.patchValue({  
      stampid:data["stampid"],    
      stamp1:data["stamp1"]
    });   
    this.tstamp=data["stamp1"];
  }
  
  
  this.ischildshow=!this.ischildshow;
}
 
  igForm: FormGroup;
  isresless: boolean;
  type:any=['Primary','SubGroup'];
  under=[];
  unitlist=[];
  stamplist=[];
  cname=[];
  scname=[];
  pcname=[];
  icname=[];
  rcname=[];
  rentcname=[];
  keyword1='name';
  keyword2='name';
  keyword3='name';
  keyword4='name';
  keyword5='name';
  keyword6='name';
  keyword7='name';
  keyword8='name';
  keyword9='name';
  keyword10='name';
  tunit='';
  tstamp='';
  tunder='';
  tscname='';
  tpcname='';
  ticname='';
  trcname='';
  tstscname='';
  tstpcname='';
  trentcname='';
  isgst:boolean=true;
  isstock:boolean=true;
  isaccount:boolean=true;
  isadditional:boolean=true;
  isunitshow:boolean=false;
  isstampshow:boolean=false;
  isunder=false;
  ttype=0;
activeindex=-1;
  title = "Add New ItemGroup";   
  isShow=false;
  isdivShow=true;
  ischildshow=false;
  isparentshow=true;
  isdel=false;
  isnew=true;
  
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
 constructor(private myService: IgroupService,
    private sharedser: SharedserviceService,
   private _unitservice: UnitmasterService,

    private _stampservice:StampService,
    private _accmasterservice:AccmastService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
   
    records: any[];
    filterrec:any[];
  
    retData: any[];  
    
    count: number = 1;
    
    searchText = '';
    mess='';
    retunit='';
    
    LoadRecords() {         
     
      this.records = [];
      this.retData=[];
      this.filterrec=[];
      this.myService.Records().subscribe(res => {
        this.records = res; 
        this.filterrec=res;     
        this.retData = this.records.slice(0, 15);
       // alert(JSON.stringify(this.retData));
      });    
      err => {
        console.log(err);
      }
    }
loadigroup()
{
  this.myService.Records().subscribe(res=>
    {
      this.under = [];   
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
        this.under.push({
          id: res[i]["igroupid"],
          name:res[i]["igroup1"]
        });
      }  
    })
}

loadunits()
{
  this._unitservice.Records().subscribe(res=>
    {
      this.unitlist = [];   
      //alert(JSON.stringify(res));
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
        this.unitlist.push({
          id: res[i]["unitid"],
          name:res[i]["unit"]
        });

      }
      this.unitlist.push({
        id:"-1",
        name:"Add New"
      });
      //alert(JSON.stringify(this.unitlist));  
    })
}
loadstamp()
{
  
  this._stampservice.Records().subscribe(res=>
    {
      
      this.stamplist = [];   
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
        this.stamplist.push({
          id: res[i]["stampid"],
          name:res[i]["stamp1"]
        });
      }  
      this.stamplist.push({
        id:"-1",
        name:"Add New"
      });
    })
}
loadcname()
{
  
  this._accmasterservice.Records().subscribe(res=>
    {
      
      this.cname = [];   
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
       
        this.cname.push({
          id: res[i]["acno"],
          name:res[i]["cname"]
        });
      }
      
    })
}
loadscname()
{
  
  this._accmasterservice.Records().subscribe(res=>
    {
     // alert(JSON.stringify(res));
      this.scname = [];   
      this.pcname=[];
      this.icname=[];
      this.rcname=[];
      
      for (let i = 0; i < res.length; i++) {
          
        if(res[i]["GROUPID"]==7 )
        {          
           this.scname.push({
           id: res[i]["ACNO"],
           name:res[i]["CNAME"]
         });
       }
         if(res[i]["GROUPID"]==8 )
         {           
            this.pcname.push({
            id: res[i]["ACNO"],
            name:res[i]["CNAME"]
          });
        }
          if(res[i]["GROUPID"]==34 )
         {           
            this.icname.push({
            id: res[i]["ACNO"],
            name:res[i]["CNAME"]
          });
        }
          if(res[i]["GROUPID"]==35 )
         {           
            this.rcname.push({
            id: res[i]["ACNO"],
            name:res[i]["CNAME"]
          });
       } 
       this.rentcname.push({
        id: res[i]["ACNO"],
        name:res[i]["CNAME"]
       });
     }
     this.rcname.push({
      id: "-1",
      name:"Add New"
    });
    this.icname.push({
      id: "-1",
      name:"Add New"
    });
    this.pcname.push({
      id: "-1",
      name:"Add New"
    });
    this.scname.push({
      id: "-1",
      name:"Add New"
    });
     
  });
  
}
isValidInput(igroup1): boolean {
  return this.igForm.controls[igroup1].invalid &&
    (this.igForm.controls[igroup1].dirty || this.igForm.controls[igroup1].touched);
}
formSubmitted: boolean;
isFieldValid(field: string) {
return (
  this.igForm.get(field).errors && this.igForm.get(field).touched ||
  this.igForm.get(field).untouched &&
  this.formSubmitted && this.igForm.get(field).errors
);
}
  ngOnInit(): void {
        
    this.igForm = this.fb.group({
      igroupid:[0],
      igroup1 : [,Validators.required],
      pname : [],        
      underid: [0],
      itname:[],
      ltax:[0],
      ctax:[0],
      gp:[0],
      obal:[0],
      sacno:[0],
      pacno:[0],
      stsacno:[0],
      stpacno:[0],
      iacno:[0],
      racno:[0],
      psgst:[0],
      pcgst:[0],
      pigst:[0],
      hsncode:[],
      cbal:[0],
      minqty:[0],
      stampid:[0],
      unitid:[0],
      srtotal:[0],
      srlamt:[0],
      srmamt:[0],
      srdamt:[0],
      srsamt:[0],
      mcxinto:[0],
      dis:[0],
      dbhav:[],
      mcxcomex:[0],
      lbrdis:[0],
      ttype:[0],
      igtgnum:[0],
      resless:[0],
      alttag:[0],
      itrate:[0],
      igaladd:[0],
      rtag:[0],
      resmrp:[0],
      consume:[0],
      gwtnwt:[0],
      unit:[],
      stamp1:[],
      under:[],
      scname:[],
      pcname:[],
      icname:[],
      rcname:[],
      stscname:[],
      stpcname:[],
      tag:[false]
      
    });
    if(this.sdivs ==true)
    {
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
      this.igForm.patchValue({
      igroup1:this.sendigroup
      });
    } 
    else
    {
      this.LoadRecords();    
    } 
    this.loadigroup(); 
    this.loadunits();
    this.loadstamp();
    //this.loadcname();
    this.loadscname();
   
    
  }

  
  selectEvent(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.underid;
    }     
    this.tunder=item["name"];
    this.igForm.patchValue({      
      underid:item["id"],
      under:item["name"]
    }); 
  }
  selectEvent2(item) {    
    if(item["id"]=="-1")
    {
this.childDisplay(1);
    }
    else{

   
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.unitid;
    }     
    this.tunit=item["name"];
    this.igForm.patchValue({      
      unitid:item["id"],
      unit:item["name"]
    }); 
  }
  }
  selectEvent3(item) {
    if(item["id"]=="-1")
    {
      this.childDisplay(2);
    }
    else{

    
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.stampid;
    }     
    this.tstamp=item["name"];
    this.igForm.patchValue({      
      stampid:item["id"],
      stamp:item["name"]
    }); 
  }
  }
  selectEvent4(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.sacno;
    }     
    this.igForm.patchValue({      
      sacno:item["id"],
      scname:item["name"]
    }); 
  }
  selectEvent5(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.pacno;
    }     
    this.igForm.patchValue({      
      pacno:item["id"],
      pcname:item["name"]
    }); 
  }
  selectEvent6(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.iacno;
    }     
    this.igForm.patchValue({      
      iacno:item["id"],
      icname:item["name"]
    }); 
  }
  selectEvent7(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.racno;
    }     
    this.igForm.patchValue({      
      racno:item["id"],
      rcname:item["name"]
    }); 
  }
  selectEvent8(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.stsacno;
    }     
    this.igForm.patchValue({      
      stsacno:item["id"],
      stscname:item["name"]
    }); 
  }
  selectEvent9(item) {
    if(isNaN(item["id"]))
    {
      item["id"]=this.igForm.value.stpacno;
    }     
    this.igForm.patchValue({      
      stpacno:item["id"],
      stpcname:item["name"]
    }); 
  }
  selectEvent10(item) {
    // if(isNaN(item["id"]))
    // {
    //   item["id"]=this.igForm.value.re;
    // }     
    // this.igForm.patchValue({      
    //   stpacno:item["id"],
    //   stpcname:item["name"]
    // }); 
  }
  toggleDisplay() {
    if(this.sdivs ==true)
    {      
      this.event.emit("");
    }
    else
    {
      this.tunit=this.tstamp=this.tunder=this.tscname=this.tpcname=this.ticname=this.trcname=this.tstscname=this.tstpcname='';
      this.isShow = !this.isShow;
      this.isdivShow=!this.isdivShow;
      this.isnew=!this.isnew;
      this.isunder=false;
      if(this.isdivShow==true)
      {
        this.isdel=false;
      
      //this.initialValue='';
      
      this.igForm.reset();
      this.title='Submit';
      this.activeindex=-1;
      }
      else{
        //this.inputEl.nativeElement.focus();
      }
      
    }
  }
  childDisplay (show:any)
  {    
    this.ischildshow=!this.ischildshow;
    this.isparentshow=!this.isparentshow;
    if(show==1){
      
      this.isunitshow=true;
      this.isstampshow=false;

    }
    else if(show==2)
    {      
      this.isunitshow=false;
      this.isstampshow=true;
    }
       

  }
  Search()
  {
    if(this.searchText=="")
    {      
      this.ngOnInit();
    }
    else
    {
      this.filterrec=this.records.filter(x => x.igroup1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    this.formSubmitted=true;
    if(this.igForm.valid)
    {

   
  
    let model = {
      igroup1: this.igForm.value.igroup1==null?"":this.igForm.value.igroup1,
      pname: this.igForm.value.pname==null?"":this.igForm.value.pname,
      underid: this.igForm.value.underid==null?0:this.igForm.value.underid,
      igroupid: this.igForm.value.igroupid==null?0:this.igForm.value.igroupid,
      itname: this.igForm.value.itname==null?"":this.igForm.value.itname,
      ctax: this.igForm.value.ctax==null?0:this.igForm.value.ctax,
      ltax: this.igForm.value.ltax==null?0:this.igForm.value.ltax,
      gp: this.igForm.value.gp==null?0:this.igForm.value.gp,
      obal: this.igForm.value.obal==null?0:this.igForm.value.obal,
      sacno: this.igForm.value.sacno==null?0:this.igForm.value.sacno,
      pacno: this.igForm.value.pacno==null?0:this.igForm.value.pacno,
      stsacno: this.igForm.value.stsacno==null?0:this.igForm.value.stsacno,
      stpacno: this.igForm.value.stpacno==null?0:this.igForm.value.stpacno,
      iacno: this.igForm.value.iacno==null?0:this.igForm.value.iacno,
      racno: this.igForm.value.racno==null?0:this.igForm.value.racno,
      psgst: this.igForm.value.psgst==null?0:this.igForm.value.psgst,
      pcgst: this.igForm.value.pcgst==null?0:this.igForm.value.pcgst,
      pigst: this.igForm.value.pigst==null?0:this.igForm.value.pigst,
      hsncode: this.igForm.value.hsncode==null?"":this.igForm.value.hsncode,
      cbal: this.igForm.value.cbal==null?0:this.igForm.value.cbal,
      minqty: this.igForm.value.minqty==null?0:this.igForm.value.minqty,
      stampid: this.igForm.value.stampid==null?0:this.igForm.value.stampid,
      unitid: this.igForm.value.unitid==null?0:this.igForm.value.unitid,
      srtotal: this.igForm.value.srtotal==null?0:this.igForm.value.srtotal,
      srlamt: this.igForm.value.srlamt==null?0:this.igForm.value.srlamt,
      srmamt: this.igForm.value.srmamt==null?0:this.igForm.value.srmamt,
      srdamt: this.igForm.value.srdamt==null?0:this.igForm.value.srdamt,
      srsamt: this.igForm.value.srsamt==null?0:this.igForm.value.srsamt,
      mcxinto: this.igForm.value.mcxinto==null?0:this.igForm.value.mcxinto,
      dis: this.igForm.value.dis==null?0:this.igForm.value.dis,
      dbhav: this.igForm.value.dbhav==null?"":this.igForm.value.dbhav,
      mcxcomex: this.igForm.value.mcxcomex==null?0:this.igForm.value.mcxcomex,
      lbrdis: this.igForm.value.lbrdis==null?0:this.igForm.value.lbrdis,
      ttype: this.igForm.value.ttype==null?0:this.igForm.value.ttype,
      igtgnum: this.igForm.value.igtgnum==null?0:this.igForm.value.igtgnum,
      resless: this.igForm.value.resless==true?1:0,
      alttag: this.igForm.value.alttag==true?1:0, 
      itrate: this.igForm.value.itrate==true?1:0,
      igaladd: this.igForm.value.igaladd==true?1:0,
      rtag: this.igForm.value.rtag==null?0:this.igForm.value.rtag,
      resmrp: this.igForm.value.resmrp==true?1:0,
     consume: this.igForm.value.consume==true?1:0,
      gwtnwt: this.igForm.value.gwtnwt==null?0:this.igForm.value.gwtnwt
     }
     if(this.activeindex==-1)
     {    
      alert(JSON.stringify(model));   
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["igroupid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Group Added Successfully...",this.alertOptions);
            //alert("Saved");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();    
            this.loadigroup();
            this.loadunits();   
            this.loadstamp();  
            this.loadscname();
            this.loadcname();
            form.submitted=false;
            this.toggleDisplay();
            this.count = 1;    
            }
         }
       })   
     }     
     else
     { 
      alert(JSON.stringify(model)); 
         this.myService.Update(model).subscribe(data=>{
           alert(data["igroupid"]);
          if(isNaN(data["igroupid"]))
         {
           //alert(2);
           alert(data.message);
         }
         else
         {
          this.alertService.success("Group Updated Successfully...",this.alertOptions);
          //alert("Saved");          
          this.LoadRecords();   
          this.loadigroup();
          this.loadunits(); 
          this.loadstamp();     
          this.loadcname();
          this.loadscname();    
          form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
         //alert(3);
     }
    }
  }
  deligroup:any;
  edit(record,index)
  { 
    this.deligroup=record;
    this.isaccount=true;
    this.isadditional=true;
    this.isstock=true;
    this.isgst=true;
    this.toggleDisplay(); 
    this.tunit=record.unit;
    this.tstamp=record.stamp1;
    this.tunder=record.under;
    this.tscname=record.scname;
    this.tpcname=record.pcname;
    this.ticname=record.icname;
    this.trcname=record.rcname;
    this.tstscname=record.stscname;
    this.tstpcname=record.stpcname;
    this.igForm.patchValue({
      igroup1:record.igroup1,
      pname:record.pname,
      igroupid:record.igroupid,
      underid:record.underid,
      itname:record.itname,
      ltax:record.ltax,
      ctax:record.ctax,
      gp:record.gp,
      obal:record.obal,
      sacno:record.sacno,
      pacno:record.pacno,
      stsacno:record.stsacno,
      stpacno:record.stpacno,
      iacno:record.iacno,
      racno:record.racno,
      psgst:record.psgst,
      pcgst:record.pcgst,
      pigst:record.pigst,
      hsncode:record.hsncode,
      cbal:record.cbal,
      minqty:record.minqty,
      stampid:record.stampid,
      unitid:record.unitid,
      unit:record.unit,
      under:record.under,
      stamp1:record.stamp1,
      srtotal:record.srtotal,
      srlamt:record.srlamt,
      srmamt:record.srmamt,
      srdamt:record.srdamt,
      srsamt:record.srsamt,
      mcxinto:record.mcxinto,
      dis:record.dis,
      dbhav:record.dbhav,
      mcxcomex:record.mcxcomex,
      lbrdis:record.lbrdis,
      ttype:record.ttype,
      igtgnum:record.igtgnum,
      resless:record.resless,
      alttag:record.alttag,
      itrate:record.itrate,
      igaladd:record.igaladd,
      rtag:record.rtag,
      resmrp:record.resmrp,
      consume:record.consume,
      gwtnwt:record.gwtnwt,
      scname:record.scname,
      pcname:record.pcname,
      icname:record.icname,
      rcname:record.rcname,
      stscname:record.stscname,
      stpcname:record.stpcname
      
      
      
      
    });   
    if(record.underid==0)
    {
      this.ttype=0;
      this.isunder=false;
    }
    else{
      this.ttype=1;
      this.isunder=true;
      under:record.under
      
    }
    if(record.rtag>0)
    {
     this.igForm.patchValue({
       tag:true
     });
    }
    else{
      this.igForm.patchValue({
        tag:false
      });
    }
   // alert(JSON.stringify(this.igForm.getRawValue()));
     
    this.isdel=!this.isdel;
    this.activeindex=1;
    
  }
  Delete() {
    
       
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.deligroup).subscribe(data=>{       
        if(isNaN(data["igroupid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Group Deleted Successfully...",this.alertOptions);
         // alert("Deleted");
          this.LoadRecords();   
          this.loadigroup();
          this.loadunits();    
          this.loadstamp();  
          this.loadcname();
          this.loadscname();              
          this.toggleDisplay();
          this.count = 1;
         }
      });      
    }
    else {
      
    }

  }
  pageChanged(event: PageChangedEvent): void {
    this.count = (event.page-1)*event.itemsPerPage+1;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.retData = this.filterrec.slice(startItem, endItem);
  } 
  isViewgstView(event:any){
    let value=event.target.value;
    if(value==0)
    {
    
      this.isgst=true;
      this.isaccount=true;
      this.isadditional=true;
      this.isstock=true;
    }
    else{
      
      this.isgst=false;
      this.isaccount=true;
      this.isadditional=true;
      this.isstock=true;

    }
    //alert(event.target.value)

   /* this.isgst=false;
   this.isstock=true;
   this.isaccount=true;
   this.isadditional=true; */
 }
 isViewstockView(event:any){
  let Value=event.target.value;
  if(Value==0)
  {
   this.isgst=true;
   this.isstock=true;
   this.isaccount=true;
   this.isadditional=true;
  }
  else{
   this.isgst=true;
   this.isstock=false;
   this.isaccount=true;
   this.isadditional=true;
  }
 
}
isViewacView(event:any){
  let Value=event.target.value;
  if(Value==0)
  {
   this.isgst=true;
   this.isstock=true;
   this.isaccount=true;
   this.isadditional=true;
  }
  else{
   this.isgst=true;
   this.isstock=true;
   this.isaccount=false;
   this.isadditional=true;
  }
 
}
isViewadditionalView(event:any){
  let value=event.target.value;
  if(value==0)
  {
   this.isgst=true;
   this.isstock=true;
   this.isaccount=true;
   this.isadditional=true;
  }
  else{
   this.isgst=true;
   this.isstock=true;
   this.isaccount=true;
   this.isadditional=false;
  }
 
}
isundershow(underind){
 
  if(underind==0)
  {
  
    this.isunder=false;
    
  }
  else{
    
    this.isunder=true;
    

  }
}
name:string='';
sendunit(e)
{
  this.name=e.target.value;
}
sendstamp(e)
{

  this.name=e.target.value;  
}
}
