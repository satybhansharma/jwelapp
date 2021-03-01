import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'
@Component({
  selector: 'app-purchase-planner',
  templateUrl: './purchase-planner.component.html',
  styleUrls: ['./purchase-planner.component.css']
})
export class PurchasePlannerComponent implements OnInit {

  gridOptions: GridOptions;

  columnDefs = [
    {
      headerName: "Item",
      field: "",
      sortable: true,
      filter: true
    },
    {
      headerName: "Wt. Range",
      field: "",
      sortable: true,
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Supplier",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Avg.Sales",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "In Stock",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Reqd.PC",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Reqd.Wt",
      field: "",
      filter: 'agNumberColumnFilter',
      cellStyle: { 'text-align': 'right' },
    }
  ];
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady(params) {

    this.gridApi=params.api;
       
        //this.gridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true))
        window.onresize = () => { params.api.sizeColumnsToFit(); }
      }
  constructor() { }
  private gridApi;
  ngOnInit(): void {

  }
}
