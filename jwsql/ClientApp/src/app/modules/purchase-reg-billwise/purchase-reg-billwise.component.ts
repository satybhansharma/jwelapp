import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'
import { PurchaseregbillService } from './purchaseregbill.service';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-purchase-reg-billwise',
  templateUrl: './purchase-reg-billwise.component.html',
  styleUrls: ['./purchase-reg-billwise.component.css']
})
export class PurchaseRegBillwiseComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs = [
    {
      headerName: "Narration",
      field: "lnarr",     
      sortable: true,
      filter: true,
       cellStyle:{'header-background-color':'black'}
    },
    {
      headerName: "Party Name",
      field: "cname",
      width:250,
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px','vertical-align':'middle' },
    },
    {
      headerName: "City",
      field: "city",
      sortable: true,
      width:130,
      //valueFormatter:params => params.data.pwt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px' },
    },
    {
      headerName: "Series",
      field: "series",
      width:180,
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px'},
    },
    {
      headerName: "Sale.Amt",
      field: "samount",
      width:80,
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right'},
    },
    // {
    //   headerName: "Pur.Amt.",
    //   field: "",
    //   //sortable: true,floattingFilter:true,
    //   //valueFormatter:params => params.data.swt.toFixed(3),
    //   //filter: 'agNumberColumnFilter',
    //   cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    // },
    {
      headerName: "Discount",
      field: "discount",
      width:80,
      //sortable: true,
      //valueFormatter : params => params.data.age.toFixed(2),
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Tax",
      field: "tax",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Bill Amt.",
      field: "amount",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "G.Fine",
      field: "fine1",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "S.Fine",
      field: "fine2",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Adjust",
      field: "adjust",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "CGST",
      field: "cgst",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "SGST",
      field: "sgst",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "IGST",
      field: "igst",
      width:80,
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: {'text-align': 'right' },
    },
  ];
  constructor(private myService:PurchaseregbillService,public datepipe:DatePipe,private route:ActivatedRoute) { }
  records: any[];
  salrecords:any[];
  fdate='';
  tdate;
  title:string;
  
  // detrecords: any[];
  // excellist: any[];
   p_samt: number = 0;
   p_dis: number = 0;
   p_tax: number = 0;
   p_amt: number = 0;
   p_fine1: number = 0;
   p_fine2: number = 0;
   p_adjust: number = 0;
   p_sgst: number = 0;
   p_cgst:number=0;
   p_igst:number=0

  istableshow = false;
  private gridApi;
  private rowClassRules;
  
  
  LoadRecords() {
    this.myService.Records(this.fdate.toString(),this.tdate.toString()).subscribe(res => {
      this.records = res;
      res.forEach(element => {
        this.p_samt += element.samount;
        this.p_dis += element.discount;
        this.p_tax+=element.tax;
        this.p_amt+=element.amount;
        this.p_fine1+=element.fine1;
        this.p_fine2+=element.fine2;
        this.p_adjust+=element.adjust;
        this.p_sgst+=element.sgst;
        this.p_cgst+=element.cgst;
        this.p_igst+=element.igst
      })

      //alert(JSON.stringify(this.detrecords))
      this.p_samt=parseFloat(this.p_samt.toFixed(3));
      this.p_dis=parseFloat(this.p_dis.toFixed(3));
      this.p_tax=parseFloat(this.p_tax.toFixed(3));
      this.p_amt=parseFloat(this.p_amt.toFixed(3));
      this.p_fine1=parseFloat(this.p_fine1.toFixed(3));
      this.p_fine2=parseFloat(this.p_fine2.toFixed(3));
      this.p_adjust=parseFloat(this.p_adjust.toFixed(3));
      this.p_sgst=parseFloat(this.p_sgst.toFixed(3));
      this.p_cgst=parseFloat(this.p_cgst.toFixed(3));
      this.p_igst=parseFloat(this.p_igst.toFixed(3));
  
    });
   
        err => {
      console.log(err);
    }

    this.istableshow = !this.istableshow;
  }
  
  LoadRecords1() {
    this.records=[];
    this.myService.salRecords(this.fdate.toString(),this.tdate.toString()).subscribe(res => {
      this.records = res;
      res.forEach(element => {
        this.p_samt += element.samount;
        this.p_dis += element.discount;
        this.p_tax+=element.tax;
        this.p_amt+=element.amount;
        this.p_fine1+=element.fine1;
        this.p_fine2+=element.fine2;
        this.p_adjust+=element.adjust;
        this.p_sgst+=element.sgst;
        this.p_cgst+=element.cgst;
        this.p_igst+=element.igst
      })

      //alert(JSON.stringify(this.detrecords));
    
   
     
      
      alert(JSON.stringify(this.records));
      this.p_samt=parseFloat(this.p_samt.toFixed(3));
      this.p_dis=parseFloat(this.p_dis.toFixed(3));
      this.p_tax=parseFloat(this.p_tax.toFixed(3));
      this.p_amt=parseFloat(this.p_amt.toFixed(3));
      this.p_fine1=parseFloat(this.p_fine1.toFixed(3));
      this.p_fine2=parseFloat(this.p_fine2.toFixed(3));
      this.p_adjust=parseFloat(this.p_adjust.toFixed(3));
      this.p_sgst=parseFloat(this.p_sgst.toFixed(3));
      this.p_cgst=parseFloat(this.p_cgst.toFixed(3));
      this.p_igst=parseFloat(this.p_igst.toFixed(3));
  
    });
   
        err => {
      console.log(err);
    }

    this.istableshow = !this.istableshow;
  }
  ngOnInit(): void {
    let latest_date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.fdate=latest_date;
    this.tdate=latest_date;
    
    

    //alert("Route data");
    if(this.route.snapshot.paramMap.get('id')=="1")
    {
      //alert('purchase');
      this.title="Purchase Register Billwise";  
      this.LoadRecords;    
    }
    else if(this.route.snapshot.paramMap.get('id')=="2")
    {
     // alert('sale');
      this.title="Sale Register Billwise"; 
      this.LoadRecords1;     
    }
    //alert(this.route.snapshot.paramMap.get('id'));
   
  }
  onchange(et:any){
    this.tdate=this.datepipe.transform(et, 'yyyy-MM-dd');    
    if(this.route.snapshot.paramMap.get('id')=="1")
    {
      //alert('purchase');
      //this.title="Purchase Register Billwise";  
      this.LoadRecords();    
    }
    else if(this.route.snapshot.paramMap.get('id')=="2")
    {
      //alert('sale');
      //this.title="Sale Register Billwise"; 
      this.LoadRecords1();     
    }
  }
  onchange1(et:any){
    this.fdate=this.datepipe.transform(et, 'yyyy-MM-dd');    
    //this.LoadRecords();
  }
changetitle(t:any)
{

 
}

}

