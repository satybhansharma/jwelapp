import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import {SundryService} from './sundry.service';
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
import { data, event } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { AccmastService } from '../accmast/accmast.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sundries',
  templateUrl: './sundries.component.html',
  styleUrls: ['./sundries.component.css']
})
export class SundriesComponent implements OnInit {
  @Input() sdivs: boolean;
 // @Input() sendsize:string;
 // @Input() secondt: string;
  @Output() event=new EventEmitter<any>();
  sundForm:FormGroup;
  recieveMessage(data){        
   // this.loadItemList();    
    this.initialValue=data;
    //this.records=$event;
  }
  size: any;
  activeindex=-1;
  title = "Size";   
  isShow=false;
  isdivShow=true;
  ischildshow=false;
  isparentshow=true;
  isadj:boolean=false;
  isoth:boolean=false;
  isround:boolean=false;
  isaddset:boolean=true;
 // isitemshow=false;
  isdel=false;
  isnew=true;
  taclist='';
  aclist = [];
  initialValue='';
  keyword2 = 'name';  
  keyword3='name';
  //ino = 0;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private myService: SundryService,
             private _accmastservice:AccmastService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];  
    retData: any[];    
    filterrec:any[];  
    count: number = 1;    
    searchText = '';
   // retunit='';


  ngOnInit(): void {
    this.sundForm = this.fb.group({
      sundryid:[0],
      sundname : ['',Validators.required],
      pname : [,],   
      vtype:[],
      defvalue:[0.00],
      adjsale:[0],
      adjacno:[0],
      addless:[1],
      fed:[1],
      fedp:[0] ,
      sno:[0],
      tax:[0],
      roff:[0],
      roffval:[0],
      defamt:[0],
      otherac:[0],
      othacno:[0],
      sdate:['0000-00-00'],
      edate:['0000-00-00'],
      ratediff:[0],
      agent:[0],
      othchg:[0],
      mpoint:[0],
      roundoff:[0],
      adjcname:[],
      othcname:[],
      sndtype:[],
      

      
    });
   // this.sundForm.controls['adjcname'].disable();
    //this.sundForm.controls['othcname'].disable();
    //this.sundForm.controls['roffval'].disable();
    if(this.sdivs ==true)
    {
      
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }     
    
    this.LoadRecords();   
    this.loadcname(); 
    //this.loadItemList(); 
  }
  LoadRecords() {         
      
    this.records = [];
    this.retData=[];
    this.filterrec=[];
    this.myService.Records().subscribe(res => {
      this.records = res;
      this.filterrec=res;      
      this.retData = this.records.slice(0, 8);
       
    });    
    err => {
      console.log(err);
    }
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
        id:res[i]["ACNO"],
        name:res[i]["CNAME"]
       });
      }  
    });

    
}
  selectEvent2(item) {
    if(isNaN(item["id"]))
    {
      //item["id"]=this.acgrpForm.value.underid;
    }     
    this.sundForm.patchValue({      
      adjacno:item["id"],
      name:item["name"]
    }); 
    alert(item["id"]);
  }
  selectEvent3(item) {
    if(isNaN(item["id"]))
    {
      //item["id"]=this.acgrpForm.value.underid;
    }     
    this.sundForm.patchValue({      
      othacno:item["id"],
      name:item["name"]
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
      this.sundForm.reset();      
      this.activeindex=-1;
      }
    }
  }
  childDisplay(show:any)
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
      this.filterrec=this.records.filter(x => x.SUNDNAME.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,8);
    }
  }

  onsubmit(form)
  {
    alert(this.sundForm.value.othacno);
    let model = {
      sundname: this.sundForm.value.sundname,
      pname: this.sundForm.value.pname==null?"":this.sundForm.value.pname,
      sundryid: this.sundForm.value.sundryid==null?0:this.sundForm.value.sundryid,
      vtype:this.sundForm.value.vtype==null?"":this.sundForm.value.vtype ,
      sno:this.sundForm.value.sno==null?0:this.sundForm.value.sno,
      defvalue:this.sundForm.value.defvalue==null?0:this.sundForm.value.defvalue,
      adjsale:this.sundForm.value.adjsale==null?0:this.sundForm.value.adjsale,
      adjacno:this.sundForm.value.adjacno==null?0:this.sundForm.value.adjacno,
      addless:this.sundForm.value.addless==null?0:this.sundForm.value.addless,
      fed:this.sundForm.value.fed==null?0:this.sundForm.value.fed,
      fedp:this.sundForm.value.fedp==null?0:this.sundForm.value.fedp,
      roff:this.sundForm.value.roff==null?0:this.sundForm.value.roff,
      roffval:this.sundForm.value.roffval==null?0:this.sundForm.value.roffval,
      defamt:this.sundForm.value.defamt==null?0:this.sundForm.value.defamt,
      otherac:this.sundForm.value.otherac==null?0:this.sundForm.value.otherac,
      othacno:this.sundForm.value.othacno==null?0:this.sundForm.value.othacno,
      ratediff:this.sundForm.value.ratediff==null?0:this.sundForm.value.ratediff,
      agent:this.sundForm.value.agent==null?0:this.sundForm.value.agent,
      othchg:this.sundForm.value.othchg==null?0:this.sundForm.value.othchg,
      mpoint:this.sundForm.value.mpoint==null?0:this.sundForm.value.mpoint,
      roundoff:this.sundForm.value.roundoff==null?0:this.sundForm.value.roundoff,
       //sdate:this.sundForm.value.sdate=='0000-00-00'?'0001-01-01':this.sundForm.value.sdate,
       //edate:this.sundForm.value.edate==null?'0000-00-00':this.sundForm.value.edate
      
           
    }

     
     if(this.activeindex==-1)
     {       
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["sundryid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Sundry Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();      
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
          if(isNaN(data["sundryid"]))
         {
           alert(data.message);
         }
         else
          {

            this.alertService.success("Location Updated Successfully...",this.alertOptions);
            //alert("Updated Successfully");
                  
          this.LoadRecords();         
          this.loadcname();
          //form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
  }
  
 close()
 {
   
   this.isaddset = true; 
  
  
 }
  isViewaddset(event:any){
    let value=event.target.value;
    if(value==0)
    {
    
      this.isaddset=true;
      
    }
    else{
      
      this.isaddset=false;
     

    }
  }
  

  isviewadj(event:any){
     let value=event.target.value;
     if(value==0)
     {
      this.isadj=false;
     }
     else{
      this.isadj=true;
     }
      
     }
    
     isviewround(event:any){
       let value=event.target.value;
       if(value==0)
       {
        this.isround=false;
       }
       else{
        this.isround=true;
       }
        
      }
    isviewoth(event:any){
       let value=event.target.value;
       if(value==0)
       {
        this.isoth=false;
       }
       else{
        this.isoth=true;
       }
        
       }
  pageChanged(event: PageChangedEvent): void {
    this.count = (event.page-1)*event.itemsPerPage+1;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.retData = this.filterrec.slice(startItem, endItem);
  } 

  AccType(event:any)
  {
    this.sundForm.patchValue({
      "ratediff":"0",
      "othchg":"0",
      "agent":"0",
      "mpoint":"0",
      "roundoff":"0",
      "coupon":"0"
     });
    switch(event.target.value)
    {
     case '3':
       this.sundForm.patchValue({
         "ratediff":"1"
        });
        break;
     case '2': this.sundForm.patchValue({
       "othchg":"1"
      });
      break;
     case '4': this.sundForm.patchValue({"agent":"1"});
     break;
     case '5': 
     this.sundForm.patchValue({"mpoint":"1"});
     //alert(this.sundForm.value.mpoint);
     break;
     case '6':this.sundForm.patchValue({"roundoff":"1"});
     break;
     case '7':this.sundForm.patchValue({"mpoint":"2"});
     //alert(this.sundForm.value.mpoint);
     break;
    }
    //alert();
    //alert(this.sundForm.value.othchg);
  }
  delsnd:any;
  edit(record,index)
  {     
    this.delsnd=record;
    this.toggleDisplay(); 
    this.isdel=true;    
    //this.sundForm.value.kcname=record.kcname;
   // this.tunit=record.unit;
    //this.tstamp=record.stamp1;
    this.sundForm.patchValue({
      sundname:record.SUNDNAME,
      sundryid:record.SUNDRYID,
      pname:record.PNAME,
      vtype:record.VTYPE,
      sno:record.SNO,
      defvalue:record.DEFVALUE,
      adjsale:record.ADJSALE,
      adjacno:record.ADJACNO,
      addless:record.ADDLESS,
      fed:record.FED,
      fedp:record.FEDP,
      roff:record.ROFF,
      roffval:record.ROFFVAL,
      defamt:record.DEFAMT,
      otherac:record.OTHERAC,
      othacno:record.OTHACNO,
      ratediff:record.RATEDIFF,
      agent:record.AGENT,
      othchg:record.OTHCHG,
      mpoint:record.MPOINT,
      roundoff:record.ROUNDOFF,
      adjcname:record.adjcname,
      othcname:record.othcname,
      
          
    });   
        
    if(record.RATEDIFF==1)
    {
      this.sundForm.patchValue({
        sndtype:'3',
        
      });
      //alert(1);
    }
      else if(record.OTHCHG==1)
      {
        this.sundForm.patchValue({
          sndtype:'2'
        });
       // alert(2);
      }
      else if(record.AGENT==1)
      {
        this.sundForm.patchValue({
          sndtype:'4'
        });
        //alert(3);
      }
      else if(record.ROUNDOFF==1)
      {
        this.sundForm.patchValue({
          sndtype:'6'
        });
        //alert(4);
      }
      else if(record.MPOINT==2)
      {
        this.sundForm.patchValue({
          sndtype:'7'
        });
       // alert(5);
      }
    
  
      
     
      
    


   // alert(this.acgrpForm.value.ttype);
   // alert(JSON.stringify(this.acgrpForm.getRawValue()));
     
    
    this.activeindex=1;
    
  }
  Delete() {
    try
    {      
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {      
      let model = {
        sundryid:this.sundForm.value.sundryid        
       }  
       this.myService.Delete(model).subscribe(data=>{           
        if(isNaN(data["sundryid"]))
       {
       }     
         else
         {
          this.alertService.warn("Sundry Deleted Successfully...",this.alertOptions);
         // alert("Deleted");
          this.LoadRecords(); 
          this.loadcname();
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
}
