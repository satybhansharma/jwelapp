import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
//import { ShapeService} from '../shape/shape.service';
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
import { GcodeService } from './gcode.service';
@Component({
  selector: 'app-gcode',
  templateUrl: './gcode.component.html',
  styleUrls: ['./gcode.component.css']
})
export class GcodeComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendgcode:string;
  @Output() event=new EventEmitter<any>();
  gcodeForm: FormGroup;
  
 
  messd
  /* recieveMessage(data){        
    this.loadUnitList();    
    this.initialValue=data;
    //this.records=$event;    
    
  }
 */

activeindex=-1;
  title = "Add New G.code";   
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
  constructor(private myService: GcodeService,
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
    isValidInput(gcode1): boolean {
      return this.gcodeForm.controls[gcode1].invalid &&
        (this.gcodeForm.controls[gcode1].dirty || this.gcodeForm.controls[gcode1].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.gcodeForm.get(field).errors && this.gcodeForm.get(field).touched ||
      this.gcodeForm.get(field).untouched &&
      this.formSubmitted && this.gcodeForm.get(field).errors
    );
  }

  ngOnInit(): void {
    this.gcodeForm = this.fb.group({
      gcodeid:[0],
      gcode1 : [,Validators.required],
      remarks : [],        
      
      
    });
    if(this.sdivs ==true)
    {
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
      this.gcodeForm.patchValue({
        gcode1:this.sendgcode
      });
    }     
    else
    {
      this.LoadRecords();    
    }
    //this.loadItemList(); 
 
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
      
      this.gcodeForm.reset();
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
      this.filterrec=this.records.filter(x => x.gcode1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
  this.formSubmitted=true;
  if(this.gcodeForm.valid)
  {

  
    let model = {
      gcode1: this.gcodeForm.value.gcode1==null?"":this.gcodeForm.value.gcode1,
      remarks: this.gcodeForm.value.remarks==null?"":this.gcodeForm.value.remarks,
      gcodeid: this.gcodeForm.value.gcodeid==null?0:this.gcodeForm.value.gcodeid,
      
     }
     if(this.activeindex==-1)
     {      
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["gcodeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("G.Code Added Successfully...",this.alertOptions);
           // alert("Saved Successfully");  
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
         this.myService.Update(model).subscribe(data=>{
           
          if(isNaN(data["gcodeid"]))
          {

           alert(data.message);
         }
         else
         {
          this.alertService.success("G.Code Added Successfully...",this.alertOptions);
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
  edit(record,index)
  { 
    
    this.toggleDisplay(); 
    this.gcodeForm.patchValue({
      gcode1:record.gcode1,
      remarks:record.remarks,
      gcodeid:record.gcodeid,
      
    });   
     
    this.isdel=!this.isdel;
    this.activeindex=1;
    
  }
  Delete(form) {
    let model = {
      gcode1: this.gcodeForm.value.gcode1,
      remarks: this.gcodeForm.value.remarks,
      gcodeid: this.gcodeForm.value.gcodeid,
      
       }
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(model).subscribe(data=>{       
        if(isNaN(data["gcodeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Stamp Deleted Successfully...",this.alertOptions);
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
    this.retData = this.records.slice(startItem, endItem);
  } 

}
