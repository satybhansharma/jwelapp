import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { ColourService } from '../colour/colour.service';
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
import {Colour} from './colour';
import {SharedserviceService} from '../../shared/services/sharedservice.service';
import { data } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';
@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.css']
})
export class ColourComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendcolor: string;
  @Output() event=new EventEmitter<any>();
  colorForm: FormGroup;
  colour=new Colour();
 
  

activeindex=-1;
  title = "Add New Colour";   
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
  constructor(private myService: ColourService,
    private sharedser: SharedserviceService,
    //private _unitservice:CategoryMasterService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService)  { }
    records: any[];
    filterrec:any[];
  
    retData: any[];  
    
    count: number = 1;
    
    searchText = '';
    mess='';
    retunit='';
    
    LoadRecords() {         
      this.colour=new Colour();
      this.records = [];
      this.filterrec=[];
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
    isValidInput(colour1): boolean {
      return this.colorForm.controls[colour1].invalid &&
        (this.colorForm.controls[colour1].dirty || this.colorForm.controls[colour1].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.colorForm.get(field).errors && this.colorForm.get(field).touched ||
      this.colorForm.get(field).untouched &&
      this.formSubmitted && this.colorForm.get(field).errors
    );
  }

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      colourid:[0],
      colour1 : [,Validators.required],
      remarks : [],        
      
      
    });
    if(this.sdivs ==true)
    {
      this.colorForm.patchValue({
        colour1: this.sendcolor
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
      this.colour=new Colour();
      //this.initialValue='';
      
      this.colorForm.reset();
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
      this.filterrec=this.records.filter(x => x.colour1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    this.formSubmitted=true;
    if (this.colorForm.valid){

   
  
    let model = {
      colour1: this.colorForm.value.colour1==null?"":this.colorForm.value.colour1,
      remarks: this.colorForm.value.remarks==null?"":this.colorForm.value.remarks,
      colourid: this.colorForm.value.colourid==null?0:this.colorForm.value.colourid,
      
     }
     if(this.activeindex==-1)
     {    
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["colourid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Colour Added Successfully...",this.alertOptions);
           // alert("Saved Successfully");  
            if(this.sdivs==true)
            {            
              this.event.emit(data);            
            }
            else
            {                   
            this.LoadRecords();         
           // form.submitted=false;
            this.toggleDisplay();
            this.count = 1;    
            }
         }
       })   
     }     
     else
     { 
     
         this.myService.Update(model).subscribe(data=>{
           
          if(isNaN(data["colourid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Colour Updated Successfully...",this.alertOptions);
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
    this.colorForm.patchValue({
      colour1:record.colour1,
      remarks:record.remarks,
      colourid:record.colourid,
      
    });   
    
     
    this.isdel=!this.isdel;
    this.activeindex=1;
    
  }
  Delete(form) {
    let model = {
      colour1: this.colorForm.value.colour1,
      remarks: this.colorForm.value.remarks,
      colourid: this.colorForm.value.colourid,
      
       }
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(model).subscribe(data=>{       
        if(isNaN(data["colourid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Colour Deleted Successfully...",this.alertOptions);
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
