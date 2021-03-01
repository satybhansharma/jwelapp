import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import { ClarityService } from '../clarity/clarity.service';
//import { CategoryMasterService } from '../../category-master/category-master.service';
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
import {Clarity} from './clarity';
//import { CategoryComponent } from '../../category-master/category/category.component';
//import { UnitconComponent } from '../../unitconmaster/unitcon/unitcon.component';
import {SharedserviceService} from '../../shared/services/sharedservice.service';
import { data } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';

//import { ItemComponent } from '../../itemmaster/item/item.component';
@Component({
  selector: 'app-clarity',
  templateUrl: './clarity.component.html',
  styleUrls: ['./clarity.component.css']
})
export class ClarityComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() secondt: string;
  @Input() sendclr:string;
  @Output() event=new EventEmitter<any>();
  clarityForm: FormGroup;
  clarity: any;
  
  
  recieveMessage(data){        
    this.loadItemList();    
    this.initialValue=data;
    //this.records=$event;    
    
  }
  recieveitem(data:any){  
    if(data==""){
      this.titem='';
    }
    else{    
      this.ItemList2.push({
        id: data["ino"],
        name:data["idesc"]
      });
      this.clarityForm.patchValue({  
        ino:data["ino"],    
        idesc:data["idesc"]
      });   
      this.titem=data["idesc"];
    }
    
    
    this.ischildshow=!this.ischildshow;
  }

activeindex=-1;
  title = "Clarity";   
  isShow=false;
  isdivShow=true;
  ischildshow=false;
  isparentshow=true;
  isshowitem=false;
  isdel=false;
  isnew=true;
  ItemList2 = [];
  titem='';
  initialValue='';
  keyword2 = 'name';  
  ino = 0;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private myService: ClarityService,
    private sharedser: SharedserviceService,
    //private _unitservice:CategoryMasterService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService
    ) { }
    records: any[];  
    retData: any[]; 
    filterrec:any[];     
    count: number = 1;    
    searchText = '';
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
    isValidInput(clarity): boolean {
      return this.clarityForm.controls[clarity].invalid &&
        (this.clarityForm.controls[clarity].dirty || this.clarityForm.controls[clarity].touched);
  }
  formSubmitted: boolean;
  isFieldValid(field: string) {
    return (
      this.clarityForm.get(field).errors && this.clarityForm.get(field).touched ||
      this.clarityForm.get(field).untouched &&
      this.formSubmitted && this.clarityForm.get(field).errors
    );
  }

  ngOnInit(): void {
    this.clarityForm = this.fb.group({
      Id:[0],
      clarity : [,Validators.required],
      remarks : [,],      
      idesc:[,],  
      ino:[0],
    });
    
    if(this.sdivs ==true)
    {
      this.clarityForm.patchValue({
        clarity: this.sendclr
      });
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }     
    
    this.LoadRecords();    
    this.loadItemList(); 
  }
  toggleDisplay() {
    if(this.sdivs ==true)
    {      
      this.event.emit("");
    }
    else
    {
      this.titem='';
      this.isShow = !this.isShow;
      this.isdivShow=!this.isdivShow;
      this.isnew=!this.isnew;      
      if(this.isdivShow==true)
      {
      this.isdel=false;
        
      this.clarityForm.reset();      
      this.activeindex=-1;
      }
    }
  }
  childDisplay(show:any)
  {    
    this.ischildshow=!this.ischildshow;
    this.isparentshow=!this.isparentshow;     
    if(show==1)
    {
      this.isshowitem=true;
    }
    else{
      this.isshowitem=false;
    }
  }
  Search()
  {
    if(this.searchText=="")
    {      
      this.ngOnInit();
    }
    else
    {      
      this.filterrec=this.records.filter(x => x.clarity1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  {
    this.formSubmitted=true;
    if(this.clarityForm.valid)
    {

    
    let model = {
      Clarity1: this.clarityForm.value.clarity,
      Remarks: this.clarityForm.value.remarks,
      clarityid: this.clarityForm.value.Id==null?0:this.clarityForm.value.Id,
      ino:this.clarityForm.value.ino,
     }
     
     if(this.activeindex==-1)
     {
       this.myService.Create(model).subscribe(data => {

         if(isNaN(data["clarityid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Clarity Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");  
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
      
         this.myService.Update(model).subscribe(data=>{
          if(isNaN(data["clarityid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Clarity Updated Successfully...",this.alertOptions);
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
    this.clarity = record;
    this.toggleDisplay(); 
    this.clarityForm.patchValue({
      clarity:record.clarity1,
      remarks:record.remarks,
      Id:record.clarityid,
      ino:record.ino,
      idesc:record.idesc
    });  
    this.titem=record.idesc;
    this.isdel=!this.isdel;
    this.activeindex=1;
    this.ino=record.ino;      
  }
  Delete() {
    
    let cnfm = confirm("Are You Sure to Delete this Record?");

    if (cnfm) {
      this.myService.Delete(this.clarity).subscribe(data=>{       
        if(isNaN(data["clarityid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Clarity Deleted Successfully...",this.alertOptions);
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
  selectEvent2(item) {
    // do something with selected item
    if(isNaN(item["id"]))
    {
      item["id"]=this.ino;
    }     
    this.clarityForm.patchValue({      
      ino:item["id"]
    });  
    //this.Clarity.ino= item["id"];
  } 
  loadItemList() {
    this.myService.ItemsRecord().subscribe(res => {    
      this.ItemList2 = [];
      
      for (let i = 0; i < res.length; i++) {        
        this.ItemList2.push({
          id: res[i]["ino"],
          name:res[i]["idesc"]
        });
      }      
    
   })
  
  }
  cancel()
  {  
    this.LoadRecords();    
    this.toggleDisplay();
  }
  name:string='';
  senditem(e)
  {
    this.name=e.target.value;
  }
}
