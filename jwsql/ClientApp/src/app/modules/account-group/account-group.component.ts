import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS, HostListener } from '@angular/core';
import { AcgroupService } from '../account-group/acgroup.service';
import { Form, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { DatacommunicationService } from '../../shared/services/datacommunication.service';
import * as jquery from 'jquery'
declare var $: any;
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
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
import { AccmastService } from '../accmast/accmast.service';
import { KEY_CODE } from '../../shared/services/KeyBoardCode';

@Component({
  selector: 'app-account-group',
  templateUrl: './account-group.component.html',
  styleUrls: ['./account-group.component.css']
})
export class AccountGroupComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendgroup:string;
  @Output() event=new EventEmitter<any>();
  acgrpForm: FormGroup;
  type:any=['Primary','SubGroup'];
  activeindex=-1;
  underlist:any[];
  aclist:any[];
  title = "Add New A/c.Group";   
  isShow=false;
  isdivShow=true;
  ischildshow=false;
  isparentshow=true;
  iskitty=false;
  isdel=false;
  isnew=true;
  isunder=false;
  keyword1='uname';
  keyword2='kname';
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private myService: AcgroupService,
    private sharedser: SharedserviceService,
    private _accmastservice:AccmastService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];
  
    retData: any[];  
    filterrec:any[];
    
    count: number = 1;
    
    searchText = '';
    mess='';
    retunit='';
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      console.log(event);
  
      if (event.keyCode ===KEY_CODE.ESCAPE) {
        this.close();
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
       // alert(JSON.stringify(res));
      });    
      err => {
        console.log(err);
      }
    }
    isValidInput(gname): boolean {
      return this.acgrpForm.controls[gname].invalid &&
        (this.acgrpForm.controls[gname].dirty || this.acgrpForm.controls[gname].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.acgrpForm.get(field).errors && this.acgrpForm.get(field).touched ||
      this.acgrpForm.get(field).untouched &&
      this.formSubmitted && this.acgrpForm.get(field).errors
    );
  }
