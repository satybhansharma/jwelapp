import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
//import {StampService} from './stamp.service';
import { JsonpInterceptor } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { JsonPipe } from '@angular/common';
import { IfStmt, ThrowStmt } from '@angular/compiler';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
//import { Stamp } from './stamp';
import { textChangeRangeIsUnchanged } from 'typescript';
import { SelectionModel } from '@angular/cdk/collections';
import { NgModel } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange, TransitionCheckState } from '@angular/material/checkbox';
import { validateBasis } from '@angular/flex-layout';
import { allowedNodeEnvironmentFlags } from 'process';
import { RtlScrollAxisType } from '@angular/cdk/platform';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  stampname: string;
  stunch: number;
  ptunch: number;
  pcwt: number;
  tunchf: number;
  tuncht: number;

}
const ELEMENT_DATA: PeriodicElement[] = [
  { stampname: '22k', stunch: 4.5, ptunch: 4.5, pcwt: 4.2, tunchf: 2.2, tuncht: 3.3 },
  { stampname: '22k', stunch: 4.5, ptunch: 4.5, pcwt: 4.2, tunchf: 2.2, tuncht: 3.3 },
  { stampname: '22k', stunch: 4.5, ptunch: 4.5, pcwt: 4.2, tunchf: 2.2, tuncht: 3.3 },
  { stampname: '22k', stunch: 4.5, ptunch: 4.5, pcwt: 4.2, tunchf: 2.2, tuncht: 3.3 },
  { stampname: '22k', stunch: 4.5, ptunch: 4.5, pcwt: 4.2, tunchf: 2.2, tuncht: 3.3 }

];

@Component({
  selector: 'app-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.css']
})
export class StampComponent implements AfterViewInit {

  //Declration Variable
  isDiamondDivHide: boolean = true;
  isgoldDivHide: boolean = true;
  stampForm: FormGroup;
  isUpdate: boolean = false;
  updateRecord: boolean = false;

  constructor(public dialog: MatDialog) { }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  // @ViewChild (MatPaginator)paginator:MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @Input() checked: boolean;
  displayedColumns: string[] = ['select', 'id', 'stampname', 'stunch', 'ptunch', 'pcwt', 'tunchf', 'tuncht'];
  datasource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {

  }
  /*  constructor(private fb:FormBuilder) {
       this.stampForm=new FormGroup({
         stamp:new FormControl('',Validators.required),
         diast:new FormControl('',Validators.required),
         idesc:new FormControl('',Validators.required)
         
 
       });
 
    } */

  //Declartion Method


  //@ViewChild(MatTable,{static:true})table:MatTable<any>;





  //stampRecord:Stamp;
  IsDeleteBttnHide: boolean = true;
  isHidden: boolean = true;
  //stamp:Stamp[]=[];
  localRecord = {};
  diast: string = "";
  idesc: string = "";
  stampid: number;
  isChecked;
  isCheckedName;
  checkboxValue: boolean;
  checkedId: any;
  isHiddenTable: boolean = false;
  selection = new SelectionModel<any>(false, []);
  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {
    // this.StampService.getAll().subscribe(res=>{
    //this.stamp=res;
    //});
    // this.unitForm=this.fb.group({
    //   name:['',Validators.required],
    //   qty:['',Validators.required],
    //   decimal:['',Validators.required]
    // });

  }

  isViewDiamondView() {
    this.isDiamondDivHide = true;
    this.isgoldDivHide = false;
  }
  isViewgoldView() {
    this.isgoldDivHide = true;
    this.isDiamondDivHide = false;
  }
  fetchList = () => {

    // this.stamp=[];
    //  this.StampService.getAll().subscribe(res=>{
    //this.stamp=res;
    // });
    //  this.table.renderRows();
  }

  updateCheckValue(row, $event: MatCheckboxChange) {
    this.localRecord = row;
    if ($event.checked) {

      this.isHidden = false;
      //this.stamp=row["stamp"];
      //this.diast=row["diast"];
      //this.idesc=row["idesc"];
      //this.stampid=row["stampid"];
      this.isUpdate = true;
      this.IsDeleteBttnHide = false;


    }
    else {
      this.isHidden = true;
      this.isUpdate = false;
      this.clearForm();


    }

    alert("Stamp Modified...");



  }

  //Hide Edit update Div
  hidediv = () => {
    this.isHidden = true;
    this.checked = false;
    this.isChecked = false;

  }

  //New Form
  newForm = () => {
    this.isHidden = false;
    this.isHiddenTable = true;
  }


  //get record to Update
  getRecord = (row, i, event: Event) => {

    // alert(JSON.stringify(row))
    this.localRecord = row;
    //this.stamp=this.localRecord["stamp"];
    // this.remark=this.localRecord["remark"];
    // this.decimalPlace=this.localRecord["decimalPlace"];
    alert(`this is event` + event.target);
    event.target.addEventListener
    //this.openDialog('Update',this.localRecord);
    this.isHidden = false;

  }


  DeleteRecord = () => {

    let cnfm = confirm("Are You ensure to delete this record?");

    let id: number = this.localRecord["stampid"];
    alert(id);

    if (cnfm) {
      // this.StampService.Delete(id).subscribe(res=>{

      //   if(res.isSuccess)
      //   {
      //   // this.stamp=[];
      //    this.StampService.getAll().subscribe(res=>{
      //      //this.stamp=res;
      //  });
      // this.table.renderRows();
      // this.clearForm();
      // }
      // else{
      //   alert(res.message);
      // }
      //this.isHidden=true;

      // });
      alert("Record Deleted..");
    }
    else {
      alert("Thank You have a nice Day..");
    }




  }



  submitStampForm(): void {


  }

  clearForm() {

  }

  cancelForm() {
    this.isUpdate = false;
    this.clearForm();
    this.isHidden = true;
    this.isHiddenTable = false;
  }

}
