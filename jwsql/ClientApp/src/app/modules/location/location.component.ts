import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { LocationService} from './location.service';
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
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input()sendloc:string;
  @Output() event=new EventEmitter<any>();
  locForm: FormGroup;
  activeindex=-1;
  title = "Add New Location";   
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
  constructor(private myService: LocationService,
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
    isValidInput(location1): boolean {
      return this.locForm.controls[location1].invalid &&
        (this.locForm.controls[location1].dirty || this.locForm.controls[location1].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.locForm.get(field).errors && this.locForm.get(field).touched ||
      this.locForm.get(field).untouched &&
      this.formSubmitted && this.locForm.get(field).errors
    );
  }
  ngOnInit(): void {
    this.locForm = this.fb.group({
      locationid:[0],
      location1 : [,Validators.required],
           
      
      
    });
    if(this.sdivs ==true)
    {
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
       this.locForm.patchValue({
       location1:this.sendloc
      });
    }     
    else
    {
    this.LoadRecords();    
    }
    
 
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
      
      this.locForm.reset();
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
      this.filterrec=this.records.filter(x => x.location1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    this.formSubmitted=true;
    if (this.locForm.valid)
    {

   
    let model = {
      location1: this.locForm.value.location1==null?"":this.locForm.value.location1,
      locationid: this.locForm.value.locationid==null?0:this.locForm.value.locationid,
      
     }
     if(this.activeindex==-1)
     {      
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["locationid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Location Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");  
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
          if(isNaN(data["locationid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Location Updated Successfully...",this.alertOptions);
         // alert("Updated Successfully");          
          this.LoadRecords();         
          //form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
    }
  }
  delloc:any;
  edit(record,index)
  { 
    this.delloc=record;
    this.toggleDisplay(); 
    this.isdel=true;
    this.locForm.patchValue({
      location1:record.location1,
      locationid:record.locationid,

    });   
    
     
    
    this.activeindex=index;
    
  }
  Delete() {
    
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.delloc).subscribe(data=>{       
        if(isNaN(data["locationid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Location Deleted Successfully...",this.alertOptions);
         // alert("Deleted Successfully");
          this.LoadRecords();                   
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
}
