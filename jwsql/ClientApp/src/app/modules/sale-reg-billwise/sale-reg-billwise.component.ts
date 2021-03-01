import { Component, OnInit } from '@angular/core';
import {GridOptions,GridOptionsWrapper} from 'ag-grid-community';
import { param } from 'jquery';
import {AgGridAngular} from 'ag-grid-angular'


@Component({
  selector: 'app-sale-reg-billwise',
  templateUrl: './sale-reg-billwise.component.html',
  styleUrls: ['./sale-reg-billwise.component.css']
})
export class SaleRegBillwiseComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs = [
    {
      headerName: "Narration",
      field: "",     
      sortable: true,
      filter: true,
       cellStyle:{'header-background-color':'black'}
    },
    {
      headerName: "Party Name",
      field: "",
      
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right','vertical-align':'middle' },
    },
    {
      headerName: "City",
      field: "",
      sortable: true,
      width:250,
      //valueFormatter:params => params.data.pwt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Series",
      field: "",
      //sortable: true,
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Pur.Amt.",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Discount",
      field: "",
      //sortable: true,
      //valueFormatter : params => params.data.age.toFixed(2),
      //filter: 'agNumberColumnFilter',
      cellStyle: {border: 'solid', borderTopWidth: '0px', borderRightWidth: '0.5px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Tax",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Bill Amt.",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "G.Fine",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "S.Fine",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "Adjust",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "CGST",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "SGST",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: { border: 'solid', borderTopWidth: '0px', borderRightWidth: '0px', borderLeftWidth: '0.5px', borderBottomWidth: '0px', 'text-align': 'right' },
    },
    {
      headerName: "IGST",
      field: "",
      //sortable: true,floattingFilter:true,
      //valueFormatter:params => params.data.swt.toFixed(3),
      //filter: 'agNumberColumnFilter',
      cellStyle: {'text-align': 'right' },
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
