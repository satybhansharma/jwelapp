import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import {CityService} from './city.service'
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
import { data, event } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendcolor: string;
  @Input()sendcity:string;
  @Output() event=new EventEmitter<any>();
  cityForm: FormGroup;
  initialValue='';
  keyword2 = 'name'; 
  ItemList2=[];
  activeindex=-1;
  title = "Add New Colour";   
  isShow=false;
  isdivShow=true;
  ischildshow=false;
  isparentshow=true;
  isdel=false;
  tstate='';
  sendstate='';
  isnew=true;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private myService:CityService,
    private sharedser: SharedserviceService,
    //private _unitservice:CategoryMasterService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];
  
    retData: any[]; 
    filterrec:any[]; 
    
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
        //alert(JSON.stringify(this.retData));
      });    
      err => {
        console.log(err);
      }
    }
     isValidInput(city1): boolean {
       return this.cityForm.controls[city1].invalid &&
         (this.cityForm.controls[city1].dirty || this.cityForm.controls[city1].touched);
   }
   formSubmitted: boolean;
   isFieldValid(field: string) {
     return (
       this.cityForm.get(field).errors && this.cityForm.get(field).touched ||
       this.cityForm.get(field).untouched &&
       this.formSubmitted && this.cityForm.get(field).errors
     );
   }
   recievestate(data:any){  
    if(data==""){
      this.tstate='';
    }
    else{    
      this.ItemList2.push({
        id: data["stateid"],
        name:data["state1"],
        country:data["country"]
      });
      this.cityForm.patchValue({  
        stateid:data["stateid"],    
        state:data["state1"],
        country:data["country"]
      });   
      this.tstate=data["state1"];
    }
    
    
    this.ischildshow=!this.ischildshow;
  }

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      cityid:[0],
      city1 : [,Validators.required],
      stateid : [0],
      pin:[],
      country:[''],
      state:['']        
      
      
    });
    if(this.sdivs ==true)
    {
      this.cityForm.patchValue({
        city1:this.sendcity
      });
      
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }     
    
    this.LoadRecords();    
    //this.loadItemList(); 
 
 
    this.loadItemList();
  }
  loadItemList() {
    this.myService.GetState().subscribe(res => {    
      this.ItemList2 = [];
      
      for (let i = 0; i < res.length; i++) {        
        this.ItemList2.push({
          id: res[i]["stateid"],
          name:res[i]["state1"],
          country:res[i]["country"]
        });
      }      
    
   })
  
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
           //this.initialValue='';
      
      this.cityForm.reset();
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
      this.filterrec=this.records.filter(x => x.CITY.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  selectEvent(event:Event) {
    if(event["id"]==-1)
    {
this.childDisplay();
    }
    else{
      this.cityForm.patchValue({      
        stateid:event["id"],
        state:event["name"],
        country:event["country"]
      }); 
    }
  
   
  }
  onsubmit(form)
  { 
    
    this.formSubmitted = true;
    if (this.cityForm.valid) 
    { 
    let model = {
      city1: this.cityForm.value.city1==null?"":this.cityForm.value.city1,
      stateid:this.cityForm.value.stateid==null?0:this.cityForm.value.stateid,
      pin:this.cityForm.value.pin==null?"":this.cityForm.value.pin,
      country:this.cityForm.value.country==null?0:this.cityForm.value.country,
      cityid: this.cityForm.value.cityid==null?0:this.cityForm.value.cityid,
      
     }
     
     if(this.activeindex==-1)
     {    
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["cityid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("City Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();     
            this.loadItemList();    
           
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
           
          if(isNaN(data["cityid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("City Updated Successfully...",this.alertOptions);
          //alert("Updated Successfully");          
          this.LoadRecords();     
          this.loadItemList();    
          
         // form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
    }
  }
  delcity:any;
  edit(record,index)
  {     
    this.delcity=record;
    //this.isaccount=true;
    //this.isadditional=true;
    //this.isstock=true;
    //this.isgst=true;
    this.toggleDisplay(); 
    this.isdel=true;    
   // this.cityForm.value.kcname=record.kcname;
    this.tstate=record.state;
    //this.tstamp=record.stamp1;
    this.cityForm.patchValue({
      city1:record.CITY,
      country:record.COUNTRY,
      pin:record.pin,
      stateid:record.stateid,
      state:record.state,
      cityid:record.CITYID
      
          
    });   
        
        // alert(JSON.stringify(this.acgrpForm.getRawValue()));
     
    
    this.activeindex=1;
    
  }
  Delete() {
    try
    {      
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {      
      let model = {
        cityid:this.cityForm.value.cityid        
       }  
       this.myService.Delete(model).subscribe(data=>{           
        if(isNaN(data["cityid"]))
       {
       }     
         else
         {
          this.alertService.warn("City Deleted Successfully...",this.alertOptions);
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
  name:string='';
sendst(e)
{
  this.name=e.target.value;
}
}
