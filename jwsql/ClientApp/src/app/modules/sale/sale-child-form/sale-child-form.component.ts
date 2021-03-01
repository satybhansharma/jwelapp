import { Component, Inject, inject, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { ItemService } from '../itemmaster/item.service';
//import { SaleformService } from '../sale-form/saleform.service';
//import { StampService } from '../stamp/stamp.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
//import { DatacommunicationService } from '../../shared/services/datacommunication.service';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { JsonpClientBackend } from '@angular/common/http';
import { date } from 'ngx-custom-validators/src/app/date/validator';
import { number } from 'ngx-custom-validators/src/app/number/validator';
import { ItemService } from '../../itemmaster/item.service';
import { StampService } from '../../stamp/stamp.service';
//import { SaleformService } from '../saleform.service';
import { DatacommunicationService } from '../../../shared/services/datacommunication.service';
import { AccmasterService } from '../../../shared/services/accmaster.service';
import { SaleService } from '../service/sale.service';


@Component({
  selector: 'app-sale-child-form',
  templateUrl: './sale-child-form.component.html',
  styleUrls: ['./sale-child-form.component.css'],
  
})
export class SaleChildFormComponent implements OnInit  {
  
  constructor(
    public dialog: MatDialog,
    private Items: ItemService,
    private Stamps: StampService,
    private saleService: SaleService,
    private fb: FormBuilder,
    private ds: DatacommunicationService,
    private accMast: AccmasterService,
    @Inject(MAT_DIALOG_DATA)public Data) { }
  
  
  typeList = [];
  itemList = [];
  stampList = [];
  accMastList = [];
  keyword = 'name';
  transaction_Type = 'S';
 
  form: FormGroup;
  GridRow = {};
 
  
  formInit() {
    this.form = this.fb.group({
      transactionType: [''],
      sItem: [''],
      sStamp: [''],
      sRemark: [''],
      sPc: [0],
      sGwt: [0],
      sLwt: [0],
      sNwt: [0],
      sTunch: [0],
      sWstg: [0],
      sMrate: [0],
      sLbr: [0],
      sOn: [0],
      sFine: [0],
      sAmount: [0],
      mrItem: [''],
      mrRemark: [''],
      mrGwt: [0],
      mrNwt: [0],
      mrTunch: [0],
      mrMrate: [0],
      mrFine: [0],
      mrAmount: [0],
      receiptVPaymentMode:[0],
      recCash: [0],
      recCard: [0],
      recCheque: [''],
      recOther: [''],
      recAccName: [''],
      recRemark: [''],
      recAmount: [0],
      
      gpbRemark: [''],
      gbpWeight: [0],
      gbpTunch: [0],
      gbpRate: [0],
      gpbRTunch: [0],
      gpbAmount: [0],
      gpbFine: [0],


      trnType: [''],
      trnAccName: [''],
      trnRemark: [''],
      trnGold: [''],
      trnSilver: [0],
      trnAmount:[0],
      isAction: [1],
      actionType:['']


      
    });
  }

  //Submit Form
  submitForm() {
    

    let data = this.form.getRawValue();

    if (data["transactionType"]["id"] === undefined) {
      
      this.form.patchValue({
        "transactionType": this.Data["data"]["transactionType"]
      });
    }

    if (data["sItem"]["id"] == undefined) {

      this.form.patchValue({
        "sItem": this.Data["data"]["sItem"]
      });
    }
    if (data["sStamp"]["id"] == undefined) {
      this.form.patchValue({
        "sStamp": this.Data["data"]["transactionType"]
      });
    }
   // if(data[""])
    data = this.form.getRawValue();
    this.ds._sendSaleChildData(data);
   

    this.closeDialog();
  }

  

  ngOnInit() {
    this.GetTypes();
    this.GetItemsList();
    this.GetStampList();
    this.GetAccountsList();
    
    //Initialize the Form
    this.formInit();
    try {
      
      let action = this.Data["action"];

      this.form.patchValue({ "actionType": this.Data["action"] });
      if (this.Data["data"]["transactionType"]["id"] != undefined) {
        
        this.editData(this.Data["data"]);
      }
      else {
      
      }
    } catch (e) {

    }

    this.onChanges();
    
    
 

    
    
  
   
   
  }




  

  //Get Transaction Type
  selectType(selected_value: any) {

    this.transaction_Type = selected_value["id"];
  
   
  }

  selectItem(item) {
    //alert(JSON.stringify(item));
  }

  selectStamp(item) {
    //alert(JSON.stringify(item));
  }

  selectAccount(item) {
   
  }

  selectAccountInTransaction(item) {
    //alert(JSON.stringify(item));
  }

  GetPaymentModeValue(event:any) {
   // alert(event.target.value);
    this.form.patchValue({ "receiptVPaymentMode": event.target.value });
   // alert(this.form.get("receiptVPaymentMode").value);
  }

  GetTypes() {

    for (var i = 0; i < this.saleService.GetTypes().length; i++) {
      this.typeList.push({
        id: this.saleService.GetTypes()[i]["id"],
        name:this.saleService.GetTypes()[i]["name"]
      });
    }
    
  }
  GetItemsList() {
    
    this.Items.Records().subscribe(res => {
    //  alert("Items Record");
     // alert(JSON.stringify(res));
      for (var i = 0; i < res.length; i++) {
       
        this.itemList.push({
          id: res[i]["ino"],
          name:res[i]["idesc"]
        });
      }
    });
   
    
  }

  GetStampList() {
    this.Stamps.Records().subscribe(res => {
      
      for (var i = 0; i < res.length; i++) {
        this.stampList.push({
          id: res[i]["stampid"],
          name:res[i]["stamp1"]
        });
      }
    })
  }

  GetAccountsList() {
    this.accMast.Records().subscribe(res => {
      
      for (var i = 0; i < res.length; i++) {
        this.accMastList.push({
          id: res[i]["ACNO"],
          name: res[i]["CNAME"]
        });
      }
     
    });
  }



  closeDialog() {
    event.preventDefault();
    
    this.dialog.closeAll();
  }

  
  
  

  editData(data) {
    
    this.form.patchValue({
    transactionType: data["transactionType"]["name"],
      sItem: data["sItem"]["name"],
      sStamp: data["sStamp"]["name"],
      sRemark: data["sRemark"],
      sPc: data["sPc"],
      sGwt: data["sGwt"],
      sLwt: data["sLwt"],
      sNwt: data["sNwt"],
      sTunch: data["sTunch"],
      sWstg: data["sWstg"],
      sMrate: data["sMrate"],
      sLbr: data["sLbr"],
      sOn: data["sOn"],
      sFine: data["sFine"],
      sAmount: data["sAmount"],
      mrItem: data["mrItem"],
      mrRemark: data["mrRemark"],
      mrGwt: data["mrGwt"],
      mrNwt: data["mrNwt"],
      mrTunch: data["mrTunch"],
      mrMrate: data["mrMrate"],
      mrFine: data["mrFine"],
      mrAmount: data["mrAmount"],
      recCash: data["recCash"],
      recCard: data["recCard"],
      recCheque: data["recCheque"],
      recOther: data["recOther"],
      recAccName: data["recAccName"],
      recRemark: data["recRemark"],
      recAmount: data["recAmount"],
      gpbRemark: data["gpbRemark"],
      gbpWeight: data["gbpWeight"],
      gbpTunch: data["gbpTunch"],
      gbpRate: data["gbpRate"],
      gpbRTunch: data["gpbRTunch"],
      gpbAmount: data["gpbAmount"],
      gpbFine: data["gpbFine"],
      trnNaam: data["trnNaam"],
      trnJama: data["trnJama"],
      trnAccName: data["trnAccName"],
      trnRemark: data["trnRemark"],
      trnGold: data["trnGold"],
      trnSilver: data["trnSilver"],
      trnAmount: data["trnAmount"],
      isAction: data["isAction"]


    });
    
  }

  onFocused(e):void {
    e.stopPropagation();
  }
  TransactionType(event: any) {
   // alert(event.target.value);
  }

  onChanges():void {
    
    //Update Net weight Netwt on Changes Gross Weight
    this.form.get('sGwt').valueChanges.subscribe(val => {
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();
     
    })

    //Update Net Weight NewWt on Changes Less Weight
    this.form.get('sLwt').valueChanges.subscribe(val => {
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();
    })


    //Update Amount in Sale Type using Net weight(Nwt) and Metal Rate
    this.form.get('sMrate').valueChanges.subscribe(val => {
     // this.form.controls['sAmount'].setValue((this.form.get('sNwt').value * val));
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();
    })

 

    //Update Fine in S Type on Tunch Changes
    this.form.get('sTunch').valueChanges.subscribe(val => {
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();
    })

    this.form.get('sWstg').valueChanges.subscribe(val => {
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();
    })

    //calculate Amount Based on Labour On Change Values /sLbr

    this.form.get('sLbr').valueChanges.subscribe(val => {
      
      this.calculationNetwt();
      this.Calculation();
      this.calculationFine();

    })

    this.form.get('sOn').valueChanges.subscribe(val => {
     
      this.calculationNetwt();
     
      this.calculationFine();
      this.Calculation();
    });

    




  }

  Calculation(): void {
    let tunch = this.form.get('sTunch').value;
    let wstg = this.form.get('sWstg').value;
    let grssWtOn = this.form.get('sGwt').value;

    switch (parseInt(this.form.get('sOn').value)) {
      //case 1 For Gross Weight Calculations
      case 0:
        grssWtOn = this.form.get('sGwt').value;
        break;
      //Case 1 For Net Weight Calculations
      case 1:
        grssWtOn = this.form.get('sNwt').value;

        break;
      //Case 2 for Calculation on Pc 
      case 2:
        grssWtOn = this.form.get('sPc').value;

        break;

      default:
    }

    if (tunch <= 0 && wstg <= 0) {
      //SaleAmount=Labour Cost*weight Based on(Grossweight or NetWeight Or Pc)+(Netweight*Metal Rate)
      this.form.controls['sAmount'].setValue((this.form.get('sLbr').value * grssWtOn) + (this.form.get('sNwt').value) * this.form.get('sMrate').value);
    }
    else if (tunch > 0 && wstg > 0) {
      //SaleAmount=Labour Cost*weight Based on(Grossweight or NetWeight Or Pc)+((Netweight*(Tunch+Westage)/100)*Metal Rate)

      this.form.controls['sAmount'].setValue((this.form.get('sLbr').value * grssWtOn) + (this.form.get('sNwt').value * (this.form.get('sTunch').value + this.form.get('sWstg').value)) / 100 * this.form.get('sMrate').value);

    }
    else {
      //SaleAmount=Labour Cost*weight Based on(Grossweight or NetWeight Or Pc)+((Netweight*(Tunch+Westage)/100)*Metal Rate)

      this.form.controls['sAmount'].setValue((this.form.get('sLbr').value * grssWtOn) + (this.form.get('sNwt').value * (this.form.get('sTunch').value + this.form.get('sWstg')) / 100 * this.form.get('sMrate').value))
    }

  }

  calculationNetwt(): void {
    this.form.controls['sNwt'].setValue(this.form.get('sGwt').value- this.form.get('sLwt').value);
    //update Net Amount/sAmount: 
    this.form.controls['sAmount'].setValue(this.form.get('sNwt').value * this.form.get('sMrate').value);

  }
  calculationFine(): void {
    this.form.controls['sFine'].setValue((this.form.get('sNwt').value * (this.form.get('sTunch').value + this.form.get('sWstg').value)) / 100);
    //Update Amount /sAmount
    this.form.controls['sAmount'].setValue(this.form.get('sFine').value * this.form.get('sMrate').value)

  }

  

}
