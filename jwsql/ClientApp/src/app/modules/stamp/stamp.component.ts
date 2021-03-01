import { Component, OnInit,Input,Output,EventEmitter, ViewChild, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StampService } from './stamp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemMast } from '../../shared/models/item-mast';
import { startWith } from 'rxjs/operators';
import { map, numberFormat, color, Color } from 'highcharts';
import { BooleanLiteral, forEachChild } from 'typescript';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { stringify } from '@angular/compiler/src/util';
import { TooltipPosition } from '@angular/material/tooltip';
import { ShapeService } from '../shape/shape.service';
import {ClarityService} from '../clarity/clarity.service';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import {SizemasterService} from '../sizemaster/sizemaster.service';
import {ColourService} from '../colour/colour.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements OnInit {
  @Input() sdivs: boolean;
  @Input() sendstmp:string;
  @Output() event=new EventEmitter<any>();
  recieveshape(data:any){  
    if(data=="")
    {this.tshape='';}
    else
    {
    this.Shapelist.push({
      id: data["shapeid"],
      name:data["shape1"]
    });
    this.stampform.patchValue({      
      shape:data["shape1"]
    });
    this.tshape=data["shape1"];
  }
  this.isshapeshow=false;
  this.ischildshow=!this.ischildshow;
}
recieveclarity(data:any){  
  
  if(data=="")
  {this.tclarity='';}
  else
  {
  this.Claritylist.push({
    id: data["clarityid"],
    name:data["clarity1"]
  });
  this.stampform.patchValue({      
    clarity:data["clarity1"]
  });
  this.tclarity=data["clarity1"];
}
  this.isclarityshow=false;
  this.ischildshow=!this.ischildshow;
}
  recievesize(data:any){  
    if(data=="")
  {this.tsize='';}
  else
  {
        this.sizemaster.push({
          id: data["sizeid"],
          name:data["size1"]
        });
        this.stampform.patchValue({
          sizeid:data["sizeid"],
          size:data["size1"]
        });
        this.tsize=data["size1"];
      }
        this.issizeshow=false;
        this.ischildshow=!this.ischildshow;
}
recievecolour(data:any){    
  if(data=="")
  {this.tcolour='';}
  else
  {
  this.colourmaster.push({
    id: data["colourid"],
    name:data["colour1"]
  });
  this.stampform.patchValue({    
    colour:data["colour1"]
  });
  this.tcolour=data["colour1"];
}
  this.iscolourshow=false;
  this.ischildshow=!this.ischildshow;
}
  days:any=['Gold','Dia.','Stone','Silver','Plat','Others','All'];
  stampform: FormGroup;
  isDiamondDivHide: boolean = true;
  isgoldDivHide: boolean = true;
  IsDeleteBttnHide= true;
  isHidden:boolean=true;
  initialValue='';
  initialSahpeValue='';
  initialclarityValue='';
  initialSizeValue='';
  initialclrValue='';
  isdivShow=true;
  isShow=false;
  isshapeshow=false;
  isclarityshow=false;
  issizeshow=false;
  iscolourshow=false;
  isitemshow=false;
  tidesc='';
  tcolour='';
  tclarity='';
  tshape='';
  tsize='';
  keyword1 = 'name';
  keyword2 = 'name';
  keyword3 = 'name';
  keyword4='name';
  keyword5='name';
  tdiast=null;
  ino=0;
  shapeid=0;
  clarityid=0;
  sizeid=0;
  colourid=0;
  data = [];
  count: number = 1;
  activeindex=-1;
  //Option Checked Value
  ischildshow=false;  
  isTableHidden = false;
  hideEditBttn = true;
  selectItemName = "";
  isnew=true;
  isdel=false;
  isHideNewBttn = false;
  IsNewBttnHide = false;
  IsSearchBttnHide = false;
  searchText='';
  
  title = "Stamp Info.";
  dtOptions: any = {};
  records:any [];
  retData:any[];
  Itemlist = [];
  Shapelist=[];
  Claritylist=[];
  sizemaster=[];
  colourmaster=[];
  constructor(private myService: StampService,
    private shapeservice:ShapeService,   
    private clarityservice:ClarityService, 
    private SizemasterService:SizemasterService,
    private colourmasterService:ColourService,
    private fb: FormBuilder) { }

    ngOnInit(): void {   
      this.stampform = this.fb.group({
        Id:[0],
        stamp : ['',Validators.required],
        stunch : [0],      
        group:[,],  
        rem1:[,],
        rem2:[,],
        diast:[0],
        prate:[0],
        srate:[0],
        divide:[0],
        mrate:[0],
        colour:[,],
        clarity:[,],
        shape:[,],
        size:[,],
        tunch:[0],
        ino:[0],
        stkrate:[0],
        ptunch:[0],
        stktunch:[0],
        bhavtunch:[0],
        tunchf:[0],
        tuncht:[0],
        pcwt:[0],
        assort:[0],
        pprofit:[0],
        vprofit:[0],
        pname:[,],
        sizeid:[0],
        srno:[0],
        dispbhav:['N'],
        pbhavtunch:[0],
        tstamp:[,],
        advper:[0],
        oldless:[0],
        oldtunch:[0],
        hide:[,],        
        bhavroff:[0],
        webstamp:[,],
        idesc:[,]
      });  
      if(this.sdivs ==true)
      {        
        this.isdivShow=false;
        this.isShow=true;
        this.isnew=false;
        this.stampform.patchValue({
          stamp:this.sendstmp
        });
      }     
     else
     {
      this.LoadRecords();
     }
      this.loaditemList();
      this.loadShapeList();
      this.loadclarityList();
      this.loadsizemaster();
      this.loadcolourmaster();
    }
    loadShapeList()
    {
      this.shapeservice.Records().subscribe(res=>
        {
          this.Shapelist = [];   
          for (let i = 0; i < res.length; i++) {
            //alert(JSON.stringify(res));     
            this.Shapelist.push({
              id: res[i]["shapeid"],
              name:res[i]["shape1"]
            });
          }
          this.Shapelist.push({
            id: "-1",
            name:"Add New"
          });  
        })
    }
    loaditemList() {
      this.myService.ItemsRecord().subscribe(res => {    
        this.Itemlist = [];
     
        for (let i = 0; i < res.length; i++) {   
          this.Itemlist.push({
            id: res[i]["ino"],
            name:res[i]["idesc"]
          });
        }
        /* this.Itemlist.push({
          id: "-1",
          name:"Add New"
        });   */           
     })
    
    }
    loadclarityList() {
      this.clarityservice.Records().subscribe(res => {    
        this.Claritylist = [];   
        for (let i = 0; i < res.length; i++) {   
          this.Claritylist.push({
            id: res[i]["clarityid"],
            name:res[i]["clarity1"]
          });
        }
        this.Claritylist.push({
          id: "-1",
          name:"Add New"
        });             
     })
    
    }
    loadsizemaster() {
      this.SizemasterService.Records().subscribe(res => {    
        this.sizemaster = [];         
        for (let i = 0; i < res.length; i++) {   
          this.sizemaster.push({
            id: res[i]["sizeid"],
            name:res[i]["size1"]
          });
        }
        this.sizemaster.push({
          id: "-1",
          name:"Add New"
        });             
     })
    
    }
    loadcolourmaster() {
      this.colourmasterService.Records().subscribe(res => {    
        this.colourmaster = [];         
        for (let i = 0; i < res.length; i++) {   
          this.colourmaster.push({
            id: res[i]["colourid"],
            name:res[i]["colour1"]
          });
        }
        this.colourmaster.push({
          id: "-1",
          name:"Add New"
        });             
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
        this.retData=this.records.filter(x => x.stamp1.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));     
      }
    }
    selectEvent4(item) {
      if(item["id"]=="-1")      
      {
        this.childDisplay("4");
      }
      else
      {
      if(isNaN(item["id"]))
      {
        item["name"]=this.tshape;        
      }     
      this.stampform.patchValue({         
        shape:item["name"]
      });    
      this.tshape=item["name"];
    }
    }    
    selectEvent2(item) {
      if(item["id"]=="-1")      
      {
        this.childDisplay("2");
      }
      else
      {
      if(isNaN(item["id"]))
      {
        item["id"]=this.ino;
      }     
      this.stampform.patchValue({      
        clarityid:item["id"],
        clarity:item["name"]
      }); 
      this.tclarity=item["name"];
    }
    }
    selectEvent5(item) {
      if(item["id"]=="-1")      
      {
        this.childDisplay("5");
      }
      else
      {
      if(isNaN(item["id"]))
      {
        item["id"]=0;
      }     
      this.stampform.patchValue({      
        sizeid:item["id"],
        size:item["name"]
      }); 
      this.tsize=item["name"];
      this.stampform.value.sizeid=item["id"];
      alert(this.stampform.value.sizeid);
    }
    }
    selectEvent3(item) {
      if(item["id"]=="-1")      
      {
        this.childDisplay("3");
      }
      else
      {
      if(isNaN(item["id"]))
      {
        item["id"]=this.ino;
      }     
      this.stampform.patchValue({      
        colorid:item["id"],
        color:item["name"]
      }); 
      this.tcolour=item["name"];
    }
    }
    LoadRecords() {   
      this.records = [];
      this.retData=[];
      this.myService.Records().subscribe(res => {
        this.records = res;      
        this.retData = this.records.slice(0, 15);        
      });    
      err => {
        console.log(err);
      }
    }
    isValidInput(stamp): boolean {
      return this.stampform.controls[stamp].invalid &&
        (this.stampform.controls[stamp].dirty || this.stampform.controls[stamp].touched);
    }
    formSubmitted: boolean;
    isFieldValid(field: string) {
    return (
      this.stampform.get(field).errors && this.stampform.get(field).touched ||
      this.stampform.get(field).untouched &&
      this.formSubmitted && this.stampform.get(field).errors
    );
    }

    childDisplay(ishowdata:string)
    { 
      this.ischildshow=!this.ischildshow;  
      if(ishowdata=="4")
      {     
        this.isshapeshow=true;
        this.isclarityshow=false;
        this.issizeshow=false;
        this.iscolourshow=false;
      }
      else if(ishowdata=="2")
      {
        this.isshapeshow=false;
        this.isclarityshow=true;
        this.issizeshow=false;
        this.iscolourshow=false;
      }
      else if(ishowdata=="5")
      {        
        this.isshapeshow=false;
        this.isclarityshow=false;
        this.issizeshow=true;
        this.iscolourshow=false;
      }
      else if(ishowdata=="3")
      {
        this.iscolourshow=true;
        this.isclarityshow=false;
        this.isshapeshow=false;
        this.issizeshow=false;
      }
      else if(ishowdata=="1")
      {
        this.isitemshow=true;
        this.isclarityshow=false;
        this.iscolourshow=false;
        this.isshapeshow=false;
        this.issizeshow=false;
      }
    }    
  
    //Autocomplete Box Event
    selectEvent(item) {
      if(item["id"]=="-1")      
      {
        
      }
      else
      {
      if(isNaN(item["id"]))
      {
        item["id"]=this.ino;
      }     
      this.stampform.patchValue({      
        ino:item["id"],
        idesc:item["name"]
      }); 
      this.ino=item["id"];  
    }    
    }
  
    onChangeSearch(val: string) {
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
      //alert(val);
  
    }      
   
    edit(record,index)
    {     
      this.toggleDisplay(); 
      
      this.stampform.patchValue({
        Id:record.stampid,
        stamp:record.stamp1,        
        diast:record.diast,
        idesc:record.idesc,
        srate:record.srate,
        clarity:record.clarity,
        prate:record.prate,
        colour:record.colour,
        stkrate:record.stkrate,
        shape:record.shape,
        pcwt:record.pcwt,
        size:record.size,
        sizeid:record.sizeid,
        stunch:record.stunch,
        divide:record.divide,
        ptunch:record.ptunch,
        tunchf:record.tunchf,
        tuncht:record.tuncht,
        oldless:record.oldless,
        oldtunch:record.oldtunch,
        bhavtunch:record.bhavtunch,
        pbhavtunch:record.pbhavtunch,
        bhavroff:record.bhavroff,
        assort:record.assort,
        stktunch:record.stktunch,
        dispbhav:record.dispbhav        
      });        
      this.tshape=record.shape;
      this.tcolour=record.colour;
      this.tclarity=record.clarity;
      this.tsize=record.size;
      this.ino=record.ino;     
      
      this.tdiast=record.diast-1;
      if(record.diast==2 || record.diast==3 ||record.diast==7)
      {        
        this.isDiamondDivHide=false;
        this.isgoldDivHide=true;
       // this.golddivclear();
      }   
      else if(record.diast==1 || record.diast==4 ||record.diast==5 ||record.diast==6)
      {
        this.isDiamondDivHide=true;
        this.isgoldDivHide=false;
       // this.diamoddivclear();
      }
      this.isdel=!this.isdel;
      this.activeindex=1;
      //this.ino=record.ino;       
    }
    onsubmit(form)
    {
      if(this.isDiamondDivHide==false)
      {
        this.tshape=this.tclarity=this.tidesc=this.tsize=this.tcolour='';  
        this.stampform.patchValue({
          sizeid:0
        });
        this.stampform.value.sizeid=0;
      }
      this.formSubmitted=true;
      if(this.stampform.valid)
      {

     
      let model = {
        stampid:this.stampform.value.Id==null?0:this.stampform.value.Id,
        stamp1: this.stampform.value.stamp,
        stunch: this.stampform.value.stunch,
        group:this.stampform.value.group,
        rem1:this.stampform.value.rem1,
        rem2:this.stampform.value.rem2,
        diast:this.stampform.value.diast,
        prate:this.stampform.value.prate,
        srate:this.stampform.value.srate,
        divide:this.stampform.value.divide,
        mrate:0,
        colour:this.tcolour,
        clarity:this.tclarity,
        shape:this.tshape,   
        size:this.tsize,
        tunch:this.stampform.value.tunch,        
        ino:this.ino,
        stkrate:this.stampform.value.stkrate,
        ptunch:this.stampform.value.ptunch,
        stktunch:this.stampform.value.stktunch,
        bhavtunch:this.stampform.value.bhavtunch,
        tunchf:this.stampform.value.tunchf,
        tuncht:this.stampform.value.tuncht,
        pcwt:this.stampform.value.pcwt,
        assort:this.stampform.value.assort==true?1:0,
        pprofit:0,
        vprofit:0,
        pname:this.stampform.value.pname,
        sizeid:this.stampform.value.sizeid==null?0:this.stampform.value.sizeid,
        srno:0,
        dispbhav:this.stampform.value.dispbhav=="yes"?"Y":"N",
        pbhavtunch:this.stampform.value.pbhavtunch,
        tstamp:this.stampform.value.tstamp,
        advper:0,
        oldless:this.stampform.value.oldless,
        oldtunch:this.stampform.value.oldtunch,
        hide:'',
        bhavroff:this.stampform.value.bhavroff,
        webstamp:''
        //idesc:this.stampform.value.idesc
       }
       
       if(this.activeindex==-1)
       {                
          this.myService.Create(model).subscribe(data=>{
           if(isNaN(data["stampid"]))
           {
             alert(data.message);
           }
           else
           {
              alert("Saved");  
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
            if(isNaN(data["stampid"]))
           {
             alert(data.message);
           }
           else
           {
            alert("Saved");          
            this.LoadRecords();         
            //form.submitted=false;
            this.toggleDisplay();  
            this.count = 1;        
           }       
           }) 
       }
    }
  }
    diamoddivclear()
    {
     // alert(1);
      this.stampform.patchValue({
        srate:0,
        prate:0,
        stkrate:0,
        pcwt:0,
        clarity:'',
        colour:'',
        shape:'',
        sizeid:0,
       size:''
      })
      this.tshape=this.tclarity=this.tidesc=this.tsize=this.tcolour='';
      this.stampform.value.sizeid=0;
    }
    golddivclear()
    {
      this.stampform.patchValue({
        stunch:0,
        ptunch:0,
        tunchf:0,
        tuncht:0,
        oldless:0,
        pcwt:0,
        divide:0,
        stktunch:0,
        oldtunch:0,
        bhavtunch:0,
        pbhavtunch:0,
        bhavroff:0
        })
      
    }
    isViewgoldView(indexed) {
      
      //Intialize all value
      this.stampform.patchValue({
        diast:indexed
      })
     
     this.tdiast=indexed-1;     
      if(indexed==2 || indexed==3 ||indexed==7)
      {        
        this.isDiamondDivHide=false;
        this.isgoldDivHide=true;
        this.golddivclear();
      }   
      else if(indexed==1 || indexed==4 ||indexed==5 ||indexed==6)
      {
        this.isDiamondDivHide=true;
        this.isgoldDivHide=false;
        this.diamoddivclear();
      }
      else 
      {
        this.isgoldDivHide=false;
        this.isDiamondDivHide=false;
      }
      //alert(value);
  
      //filter items
      //let filteredData = this.data.filter(x => x.igroupid == value);
      
      //this.data = filteredData;
      //this.getFilterItems(value);
      //document.getElementById("ItemName").focus();
      //document.getElementById().focus();
    }
      
    
    
    toggleDisplay() {
      if(this.sdivs ==true)
      {      
        this.event.emit("");
      }
      else
      {
        this.isnew=!this.isnew;
        this.isShow = !this.isShow;
        this.isdivShow=!this.isdivShow;        
        if(this.isdivShow==true)
        {          
          this.isdel=false;
          this.stampform.reset();
          this.title='Submit';        
          this.activeindex=-1; 
          this.tshape=this.tclarity=this.tidesc=this.tsize=this.tcolour='';       
      }
    }
  }    
  
    Delete() {      
      let cnfm = confirm("Are You Sure to Delete this Record?");
      if (cnfm) {
        this.myService.Delete(this.stampform.value.Id).subscribe(data=>{       
          if(isNaN(data["stampid"]))
           {
             alert(data.message);
           }
           else
           {
            alert("Deleted");
            this.LoadRecords();                   
            this.toggleDisplay();
            this.count = 1;
           }
        });      
      }
      else {
        
      }
  
    }  
    
    new()
    {
      this.tdiast=null;
      this.isDiamondDivHide=true;
      this.isgoldDivHide=true;
      this.toggleDisplay();
    }
    pageChanged(event: PageChangedEvent): void {
      this.count = (event.page-1)*event.itemsPerPage+1;
      const startItem = (event.page - 1) * event.itemsPerPage;
      const endItem = event.page * event.itemsPerPage;
      this.retData = this.records.slice(startItem, endItem);
    } 
    name:string='';
    sendclr(e)
{
  this.name=e.target.value;
}
sendcolor(e)
{
  this.name=e.target.value;
}
sendshape(e)
{
  this.name=e.target.value;
}
sendsize(e)
{
  this.name=e.target.value;
}
  }
