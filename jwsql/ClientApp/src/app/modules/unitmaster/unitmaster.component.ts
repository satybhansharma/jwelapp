import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { UnitmasterService } from './unitmaster.service';
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
  selector: 'app-unitmaster',
  templateUrl: './unitmaster.component.html',
  styleUrls: ['./unitmaster.component.css']
})
export class UnitmasterComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendunit:string;
  @Output() event=new EventEmitter<any>();
  unitForm: FormGroup;  
 
  messd
  /* recieveMessage(data){        
    this.loadUnitList();    
    this.initialValue=data;
    //this.records=$event;    
    
  }
 */

activeindex=-1;
  title = "Add New Unit";   
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
  constructor(private myService: UnitmasterService,
    private sharedser: SharedserviceService,
    //private _unitservice:CategoryMasterService,
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
    isValidInput(unit): boolean {
      return this.unitForm.controls[unit].invalid &&
        (this.unitForm.controls[unit].dirty || this.unitForm.controls[unit].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.unitForm.get(field).errors && this.unitForm.get(field).touched ||
      this.unitForm.get(field).untouched &&
      this.formSubmitted && this.unitForm.get(field).errors
    );
  }
  ngOnInit(): void {
    this.unitForm = this.fb.group({
      unitid:[0],
      unit : ['',Validators.required],
      uqc : [],        
      decimal:[0],      
    });
    if(this.sdivs ==true)
    {   
      this.unitForm.patchValue({
        unit:this.sendunit
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
      
      this.unitForm.reset();
      this.title='Submit';
      this.activeindex=-1;
      }
    }
  }
//   changeFocus() {
//     window.location.hash = 'unit';
// }
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
      this.filterrec=this.records.filter(x => x.unit.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit()
  {   
    this.formSubmitted = true;
     if (this.unitForm.valid) 
     {  
      let model = {
        unit: this.unitForm.value.unit,
        uqc: this.unitForm.value.uqc,
        unitid: this.unitForm.value.unitid==null?0:this.unitForm.value.unitid,
        decimal:this.unitForm.value.decimal,
      }
    
      if(this.activeindex==-1)
      {       
        this.myService.Create(model).subscribe(data => {
          alert(JSON.stringify(data));
          if(isNaN(data["unitid"]))
          {
            alert(data.message);
          }
          else
          {
            //alert(JSON.stringify(data["message"]));
            this.alertService.success("Unit Added Successfully...",this.alertOptions);
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
      // alert(JSON.stringify(data));
          this.myService.Update(model).subscribe(data=>{
            if(isNaN(data["unitid"]))
          {
            alert(data.message);
          }
          else
          {
            this.alertService.success("Unit Updated Successfully...",this.alertOptions);
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
    this.unitForm.patchValue({
      unit:record.unit,
      uqc:record.uqc,
      unitid:record.unitid,
      decimal:record.decimal
    });   
    
     
    this.isdel=!this.isdel;
    this.activeindex=index;
    
  }
  Delete(form) {
    let model = {
      unit: this.unitForm.value.unit,
      uqc: this.unitForm.value.uqc,
      unitid: this.unitForm.value.unitid,
      decimal:this.unitForm.value.decimal
       }
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(model).subscribe(data=>{       
        if(isNaN(data["unitid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Unit Deleted Successfully...",this.alertOptions);
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
