import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS  } from '@angular/core';
import { ShapeService} from '../shape/shape.service';
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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendshape:string;
  @Output() event=new EventEmitter<any>();
  shapeForm: FormGroup;
  shape: any;
 
  messd
  /* recieveMessage(data){        
    this.loadUnitList();    
    this.initialValue=data;
    //this.records=$event;    
    
  }
 */

activeindex=-1;
  title = "Add New Shape";   
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
  constructor(private myService: ShapeService,
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
    isValidInput(shape1): boolean {
      return this.shapeForm.controls[shape1].invalid &&
        (this.shapeForm.controls[shape1].dirty || this.shapeForm.controls[shape1].touched);
    }
    formSubmitted: boolean;
    isFieldValid(field: string) {
    return (
      this.shapeForm.get(field).errors && this.shapeForm.get(field).touched ||
      this.shapeForm.get(field).untouched &&
      this.formSubmitted && this.shapeForm.get(field).errors
    );
    }

  ngOnInit(): void {
    this.shapeForm = this.fb.group({
      shapeid:[0],
      shape1 : [,Validators.required],
      remarks : [],        
      
      
    });
    if(this.sdivs ==true)
    {
      this.shapeForm.patchValue({
        shape1: this.sendshape
      });
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }     
    
    this.LoadRecords();    
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
      
      this.shapeForm.reset();
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
      this.filterrec=this.records.filter(x => x.shape1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    this.formSubmitted=true;
    if(this.shapeForm.valid)
  {

 
  
    let model = {
      shape1: this.shapeForm.value.shape1==null?"":this.shapeForm.value.shape1,
      remarks: this.shapeForm.value.remarks==null?"":this.shapeForm.value.remarks,
      shapeid: this.shapeForm.value.shapeid==null?0:this.shapeForm.value.shapeid,
      
     }
     if(this.activeindex==-1)
     {    
     // alert(JSON.stringify(model));   
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["shapeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Shape Added Successfully...",this.alertOptions);
           // alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();         
            form.submitted=false;
            this.toggleDisplay();
            this.count = 1;    
            }
         }
       })   
     }     
     else
     { 
      //alert(JSON.stringify(model)); 
         this.myService.Update(model).subscribe(data=>{
           
          if(isNaN(data["shapeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Shape Updated Successfully...",this.alertOptions);
          //alert("Updated Successfully");          
          this.LoadRecords();         
          form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })

     }
    }
  }
  edit(record,index)
  { 
    this.shape = record;
    this.toggleDisplay(); 
    this.shapeForm.patchValue({
      shape1:record.shape1,
      remarks:record.remarks,
      shapeid:record.shapeid,
      
    });   
   // alert(JSON.stringify(this.shapeForm.getRawValue()));
     
    this.isdel=!this.isdel;
    this.activeindex=1;
    
  }
  Delete(form) {
    let model = {
      shape1: this.shapeForm.value.shape1,
      remarks: this.shapeForm.value.remarks,
      shapeid: this.shapeForm.value.shapeid,
      
       }
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.shape).subscribe(data=>{       
        if(isNaN(data["shapeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Shape Deleted Successfully...",this.alertOptions);
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
