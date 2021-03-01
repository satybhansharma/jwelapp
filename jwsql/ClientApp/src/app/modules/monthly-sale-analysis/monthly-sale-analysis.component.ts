import { Component, OnInit } from '@angular/core';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'

@Component({
  selector: 'app-monthly-sale-analysis',
  templateUrl: './monthly-sale-analysis.component.html',
  styleUrls: ['./monthly-sale-analysis.component.css']
})
export class MonthlySaleAnalysisComponent implements OnInit {

  gridOptions: GridOptions;

  columnDefs = [
    {
      headerName: "Summary On",
      field: "",
      sortable: true,
      width:550,
      filter: true
    },
    {
      headerName: "Apr",
      field: "",
      sortable: true,
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "May",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "June",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "July",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Aug",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Sep",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Oct",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Nov",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Dec",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Jan",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Feb",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Mar",
      field: "",
      filter: true,
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Total",
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
