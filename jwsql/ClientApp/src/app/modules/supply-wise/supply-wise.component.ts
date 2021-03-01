import { Component, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnitconvService } from '../unitconv/unitconv.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatacommunicationService } from '../../shared/services/datacommunication.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService, AlertType } from '../../shared/_alert';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { SupplywiseService } from './supplywise.service';
import { GridOptions, GridOptionsWrapper } from 'ag-grid-community';
import { param } from 'jquery';
import { CommonService } from '../../shared/services/common.service';
import { ExcelService } from '../../shared/services/excel.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { BoundElementProperty } from '@angular/compiler';
import { style } from '@angular/animations';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { saveAs } from 'file-saver';
const EXCEL_EXTENSION = '.xlsx';




export enum KEY_CODE {

}

@Component({
  selector: 'app-supply-wise',
  templateUrl: './supply-wise.component.html',
  styleUrls: ['./supply-wise.component.css']
})



export class SupplyWiseComponent implements OnInit {

  gridOptions: GridOptions;
 
  private gridColumnApi;

 // public modules: Module[] = AllModules;
  

  

  columnDefs = [
    {
      headerName: "Supplier Name",
      field: "cname",
      sortable: true,
      filter: true,
       width: 400,
       cellStyle:{'header-background-color':'black'}
    },
    {
      headerName: "Purchase Tags",
      field: "pcount",
      sortable: true,
      filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right','vertical-align':'middle' },
    },
     {
      headerName: "Purchase Tags Wt.",
      field: "pwt",
      sortable: true,
      width:250,
      //valueFormatter:params => params.data.pwt.toFixed(3),
      filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    }, 
    {
      headerName: "Sold Tags",
      field: "scount",
      sortable: true,
      filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Sold Tags Wt",
      field: "swt",
      sortable: true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
     {
      headerName: "Sale %",
      field: "age",
      sortable: true,
      //valueFormatter : params => params.data.age.toFixed(2),
      filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    }, 
    {
      headerName: "Avg.Days(Sold)",
      field: "avgdays",
      sortable: true,
      filter: 'agNumberColumnFilter',
      cellStyle: { 'text-align': 'right' },
    }
  ];
columnDetail=[
  {
    headerName: "Pur. Date",
    field: "tdate",
    sortable: true,
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Tag No.",
    field: "tgno",
    sortable: true,
    filter: true,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Item Name",
    field: "idesc",
    sortable: true,
    filter: true,
    width:400,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Stamp",
    field: "stamp",
    sortable: true,
    filter: true,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Quality",
    field: "quality",
    sortable: true,
    filter: true,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Remarks",
    field: "remarks",
    sortable: true,
    filter: true,
    width:400,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Gr.Wt",
    field: "gwt",
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter : params => params.data.gwt.toFixed(3),
    cellStyle: { 'text-align': 'right', border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Dia.WT",
    field: "diawt",
    sortable: true,
    filter: 'agNumberColumnFilter',
    valueFormatter : params => params.data.diawt.toFixed(3),
    cellStyle: {'text-align': 'right', border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Status",
    field: "status",
    sortable: true,
    filter: true,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Sold Date",
    field: "lastdate",
    sortable: true,
    filter: 'agDateColumnFilter',
    filterParams: filterParams,
    cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0px', borderBottomWidth: '0px', },
  },
  {
    headerName: "Date",
    field: "date",
    sortable: true,
    filter: 'agDateColumnFilter',
    filterParams: filterParams
  }
];
rowHeight = 28;
  constructor(private myService: SupplywiseService,private exce:ExcelService) { }
  records: any[];
  detrecords: any[];
  excellist: any[];
  pur_Tag: number = 0;
  pur_TagWt: number = 0;
  sold_Tag: number = 0;
  sold_TagWt: number = 0;
  sale_Per: number = 0;
  avg_sold: number = 0;
  grwt: number = 0;
  dwt: number = 0;
  istableshow = false;
  private gridApi;
  private rowClassRules;
  allcolumns=false;
  igroup:any[];
  idesc:any[];
  category:any[];
  selectval="Select filter";
  heroes=[];

  Loadigroup()
  {
    this.igroup=[];
    this.myService.getigroup().subscribe(res => {
      this.igroup = res;      
    });
    err => {
      console.log(err);
    }
  }
  Loadidesc()
  {
    this.idesc=[];
    this.myService.getitem().subscribe(res => {
      this.idesc = res;      
    });
    err => {
      console.log(err);
    }
  }
  Loadcategory()
  {
    this.category=[];
    this.myService.getcategory().subscribe(res => {
      this.category = res;      
    });
    err => {
      console.log(err);
    }
  }
  LoadRecords() {
    this.records = [];
    this.exce.exportAsExcelFile;

    this.myService.Records("").subscribe(res => {
      this.records = res;
      //alert(JSON.stringify(this.records));
      res.forEach(element => {
        this.pur_Tag += element.pcount;
        this.pur_TagWt += element.pwt;
        this.sold_Tag += element.scount;
        this.sold_TagWt += element.swt;
        this.sale_Per += element.age;
        this.avg_sold += element.avgdays;
        
      });
      this.sold_TagWt=parseFloat(this.sold_TagWt.toFixed(3));
      this.sale_Per=parseFloat(this.sale_Per.toFixed(2));
      this.pur_TagWt=parseFloat(this.pur_TagWt.toFixed(3));
      /*  for (let i = 0; i < res.length; i++) {
          
         this.pur_Tag+=res[i]["pcount"];
            this.pur_TagWt+=res[i]["pwt"];
            this.sold_Tag+=res[i]["scount"];
            this.sold_TagWt+=res[i]["swt"];
            this.sale_Per+=res[i]["age"];   
            this.avg_sold+=res[i]["avgdays"];     
       }*/
    });
    err => {
      console.log(err);
    }

  }

  LoaddetRecords(record, index) {
    this.myService.Records(record.cname).subscribe(res => {
      this.detrecords = res;
      res.forEach(element => {
        this.grwt += element.gwt;
        this.dwt += element.diawt
      })

      //alert(JSON.stringify(this.detrecords));
    });
    this.grwt=parseFloat(this.grwt.toFixed(3));
    this.dwt=parseFloat(this.dwt.toFixed(3));

        err => {
      console.log(err);
    }

    this.istableshow = !this.istableshow;
  }
  ngOnInit(): void {
     //var date= this.convertDate('01-25-2021');
     //alert(date);
    this.Loadigroup();
    this.Loadidesc();
    this.Loadcategory();
    this.LoadRecords();

    this.Calculation();
    //this.getSelectedRowData();
    // this.gridOptions.columnDefs=this.columnDefs;
    //  this.gridOptions={columnDefs:this.columnDefs}
  }
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  tselect="";
  selectOption(params)
  {
    this.tselect=params;
    if(params==="1")
    {      
      //this.heroes.push.apply(this.heroes,this.igroup);      
      this.heroes = [];   
      for (let i = 0; i < this.igroup.length; i++) {                
            this.heroes.push({
              id: this.igroup[i]["igroupid"],
              name:this.igroup[i]["igroup"]
          });
       }
    }
    else if(params==="2")
    {this.heroes = [];   
      for (let i = 0; i < this.category.length; i++) {                
            this.heroes.push({
              id: this.category[i]["catid"],
              name:this.category[i]["category"]
          });
       }
      
    }
    else if(params==="3")
    {
      this.heroes = [];   
      for (let i = 0; i < this.idesc.length; i++) {                
            this.heroes.push({
              id: this.idesc[i]["INO"],
              name:this.idesc[i]["idesc"]
          });
       }
    }
  }
  twhere="";
  tselectid="";
  btnok_click()
  { 
    if(this.tselect==="1")
    {      
      this.twhere="where  i.igroupid "+this.radioclick+" (" + this.tselectid + ")";
    }
    else if(this.tselect==="2")
    {      
      this.twhere="where  i.catid "+this.radioclick+" (" + this.tselectid + ")";
    }
    else if(this.tselect==="3")
    {      
      this.twhere="where  i.ino "+this.radioclick+" (" + this.tselectid + ")";
    }

    this.records = [];
    this.myService.getRecords(this.twhere).subscribe(res => {
      this.records = res;
      alert(JSON.stringify(this.records));
      this.pur_Tag=0;
      this.pur_TagWt=0;
      this.sold_Tag=0;
      this.sold_TagWt=0;
      this.sale_Per=0;
      this.avg_sold=0;
      res.forEach(element => {
        this.pur_Tag += element.pcount;
        this.pur_TagWt += element.pwt;
        this.sold_Tag += element.scount;
        this.sold_TagWt += element.swt;
        this.sale_Per += element.age;
        this.avg_sold += element.avgdays;
        
      });
      this.sold_TagWt=parseFloat(this.sold_TagWt.toFixed(3));
      this.sale_Per=parseFloat(this.sale_Per.toFixed(2));
      this.pur_TagWt=parseFloat(this.pur_TagWt.toFixed(3));
      /*  for (let i = 0; i < res.length; i++) {
          
         this.pur_Tag+=res[i]["pcount"];
            this.pur_TagWt+=res[i]["pwt"];
            this.sold_Tag+=res[i]["scount"];
            this.sold_TagWt+=res[i]["swt"];
            this.sale_Per+=res[i]["age"];   
            this.avg_sold+=res[i]["avgdays"];     
       }*/
    });
    this.hello();
    err => {
      console.log(err);
    }
  }
    export() {
      
      const params = {
        columnGroups: true,
        allColumns: true,
        
        fileName: 'supplierwise Report',
       
        //columnSeparator: document.querySelector("#columnSeparator").value
      };
      this.gridApi.exportDataAsCsv(params);
  
      //this.exce.exportAsExcelFile(this.records, 'supplierlist');
    }
   radioclick:string='1';
    Change(event:any) {
    
     //alert(event);
     this.radioclick=event;
    }
  CellDoubleClicked(param)
  {
    //alert((param.data.id));
//alert(param.value);
this.myService.Records(param.value).subscribe(res => {
 // alert(JSON.stringify(res));
  //res.tdate=this.convertDate(res.tdate);
  this.detrecords = res;
  res.forEach(element => {
    this.grwt += element.gwt;
    this.dwt += element.diawt   
    //element.tdate=this.convertDate(res.tdate)
  })
 alert(JSON.stringify(this.detrecords));
  //alert(JSON.stringify(this.detrecords));
});

err => {
  console.log(err);
}
let dateString1= '10-06-2015' 
//var momentVariable = this.date 
//var stringvalue = momentVariable.format('YYYY-MM-DD');
//alert(stringvalue);
  }
  getSelectedRowData() {
    // alert("Im  here");
    this.gridApi.sizeColumnsToFit();
   // const selectedRow = this.gridApi.getSelectedRows();
   // alert(selectedRow);
    // let selectedData = selectedNodes.map(node => node.data);
    //alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    //   return selectedData;
  }
  hello() {
    var checkList = document.getElementById("list1");
    if (checkList.classList.contains('visible'))
      checkList.classList.remove('visible');
    else
      checkList.classList.add('visible');
  }
  onCheckboxChange(option, event) {
    if(event.target.checked) {
     if(this.selectval==="Select filter")
     {
        this.selectval=option.name;
        this.tselectid=option.id;
     }
     else
     {
      this.selectval=this.selectval+','+option.name;
      this.tselectid=this.tselectid+','+option.id;
     }
     
    } 
    else
    {   
      if(this.selectval.includes(option.name+","))
      {
        this.selectval=this.selectval.replace(option.name+",","");
        this.tselectid=this.tselectid.replace(option.id+",","");
      }
      else
      {
      this.selectval=this.selectval.replace(option.name,"");
      this.selectval=this.selectval.substring(0,this.selectval.length-1);

      this.tselectid=this.tselectid.replace(option.id,"");
      this.tselectid=this.tselectid.substring(0,this.tselectid.length-1);
      }
      if(this.selectval==="")
      {
        this.selectval="Select Filter";
        this.tselectid="";
      }
      this.selectval.toString().replace(",,","");    
      this.tselectid.toString().replace(",,","");   
         
    }
 
}

  onRowSelect(event: any) {
    this.istableshow=true;
    alert(JSON.stringify(event));
  }
  //onFirstDataRendered(params) {
    //this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
 // }
  onGridReady(params) {

this.gridApi=params.api;
   
    //this.gridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true))
    window.onresize = () => { params.api.sizeColumnsToFit(); }
  }

  Calculation() {
    // this.records.forEach(element => {
    //   this.pur_Tag+=element.pcount;
    //   this.pur_TagWt+=element.pwt;
    //   this.sold_Tag+=element.scount;
    //   this.sold_TagWt+=element.swt;
    //   this.sale_Per+=element.age;
    //   this.avg_sold+=element.avgdays;


    // });

    /* this.myService.Records("").subscribe(res=>{
      res.forEach(element => {
        this.pur_Tag+=element.pcount;
        this.pur_TagWt+=element.pwt;
        this.sold_Tag+=element.scount;
        this.sold_TagWt+=element.swt;
        this.sale_Per+=element.age;
      }); 

     
   })*/
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {



    if (event.key === KEY_CODE.ESCAPE) {
      this.istableshow = false;
    }
    if (event.key == KEY_CODE.Enter) {
      alert("Hey");
      this.getSelectedRowData();
    }
  }

  GetRecords(item: any) {
    alert(JSON.stringify(item));
  }

  convertDate(date:string):Date{
    var data;
    try{
       //data=new Date(date);
       
  //return new Date(date);
    } 
    catch{

    }   
  return data;
  }
  //KeyBoard Event




}
var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('-');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  minValidYear: 2000,
};

export enum KEY_CODE {

  ESCAPE = 'Escape',
  TAB = 'Tab',
  Enter = 'Enter'
}
