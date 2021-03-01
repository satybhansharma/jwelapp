import { Component, OnInit,Input,Output,EventEmitter,ViewChild, OnDestroy, AfterViewInit, COMPILER_OPTIONS } from '@angular/core';
import {SizemasterService} from './sizemaster.service';
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
import { data } from 'jquery';
import { json } from 'ngx-custom-validators/src/app/json/validator';

@Component({
  selector: 'app-sizemaster',
  templateUrl: './sizemaster.component.html',
  styleUrls: ['./sizemaster.component.css']
})
export class SizemasterComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendsize:string;
  @Input() secondt: string;
  @Output() event=new EventEmitter<any>();
  SizeForm:FormGroup;
  recieveMessage(data){        
    this.loadItemList();    
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
  isitemshow=false;
  isdel=false;
  isnew=true;
  titem='';
  ItemList2 = [];
  initialValue='';
  keyword2 = 'name';  
  ino = 0;
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private myService: SizemasterService,
    private dc:DatacommunicationService,private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];  
    retData: any[];   
    filterrec:any[];
    count: number = 1;    
    searchText = '';
    retunit='';

  ngOnInit(): void {
    this.SizeForm = this.fb.group({
      sizeid:[0],
      size : ['',Validators.required],
      remarks : [,],      
      idesc:[,],  
      ino:[0],
      sizewt:[],
      sizeval:[],
      sizerange:[],
    });
    if(this.sdivs ==true)
    {
      this.SizeForm.patchValue({
        size: this.sendsize
      });
      this.isdivShow=false;
      this.isShow=true;
      this.isnew=false;
    }     
    
    this.LoadRecords();    
    this.loadItemList(); 
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
      this.SizeForm.patchValue({  
        ino:data["ino"],    
        idesc:data["idesc"]
      });   
      this.titem=data["idesc"];
    }
    
    
    this.ischildshow=!this.ischildshow;
  }
  LoadRecords() {         
      
    this.records = [];
    this.retData=[];
    this.filterrec=[];
    this.myService.Records().subscribe(res => {
      this.records = res;  
      this.filterrec=res;    
      this.retData = this.records.slice(0, 15);
       
    });    
    err => {
      console.log(err);
    }
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
      this.SizeForm.reset();      
      this.activeindex=-1;
      }
    }
  }
  childDisplay(show:any)
  {    
    this.ischildshow=!this.ischildshow;
    this.isparentshow=!this.isparentshow;  
    if(show==1){
      
      this.isitemshow=true;
      

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
      this.filterrec=this.records.filter(x => x.size1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  onsubmit(form)
  {
    let model = {
      size1: this.SizeForm.value.size,
      Remarks: this.SizeForm.value.remarks,
      sizeid: this.SizeForm.value.sizeid==null?0:this.SizeForm.value.sizeid,
      ino:this.SizeForm.value.ino==null || this.SizeForm.value.idesc==null|| this.SizeForm.value.idesc==''?0:this.SizeForm.value.ino,
      sizewt:this.SizeForm.value.sizewt,
      sizeval:this.SizeForm.value.sizeval,
      sizerange:this.SizeForm.value.sizerange,
    }

     
     if(this.activeindex==-1)
     {       
       this.myService.Create(model).subscribe(data=>{
         if(isNaN(data["sizeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Size Added Successfully...",this.alertOptions);
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
         this.myService.Update(model).subscribe(data=>{
          if(isNaN(data["sizeid"]))
         {
           alert(data.message);
         }
         else
          {
            this.alertService.success("Size Updated Successfully...",this.alertOptions);
           // alert("Updated Successfully");
                  
          this.LoadRecords();         
          //form.submitted=false;
          this.toggleDisplay();  
          this.count = 1;        
         }       
         })
     }
  }
  edit(record,index)
  {
    this.size = record;
    this.toggleDisplay(); 
    this.SizeForm.patchValue({
      size:record.size1,
      remarks:record.remarks,
      sizeid:record.sizeid,
      ino:record.ino,
      idesc:record.idesc,
      sizewt:record.sizewt,
      sizeval:record.sizeval,
      sizerange:record.sizerange
    });  
    //alert(JSON.stringify(this.SizeForm.getRawValue()));
    
    this.isdel=!this.isdel;
    this.activeindex=1;
    this.ino=record.ino;       
  }
  Delete(form) {
    
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.size).subscribe(data=>{       
        if(isNaN(data["sizeid"]))
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Stamp Deleted Successfully...",this.alertOptions);
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
  selectEvent2(item) {
    // do something with selected item
    if(isNaN(item["id"]))
    {
      item["id"]=this.ino;
    }     
    this.SizeForm.patchValue({      
      ino:item["id"]
    });  
    //this.Clarity.ino= item["id"];
  } 
  cancel()
  {  
    this.LoadRecords();    
    this.toggleDisplay();
  }
}