loadgroup()
{
  this.myService.Records().subscribe(res=>
    {     
      this.underlist = [];   
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
       this.underlist.push({
        uid:res[i]["GROUPID"],
        uname:res[i]["GNAME"]
       });
      }  
    });

    
}
loadcname()
{
  this._accmastservice.Records().subscribe(res=>
    {
      //alert(JSON.stringify(res));
      this.aclist = [];   
      for (let i = 0; i < res.length; i++) {
        //alert(JSON.stringify(res));     
       this.aclist.push({
        cid:res[i]["ACNO"],
        kname:res[i]["CNAME"]
       });
      }  
    });

    
}


  ngOnInit(): void {    
    this.acgrpForm = this.fb.group({
      groupid:[0],
      gname : [,Validators.required],
      underid : [0],
      under:[''],
      grtype:['NA'],
      obal:['N'],
      del:[''],
      bbal:[1],
      sale:['N'],
      purchase:['N'],
      issue:['N'],
      sno:[0],
      kprefix:[],
      kmonths:[0],
      kinstall:[0],
      ktype:[1],
      kdueday:[0],
      kseriesid:[0],
      active:[''],
      side:[1],
      address:['N'],
      kgraceday:[0],
      seriesid:[0],
      trnbal:['1'],
      trndet:['N'],
      kinc:[0],
      kiacno:[0],
      kdrawday:[0],
      kdrawdayon:[''],
      kincto:[0],
      kincon:[0],
      credit:['N'],
      mkitty:[''],
      agent:[''],
      krefby:[0],
      retail:['N'],
      fine1:[0],
      fine2:[0],
      amount:[0],
      cf:[0],
      kincamt:[0],
      kittyins:[0],
      gmtype:[''],
      dispunder:[0],
      gside:[''],
      drawins:[0],
      refamount:[0],
      ratebook:[0],
      kdrawtime:[''],
      kminstall:[0],
      tallygrp:[''],
      refpost:[0],
      crdays:[0],
      crfine1:[0],
      crfine2:[0],
      cramt:[0],
      disled:['N'],
      mcard:['N'],
      salacno:[0],
      pfrom:[0],
      pto:[0],
      rbookday:[0],
      sendsms:['N'],
      amount2:[0],
      balotp:[0],
      pcredit:[0],
      kreclimit:[0],
      saudagst:[0],
      resmobile:[0],
      postpone:[0],
      kcname: [''],
      ttype: [''],
      ksdate: ['0000-00-00'],
      selectSet:[0]
      

    });
    if(this.sdivs ==true)
    {
      
      this.acgrpForm.patchValue({
        gname:this.sendgroup
     });
      this.isdivShow=false;
      this.isShow=true;
    }     
    else
    {
      this.LoadRecords();       
    }
    this.loadgroup();
    this.loadcname();
  }
  selectEvent(item) {
    if(isNaN(item["uid"]))
    {
      //item["id"]=this.acgrpForm.value.underid;
    }     
    this.acgrpForm.patchValue({      
      underid:item["uid"],
      under:item["uname"]
    }); 
  }
  selectEvent2(item) {
    if(isNaN(item["cid"]))
    {
      //item["id"]=this.acgrpForm.value.underid;
    }     
    this.acgrpForm.patchValue({      
      kiacno:item["cid"],
      kcname:item["kname"]
    }); 
  }
  toggleDisplay() {
    if(this.sdivs ==true)
    {      
      this.event.emit("");
    }
    else
    {
      this.isShow = !this.isShow;
      this.isdivShow=!this.isdivShow;
      this.isnew=!this.isnew;
      if(this.isdivShow==true)
      {
        this.isdel=false;
     // this.colour=new Colour();
      //this.initialValue='';
      
      this.acgrpForm.reset();
      this.title='Submit';
      this.activeindex=-1;
      }
    }
  }
  childDisplay()
  {    
    this.ischildshow=!this.ischildshow;
    this.isparentshow=!this.isparentshow;     
  }
  Search()
  {
    if(this.searchText=="")
    {      
      this.ngOnInit();
    }
    else
    {      
      this.filterrec=this.records.filter(x => x.GNAME.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    //alert(this.acgrpForm.value.kprefix);
    this.formSubmitted = true;
    if (this.acgrpForm.valid) 
    { 
    let model = {
      gname: this.acgrpForm.value.gname==null?"":this.acgrpForm.value.gname,
      underid:this.acgrpForm.value.underid==null?0:this.acgrpForm.value.underid,
      side:this.acgrpForm.value.side==null?0:this.acgrpForm.value.side,
      grtype:this.acgrpForm.value.grtype==null?"":this.acgrpForm.value.grtype,
      bbal:this.acgrpForm.value.bbal==null?0:this.acgrpForm.value.bbal,
      sale:this.acgrpForm.value.sale==null?"":this.acgrpForm.value.sale,
      address:this.acgrpForm.value.address==null?"":this.acgrpForm.value.address,
      purchase:this.acgrpForm.value.purchase==null?"":this.acgrpForm.value.purchase,
      trnbal:this.acgrpForm.value.trnbal==null?0:this.acgrpForm.value.trnbal,
      obal:this.acgrpForm.value.obal==null?"":this.acgrpForm.value.obal,
      trndet:this.acgrpForm.value.trndet==null?"":this.acgrpForm.value.trndet,
      issue:this.acgrpForm.value.issue==null?"":this.acgrpForm.value.issue,
      credit:this.acgrpForm.value.credit==null?"":this.acgrpForm.value.credit,
      retail:this.acgrpForm.value.retail==null?"":this.acgrpForm.value.retail,
      cf:this.acgrpForm.value.cf==true?1:0,
      disled:this.acgrpForm.value.disled==null?"":this.acgrpForm.value.disled,
      balotp:this.acgrpForm.value.balotp==true?1:0,
      pcredit:this.acgrpForm.value.pcredit==null?0:this.acgrpForm.value.pcredit,
      resmobile:this.acgrpForm.value.resmobile==true?1:0,
      sendsms:this.acgrpForm.value.sendsms==null?"":this.acgrpForm.value.sendsms,
      mcard:this.acgrpForm.value.mcard==null?"":this.acgrpForm.value.mcard,
      pfrom:this.acgrpForm.value.pfrom==null?0:this.acgrpForm.value.pfrom,
      pto:this.acgrpForm.value.pto==null?0:this.acgrpForm.value.pto,
      ktype:this.acgrpForm.value.ktype==null?0:this.acgrpForm.value.ktype,
      kprefix:this.acgrpForm.value.kprefix==null?"":this.acgrpForm.value.kprefix,
      kmonths:this.acgrpForm.value.kmonths==null?0:this.acgrpForm.value.kmonths,
      kinstall:this.acgrpForm.value.kinstall==null?0:this.acgrpForm.value.kinstall,
      kittyins:this.acgrpForm.value.kittyins==null?0:this.acgrpForm.value.kittyins,
      mkitty:this.acgrpForm.value.mkitty==null?"":this.acgrpForm.value.mkitty,
      kminstall:this.acgrpForm.value.kminstall==null?0:this.acgrpForm.value.kminstall,
      kreclimit:this.acgrpForm.value.kreclimit==null?0:this.acgrpForm.value.kreclimit,
      ratebook:this.acgrpForm.value.ratebook==null?0:this.acgrpForm.value.ratebook,
      kdrawday:this.acgrpForm.value.kdrawday==null?0:this.acgrpForm.value.kdrawday,
      kdrawdayon:this.acgrpForm.value.kdrawdayon==null?"":this.acgrpForm.value.kdrawdayon,
      kdrawtime:this.acgrpForm.value.kdrawtime==null?"":this.acgrpForm.value.kdrawtime,
      drawins:this.acgrpForm.value.drawins==null?0:this.acgrpForm.value.drawins,
      krefby:this.acgrpForm.value.krefby==null?0:this.acgrpForm.value.krefby,
      refamount:this.acgrpForm.value.refamount==null?0:this.acgrpForm.value.refamount,
      refpost:this.acgrpForm.value.refpost==null?0:this.acgrpForm.value.refpost,
      rbookday:this.acgrpForm.value.rbookday==null?0:this.acgrpForm.value.rbookday,
      kinc:this.acgrpForm.value.kinc==null?0:this.acgrpForm.value.kinc,
      kincamt:this.acgrpForm.value.kincamt==null?0:this.acgrpForm.value.kincamt,
      kincto:this.acgrpForm.value.kincto==null?0:this.acgrpForm.value.kincto,
      kincon:this.acgrpForm.value.kincon==null?0:this.acgrpForm.value.kincon,
      kiacno:this.acgrpForm.value.kiacno==null?0:this.acgrpForm.value.kiacno,
      kgraceday:this.acgrpForm.value.kgraceday==null?0:this.acgrpForm.value.kgraceday,
      kdueday:this.acgrpForm.value.kdueday==null?0:this.acgrpForm.value.kdueday,
      groupid:this.acgrpForm.value.groupid==null?0:this.acgrpForm.value.groupid,
      ksdate:this.acgrpForm.value.ksdate
      
     }
     
     if(this.activeindex==-1)
     {    
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["groupid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("A/c Group Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();     
            this.loadgroup();    
            this.loadcname();
            //form.submitted=false;
            this.toggleDisplay();
            this.count = 1;    
            }
         }
       })   
     }     
     else
     { 
     
         this.myService.Update(model).subscribe(data=>{
           
          if(isNaN(data["groupid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("A/c Group Updated Successfully...",this.alertOptions);
         // alert("Updated Successfully");          
          this.LoadRecords();     
          this.loadgroup();    
          this.loadcname();
          form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
    }
  }
  delacgrp:any;
  edit(record,index)
  {     
    this.delacgrp=record;
    //this.isaccount=true;
    //this.isadditional=true;
    //this.isstock=true;
    //this.isgst=true;
    this.toggleDisplay(); 
    this.isdel=true;    
    this.acgrpForm.value.kcname=record.kcname;
   // this.tunit=record.unit;
    //this.tstamp=record.stamp1;
    this.acgrpForm.patchValue({
      gname:record.GNAME,
      underid:record.UNDERID,
      side:record.SIDE,
      grtype:record.GRTYPE,
      bbal:record.BBAL,
      sale:record.SALE,
      purchase:record.PURCHASE,
      trnbal:record.TRNBAL,
      issue:record.ISSUE,
      credit:record.CREDIT,
      retail:record.RETAIL,
      cf:record.CF,
      disled:record.DISLED,
      balotp:record.BALOTP,
      pcredit:record.PCREDIT,
      resmobile:record.resmobile,
      sendsms:record.SENDSMS,
      mcard:record.MCARD,
      pfrom:record.PFROM,
      pto:record.PTO ,
      obal:record.OBAL,
      address:record.ADDRESS,
      ktype:record.KTYPE,
      kprefix:record.KPREFIX,
      ksdate:record.KSDATE,
      kmonths:record.KMONTHS,
      kinstall:record.KINSTALL,
      kgraceday:record.KGRACEDAY,
      kdueday:record.KDUEDAY,
      kittyins:record.KITTYINS,
      mkitty:record.MKITTY,
      kminstall:record.KMINSTALL,
      kreclimit:record.kreclimit,
      ratebook:record.RATEBOOK,
      kdrawday:record.KDRAWDAY,
      kdrawdayon:record.KDRAWDAYON,
      kdrawtime:record.KDRAWTIME,
      drawins:record.DRAWINS,
      krefby:record.KREFBY,
      refamount:record.REFAMOUNT,
      refpost:record.REFPOST,
      rbookday:record.RBOOKDAY,
      kinc:record.KINC,
      kincamt:record.KINCAMT,
      kincto:record.KINCTO,
      kincon:record.KINCON,
      kiacno:record.KIACNO,
      under:record.under,
      trndet:record.TRNDET,
      kcname:record.kcname,
      groupid:record.GROUPID
          
    });   
        
     if(record.underid==0)
    {
      this.acgrpForm.patchValue({
        ttype:'Primary',
      })
      
    }
    else{
      this.acgrpForm.patchValue({
      ttype:'subgroup',
      under:record.under      
      });
      this.isunder=true;
      
    }
   // alert(this.acgrpForm.value.ttype);
   // alert(JSON.stringify(this.acgrpForm.getRawValue()));
     
    
    this.activeindex=1;
    
  }
  
  isViewkitty(event: any) {
   // alert(event.target.value);
    let value=event.target.value;     
    if(value=="Kitty")
    {    
      this.iskitty=true;      
    }
    else{      
     this.iskitty=false;     
    }
    this.isviewdraw(1);
 }
  isadd = false;
  selectNValue = true;
  selectYValue = false;
 isviewadd(event:any)
 {  
   let value = event.target.value;
  // alert(value);
   if(value==1)
   {
     this.isadd=true;
   }
   else
   {
     this.isadd=false;
   }
 }
 isdraw=false;
 isviewdraw(event:any){
   
  let value=event.target.value;  
  if(value==1)
  {
    this.isdraw=false;
  }
  else
  {
    this.isdraw=true;
  }
  
 }
 

 

 
 close()
 {
   
   this.isadd = false;
   this.iskitty=false;
  //  this.selectNValue = true;
  //  this.selectYValue = false;
  //  this.acgrpForm.patchValue({"selectSet":0});
   
  
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
  Delete() {
    try
    {      
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {      
      let model = {
        groupid:this.acgrpForm.value.groupid        
       }  
       this.myService.Delete(model).subscribe(data=>{           
        if(isNaN(data["groupid"]))
       {
       }     
         else
         {
          this.alertService.warn("A/c Group Deleted Successfully...",this.alertOptions);
          //alert("Deleted");
          this.LoadRecords(); 
          this.toggleDisplay();
          this.count = 1;
         }
      });      
    }
    else {
      
    }
  }
  catch(error)
  {
alert(error);
  }
  }
  pageChanged(event: PageChangedEvent): void {
    this.count = (event.page-1)*event.itemsPerPage+1;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.retData = this.filterrec.slice(startItem, endItem);
  } 
}
