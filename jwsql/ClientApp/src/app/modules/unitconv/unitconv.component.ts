import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { UnitconvService } from '../unitconv/unitconv.service';
import { Form, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { DatacommunicationService } from '../../shared/services/datacommunication.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService, AlertType } from '../../shared/_alert';
import { UnitmasterService } from '../unitmaster/unitmaster.service';
import { json } from 'ngx-custom-validators/src/app/json/validator';

@Component({
  selector: 'app-unitconv',
  templateUrl: './unitconv.component.html',
  styleUrls: ['./unitconv.component.css']
})
export class UnitconvComponent implements OnInit {
  
  recieveMessage(data){  
    this.ischildshow=false;       
     if(data=='')
     {
      if(this.listno=='1')
      {  
        this.tunit1='';
      }
      else
      {
        this.tunit2='';
      }
     }
     else
     {
    
    this.UnitList1.push({
      id: data["unitid"],
      name:data["unit"]
    });  
    this.UnitList2=this.UnitList1;
    
    if(this.listno=='1')
    {      
    this.unitconvForm.patchValue({      
      unitId1Name:data["unit"],
      UnitId1:data["unitid"]
    });
    this.unitconvForm.value.UnitId1=data["unitid"];
    this.tunit1=data["unit"];
  }
  else
  {
    this.unitconvForm.patchValue({      
      unitId2Name:data["unit"],
      UnitId2:data["unitid"]
    });
    this.unitconvForm.value.UnitId2=data["unitid"];
    this.tunit2=data["unit"];
  }
}
    //this.records=$event;    
    
  }
  unitConRecord: any;
    unitconvForm:FormGroup;  
    activeindex=-1;
    title = "UnitConversion"; 
    initialValue='';
    isShow=false;
    isdivShow=true;
    ischildshow=false;
    isparentshow=true;
    isdel=false;
    isnew=true;
    tunit1='';
    tunit2='';
    listno='';
    keyword='name';
    keyword2='name';
    UnitList1 = [];
    UnitList2 = [];
    alertOptions = {
      autoClose: true,
      keepAfterRouteChange: false
    };

  constructor(private myService: UnitconvService,
    private unitservice:UnitmasterService,
    private fb: FormBuilder,
    public alertService: AlertService) { }
    records: any[];  
    filterrec:any[];
    retData: any[];      
    count: number = 1;    
    searchText = '';
    

  ngOnInit(): void {
    this.unitconvForm = this.fb.group({
      Id:[0],
      UnitId1 : [0],
      UnitId2 : [0],      
      qty:[],        
      unitId1Name:[,],
      unitId2Name:[,],
      oldUnitId1:[0],
      oldUnitId2:[0],
    });
    this.LoadRecords(); 
    this.loadUnitList();
  }

  LoadRecords(){
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
  loadUnitList() {
    this.unitservice.Records().subscribe(res => {    
      this.UnitList1 = [];
      this.UnitList2 = [];      
      for (let i = 0; i < res.length; i++) {        
        this.UnitList1.push({
          id: res[i]["unitid"],
          name:res[i]["unit"]
        });
      }      
      this.UnitList2=this.UnitList1;      
   })
  
  }
  Search()
  {
    if(this.searchText=="")
    {      
      this.ngOnInit();
    }
    else
    {      
      this.filterrec=this.records.filter(x => x.unitId1Name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      this.retData=this.filterrec.slice(0,15);
    }
  }
  toggleDisplay() {        
      this.LoadRecords();
      this.tunit1=this.tunit2='';
      this.isShow = !this.isShow;
      this.isdivShow=!this.isdivShow;
      this.isnew=!this.isnew;
      if(this.isdivShow==true)
      {
      this.isdel=false;               
      this.unitconvForm.reset();      
      this.activeindex=-1;
      }    
  }
  childDisplay(data)
  {    
    this.ischildshow=!this.ischildshow;
    this.isparentshow=!this.isparentshow; 
    this.listno=data;
  }
  onsubmit(form)
  { 
    let model = {
      UnitId1: this.unitconvForm.value.UnitId1,
      UnitId2: this.unitconvForm.value.UnitId2,
      qty: this.unitconvForm.value.qty, 
      oldUnitId1: this.unitconvForm.value.oldUnitId1,     
      oldUnitId2: this.unitconvForm.value.oldUnitId2,     
     }     
    // alert(JSON.stringify(model));
     if(this.activeindex==-1)
     {       
       this.myService.Create(model).subscribe(data=>{         
        if(data["isSuccess"]=="false")
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Record Added Successfully...",this.alertOptions);
            //alert("Saved Successfully");                                
            this.LoadRecords();         
            //form.submitted=false;
            this.toggleDisplay();
            this.count = 1;                
         }
       })   
     }     
     else
     { 
      
         this.myService.Update(model).subscribe(data=>{
         if(data["isSuccess"]=="false")
         {
           alert(data.message);
         }
         else
         {
          this.alertService.success("Record Updated Successfully...",this.alertOptions);
          //alert("Updated Successfully");          
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
    this.unitConRecord = record;

    this.toggleDisplay();    
    this.unitconvForm.patchValue({   
      qty:record.qty,      
      unitId1Name:record.unitId1Name,
      unitId2Name:record.unitId2Name,
      oldUnitId1:record.oldUnitId1,
      oldUnitId2:record.oldUnitId2,
      UnitId1:record.unitid1,
      UnitId2:record.unitid2,
    });  
    this.tunit1=record.unitId1Name;
    this.tunit2=record.unitId2Name;
     
     
    this.isdel=!this.isdel;
    this.activeindex=1;        
  }
  Delete(form) {
    //alert(JSON.stringify(form));
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      //let model = {
      //  UnitId1: this.unitconvForm.value.UnitId1,
      //  UnitId2: this.unitconvForm.value.UnitId2,
      //  qty: this.unitconvForm.value.qty,      
      // }
      this.myService.Delete(this.unitConRecord).subscribe(data=>{       
        if(data["isSuccess"]=="false")
         {
           alert(data.message);
         }
         else
         {
          this.alertService.warn("Record Deleted Successfully...",this.alertOptions);
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
  selectEvent(item) {
    // do something with selected item
    if(isNaN(item["id"]))
    {
      item["id"]=this.unitconvForm.value.UnitId1;
    }     
   
     this.unitconvForm.patchValue({      
      UnitId1:item["id"]
    });   
  this.tunit1=item["name"];
    //this.Clarity.ino= item["id"];
  } 
  selectEvent2(item) {
    // do something with selected item
    if(isNaN(item["id"]))
    {
      item["id"]=this.unitconvForm.value.UnitId2;
    }     
     this.unitconvForm.patchValue({      
      UnitId2:item["id"]
    });   
    this.tunit2=item["name"];
    //this.Clarity.ino= item["id"];
  }  
  name:string='';
  sendunit(e)
  {
    this.name=e.target.value;
  }

}
