import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { CategoryService} from '../category/category.service';
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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendcat:string;
  @Output() event=new EventEmitter<any>();
  icatForm: FormGroup;
  
 

activeindex=-1;
  title = "Add New Category";   
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
  constructor(private myService: CategoryService,
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
    isValidInput(category1): boolean {
      return this.icatForm.controls[category1].invalid &&
        (this.icatForm.controls[category1].dirty || this.icatForm.controls[category1].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.icatForm.get(field).errors && this.icatForm.get(field).touched ||
      this.icatForm.get(field).untouched &&
      this.formSubmitted && this.icatForm.get(field).errors
    );
  }

  ngOnInit(): void {
    this.icatForm = this.fb.group({
      catid:[0],
      category1 : [,Validators.required],
      remarks : [],        
      
      
    });
    if(this.sdivs ==true)
    {
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
      this.icatForm.patchValue({
        category1:this.sendcat
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
      
      this.icatForm.reset();
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
      this.filterrec=this.records.filter(x => x.category1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  { 
    this.formSubmitted=true;
    if (this.icatForm.valid)
    {

   
    let model = {
      category1: this.icatForm.value.category1==null?"":this.icatForm.value.category1,
      remarks: this.icatForm.value.remarks==null?"":this.icatForm.value.remarks,
      catid: this.icatForm.value.catid==null?0:this.icatForm.value.catid,
      
     }
     if(this.activeindex==-1)
     {      
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["catid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Category Added Successfully...",this.alertOptions);
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
          if(isNaN(data["catid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Category Updated Successfully...",this.alertOptions);
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
  edit(record,index)
  { 
    
    this.toggleDisplay(); 
    this.icatForm.patchValue({
      category1:record.category1,
      remarks:record.remarks,
      catid:record.catid,
      
    });   
   // alert(JSON.stringify(this.icatForm.getRawValue()));
     
    this.isdel=!this.isdel;
    this.activeindex=1;
    
  }
  Delete(form) {
    let model = {
      category1: this.icatForm.value.category1,
      remarks: this.icatForm.value.remarks,
      catid: this.icatForm.value.catid,
      
       }
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(model).subscribe(data=>{       
        if(isNaN(data["catid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Category Deleted Successfully...",this.alertOptions);
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
