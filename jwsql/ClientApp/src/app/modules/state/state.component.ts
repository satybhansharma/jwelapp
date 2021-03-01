import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { StateService } from './state.service';
import { Form, FormBuilder, FormGroup,MaxLengthValidator,Validators } from '@angular/forms';
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
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendstate:string;
  @Output() event=new EventEmitter<any>();
  stateForm: FormGroup;  
 


activeindex=-1;
  title = "Add New State";   
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
  constructor(private myService: StateService,
    private sharedser: SharedserviceService,
    //private _unitservice:CategoryMasterService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];
  
    retData: any[]; 
    filterrec:any[] ;
    
    count: number = 1;
    
    searchText = '';
    mess='';
    retstate='';
    
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
    isValidInput(state1): boolean {
      return this.stateForm.controls[state1].invalid &&
        (this.stateForm.controls[state1].dirty || this.stateForm.controls[state1].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.stateForm.get(field).errors && this.stateForm.get(field).touched ||
      this.stateForm.get(field).untouched &&
      this.formSubmitted && this.stateForm.get(field).errors
    );
  }

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      stateid:[0],
      state1 : ['',Validators.required],
      stcode : [''],        
      country:[''],      
    });
    if(this.sdivs ==true)
    {
      alert(this.sendstate);
     this.stateForm.patchValue({
        state1:this.sendstate
     });
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }   
    
    this.LoadRecords();    
    //this.loadItemList(); 
 
 
  
  }
  toggleDisplay() {
    this.formSubmitted=false;
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
      
      this.stateForm.reset();
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
      this.filterrec=this.records.filter(x => x.state1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit()
  {   
    
    this.formSubmitted = true;
     if (this.stateForm.valid) 
     {  
       alert(JSON.stringify(this.stateForm.getRawValue()));
      let model = {
        state1: this.stateForm.value.state1==null?"":this.stateForm.value.state1,
        stcode: this.stateForm.value.stcode==null?"":this.stateForm.value.stcode,
        stateid: this.stateForm.value.stateid==null?0:this.stateForm.value.stateid,
        country:this.stateForm.value.country==null?"":this.stateForm.value.country
      }
    
      if(this.activeindex==-1)
      {       
        this.myService.Create(model).subscribe(data => {
          alert(2);
          if(isNaN(data["stateid"]))
          {
            alert(data.message);
          }
          else
          {
            this.alertService.success("State Added Successfully...",this.alertOptions);
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
        //alert(3);
      // alert(JSON.stringify(data));
          this.myService.Update(model).subscribe(data=>{
            if(isNaN(data["stateid"]))
          {
            alert(data.message);
          }
          else
          {
            this.alertService.success("State Updated Successfully...",this.alertOptions);
            //alert("Updated Successfully");          
            this.LoadRecords();         
            //form.submitted=false;
            this.toggleDisplay();  
            this.count = 1;        
          }       
          })
      }
    }
    
  }
  delstate:any;
  edit(record,index)
  { 
    this.delstate=record;
    this.toggleDisplay(); 
    this.stateForm.patchValue({
      state1:record.state1,
      stcode:record.stcode,
      stateid:record.stateid,
      country:record.country
    });   
    
     
    this.isdel=!this.isdel;
    this.activeindex=index;
    
  }
  Delete() {
    
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      let model = {
        stateid:this.stateForm.value.stateid        
       } 

      this.myService.Delete(model).subscribe(data=>{       
        if(isNaN(data["stateid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("State Deleted Successfully...",this.alertOptions);
          //alert("Deleted Successfully");
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
