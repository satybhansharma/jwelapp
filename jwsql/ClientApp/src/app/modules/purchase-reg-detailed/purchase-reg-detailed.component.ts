import { Component, OnInit } from '@angular/core';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'
import { PurchaseregdetService } from './purchaseregdet.service';
import { DatePipe } from '@angular/common'


@Component({
  selector: 'app-purchase-reg-detailed',
  templateUrl: './purchase-reg-detailed.component.html',
  styleUrls: ['./purchase-reg-detailed.component.css']
})
export class PurchaseRegDetailedComponent implements OnInit {

  gridOptions: GridOptions;
  
  columnDefs = [
    {
      headerName: "Date",
      field: "tdate",
      width:100,     
      sortable: true,
      filter: true,
       cellStyle:{'header-background-color':'black'}
    },
    {
      headerName: "Type",
      field: "type",
      width:70,
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'vertical-align':'middle' },
    },
    {
      headerName: "Bill No",
      field: "refno",
      sortable: true,
      width:100,
      //valueFormatter:params => params.data.pwt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px' },
    },
    {
      headerName: "Party Name",
      field: "cname",
      width:250,
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px' },
    },
    {
      headerName: "Item Name",
      field: "idesc",
      width: 150,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px' },
    },
    {
      headerName: "Stamp",
      field: "stamp",
      width:80,
      //sortable: true,
      //valueFormatter : params => params.data.age.toFixed(2),
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px'},
    },
    {
      headerName: "Tag No",
      field: "tgno",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px' },
    },
    {
      headerName: "G.Wt",
      field: "gwt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "M.Amt",
      field: "mamt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Net Wt",
      field: "wt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Dia.Wt",
      field: "diawt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Less.Wt",
      field: "lwt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Stn Wt",
      field: "stnwt",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Rate",
      field: "rate",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Lbr",
      field: "lbr",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "On",
      field: "lcode",
      width:70,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px'},
    },
    {
      headerName: "Others",
      field: "others",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Total",
      field: "tvalue",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Pc",
      field: "pc",
      width:60,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Dis.",
      field: "dis",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Dis(%)",
      field: "pdis",
      width:60,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: {'text-align': 'right' },
    },
  ];
  constructor(private myService:PurchaseregdetService, public datepipe:DatePipe) { }
  records: any[];
  fdate;
  tdate;
  isfltshow=false;
  // detrecords: any[];
  // excellist: any[];
   p_goldgwt: number = 0;
   p_goldwt: number = 0;
  p_diawt: number = 0;
  p_stnwt: number = 0;
  p_silgwt: number = 0;
  p_silwt: number = 0;
  p_diapc: number = 0;
  p_stnpc: number = 0;
  p_mamt:number=0;
  p_lamt:number=0;
  p_damt:number=0;
  p_samt:number=0;
  p_pc:number=0;
  p_tvalue:number=0;
  p_fine1:number=0;
  p_fine2:number=0;
  p_tgpc:number=0;
  p_othgwt:number=0;
  p_others:number=0;
  p_gwt:number=0;
  p_dis:number=0;
  istableshow = false;
  private gridApi;
  private rowClassRules;
  
  
  LoadRecords() {
    this.myService.Records(this.fdate,this.tdate).subscribe(res => {
      this.records = res;
      res.forEach(element => {
        this.p_goldgwt += element.goldgwt;
        this.p_goldwt += element.goldwt;
        this.p_diawt+=element.diawt;
        this.p_stnwt+=element.stnwt;
        this.p_silgwt+=element.silgwt;
        this.p_silwt+=element.silwt;
        this.p_diapc+=element.diapc;
        this.p_stnpc+=element.stnpc;
        this.p_mamt+=element.mamt;
        this.p_lamt+=element.lamt;
        this.p_damt+=element.damt;
        this.p_samt+=element.samt;
        this.p_pc+=element.pc;
        this.p_tvalue+=element.tvalue;
        this.p_fine1+=element.fine1;
        this.p_fine2+=element.fine2;
        this.p_tgpc+=element.tgpc;
        this.p_othgwt+=element.othgwt;
        this.p_others+=element.others;
        this.p_gwt+=element.gwt;
        this.p_dis+=element.dis;
      
      //alert(JSON.stringify(this.records));
      })
      this.p_goldgwt=parseFloat(this.p_goldgwt.toFixed(3));
      this.p_goldwt=parseFloat(this.p_goldwt.toFixed(3));
      this.p_diawt=parseFloat(this.p_diawt.toFixed(3));
      this.p_stnwt=parseFloat(this.p_stnwt.toFixed(3));
      this.p_silgwt=parseFloat(this.p_silgwt.toFixed(3));
      this.p_silwt=parseFloat(this.p_silwt.toFixed(3));
      this.p_diapc=parseFloat(this.p_diapc.toFixed(0));
      this.p_stnpc=parseFloat(this.p_stnpc.toFixed(0));
      this.p_mamt=parseFloat(this.p_mamt.toFixed(3));
      this.p_lamt=parseFloat(this.p_lamt.toFixed(3));
      this.p_damt=parseFloat(this.p_damt.toFixed(3));
      this.p_samt=parseFloat(this.p_samt.toFixed(3));
      this.p_pc=parseFloat(this.p_pc.toFixed(0));
      this.p_tvalue=parseFloat(this.p_tvalue.toFixed(3));
      this.p_fine1=parseFloat(this.p_fine1.toFixed(3));
      this.p_fine2=parseFloat(this.p_fine2.toFixed(3));
      this.p_tgpc=parseFloat(this.p_tgpc.toFixed(0));
      this.p_othgwt=parseFloat(this.p_othgwt.toFixed(3));
      this.p_others=parseFloat(this.p_others.toFixed(3));
      this.p_gwt=parseFloat(this.p_gwt.toFixed(3));
      this.p_dis=parseFloat(this.p_dis.toFixed(3));
    });
        err => {
      console.log(err);
    }

    this.istableshow = !this.istableshow;
  }
  
  ngOnInit(): void {
      //this.fdate=new Date().toLocaleDateString();
    let latest_date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.fdate=latest_date;
    this.tdate=latest_date;
   //alert(latest_date);
    this.LoadRecords();
  }
  onchange(et:any){
    this.tdate=this.datepipe.transform(et, 'yyyy-MM-dd');    
    this.LoadRecords();
  }
  onchange1(et:any){
    this.fdate=this.datepipe.transform(et, 'yyyy-MM-dd');    
    //this.LoadRecords();
  }
 fltshow()
 {
   this.isfltshow=!this.isfltshow;
 }

}
