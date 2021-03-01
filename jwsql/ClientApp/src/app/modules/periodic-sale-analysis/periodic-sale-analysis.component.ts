import { Component, OnInit } from '@angular/core';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'
import { PeriodicsaleService } from './periodicsale.service';
import { JsonStorageTranscoder } from 'ngx-webstorage-service';

@Component({
  selector: 'app-periodic-sale-analysis',
  templateUrl: './periodic-sale-analysis.component.html',
  styleUrls: ['./periodic-sale-analysis.component.css']
})
export class PeriodicSaleAnalysisComponent implements OnInit {

  gridOptions: GridOptions;

  columnDefs = [
    {
      headerName: "Wt. Range",
      field: "wt",
      sortable: true,
      width:280,
      filter: true,
      cellStyle:{'padding-left':'2px'}
    },
    {
      headerName: "Apr-June",
      field: "tc1",
      sortable: true,
      filter: true,
      width:220,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "July-Sep",
      field: "tc2",
      filter: true,
      width:220,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Oct-Dec",
      field: "tc3",
      filter: true,
      width:220,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Jan-March",
      field: "tc4",
      filter: true,
      width:220,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px','text-align': 'right' }
    }
  ];
 
  constructor(private myService:PeriodicsaleService) { }
  precords: any[];
  
  
  // detrecords: any[];
  // excellist: any[];
   //p_samt: number = 0;
   

  istableshow = false;
  private gridApi;
  private rowClassRules;
  LoadRecords() {
    //alert(1);
    this.myService.Records().subscribe(res => {
      this.precords = res["value"];
      //alert(JSON.stringify(res["value"]));
      
      

      //alert(JSON.stringify(this.precords));
    
   
     
      
     // alert(JSON.stringify(this.records));
      
  
    });
   
        err => {
      console.log(err);
    }

    this.istableshow = !this.istableshow;
  }
  onGridReady(params) {

    this.gridApi=params.api;
       
        //this.gridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true))
        window.onresize = () => { params.api.sizeColumnsToFit(); }
      }
      onGridSizeChanged(params) {
        params.api.sizeColumnsToFit();
      }
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }
  ngOnInit(): void {
    this.LoadRecords();
  }
  
}
