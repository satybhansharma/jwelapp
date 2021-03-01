import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { JsonpClientBackend } from '@angular/common/http';
import { stringify } from 'querystring';
import { NumericLiteral, isNamedExportBindings, isNamedTupleMember } from 'typescript';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ItemService } from '../item.service';
import { AlertType, AlertService } from '../../../shared/_alert';
import { CategoryService } from '../../category/category.service';
import { IgroupService } from '../../igroup/igroup.service';
import { StampService } from '../../stamp/stamp.service';
import { GcodeService } from '../../gcode/gcode.service';
import { UnitmasterService } from '../../unitmaster/unitmaster.service';
import { Event } from '@angular/router';
import { KEY_CODE } from 'src/app/shared/services/KeyBoardCode';
//import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

@Component({
  selector: 'app-crud-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  recievegrp(data:any){  
  //alert("I got the Data");
  // alert(JSON.stringify(data));
    if(data=="")
    {
     // alert("hhhh");
      this.form.patchValue({    
      igroup:"",igroupId:0
    });
  }
    else
    {
      this.IgroupInitValue = data["igroup1"];
      this.form.patchValue({
        igroupid: this.IgroupInitValue,
        unitid: this.IUnitInitValue,
        gcodeid: this.IGrpInitValue,
        catid: this.ICatInitValue,
        stampid:this.IStampInitValue
});
      this.IgroupSelectId  = data["igroupid"]; 
    
    
  }
    this.isgrpshow=false;
    this.ischildshow=!this.ischildshow;
  }

  recieveunit(data:any){    
    if(data=="")
    { this.form.patchValue({    
      unit:""
    });
  }
    else
    {
      this.IUnitInitValue = data["unit"];
      
      this.form.patchValue({
        igroupid: this.IgroupInitValue,
        unitid: this.IUnitInitValue,
        gcodeid: this.IGrpInitValue,
        catid: this.ICatInitValue,
        stampid:this.IStampInitValue
});
//      this.form.patchValue({
//        unitid: data["unit"]
//      });
      this.IunitSelectId = data["unitid"]; 
    
  }
    this.isunitshow=false;
    this.ischildshow=!this.ischildshow;
  }

  recievegcode(data:any){  
 
    if(data=="")
    { 
      this.form.patchValue({    
        gcode:""
      });
  }
    else
    {
      this.IGrpInitValue = data["gcode1"];

      this.form.patchValue({
        igroupid: this.IgroupInitValue,
        unitid: this.IUnitInitValue,
        gcodeid: this.IGrpInitValue,
        catid: this.ICatInitValue,
        stampid: this.IStampInitValue
      });

      //this.form.patchValue({
      //  gcodeid: data["gcode1"]
      //});
      this.IGrpSelectId  = data["gcodeid"]; 
    
  }
    this.isgcodeshow=false;
    this.ischildshow=!this.ischildshow;
  }

  recievecat(data:any){  
    
    if(data=="")
    { 
      this.form.patchValue({    
        cat:""
      });
  }
    else
    {
      this.ICatInitValue = data["category1"];
      this.form.patchValue({
        igroupid: this.IgroupInitValue,
        unitid: this.IUnitInitValue,
        gcodeid: this.IGrpInitValue,
        catid: this.ICatInitValue,
        stampid: this.IStampInitValue
      });


      //this.form.patchValue({
      //  catid: data["category1"]
      //});
      this.ICatSelectId  = data["gcodeid"]; 
    
  }
    this.isgcodeshow=false;
    this.ischildshow=!this.ischildshow;
  }

  recievestamp(data:any){  
    
    if(data=="")
    { 
      this.form.patchValue({    
        stamp:""
      });
  }
    else
    {
      this.IStampInitValue = data["stamp1"];
      this.form.patchValue({
        igroupid: this.IgroupInitValue,
        unitid: this.IUnitInitValue,
        gcodeid: this.IGrpInitValue,
        catid: this.ICatInitValue,
        stampid: this.IStampInitValue
      });

      //this.form.patchValue({
      //  stampid: data["stamp1"]
      //});
      this.IStampSelectId = data["stampid"]; 
    
  }
    this.isgcodeshow=false;
    this.ischildshow=!this.ischildshow;
  }

  listDisplay = true;
  comboval='';
  isnew = true;
  isgrpshow=false;
  isFormDisplay = false;
  itemRecord: any;
  isDelete = false;
  ischildshow=false;
  isigroupshow=false;
  isunitshow=false;
  isgcodeshow=false;
  iscategoryshow=false;
  isstampshow=false;
  

  //variable for Options Data
  IGroupSelect = [];
  
  //On Igroup Select
  keyword1 = 'name';
  CatSelect = [];
  catkeyword: string = "";
  stampSelect = [];
  gcodeSelect = [];
  unitSelect = [];

  IgroupSelectId: number = 0;
  IgroupInitValue: string = "";
  IunitSelectId: number = 0;
  IUnitInitValue: string = "";
  ICatSelectId: number = 0;
  ICatInitValue: string = "";
  IGrpSelectId: number = 0;
  IGrpInitValue: string = "";
  IStampSelectId: number = 0; 
  IStampInitValue: string = "";


  form: FormGroup;
  operationType: any = "Add";
  title = "Add New Unit";
  isHide = true;
  submitted = false;
  storageData: any;
  isLoadingResult = true;

  showfooterSection: boolean = true;


  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  toggleDisplay() {
    this.listDisplay = !this.listDisplay;
    this.isFormDisplay = true;
    this.isnew = false;
    this.isDelete = false;
    this.operationType = "Add";
    this.stockSelected = false;
    this.RestrictionSelected = false;
    this.AddSettingSelected = false;
    this.clearForm();
  }
  constructor(
    private myService: ItemService,
    private fb: FormBuilder,
    public alertService: AlertService,
    private cat: CategoryService,
    private ItemGrp: IgroupService,
    private stamp: StampService,
    private gcode: GcodeService,
    private unitSer: UnitmasterService) {
      

  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode ===KEY_CODE.ESCAPE) {
      this.close();
    }

   
    
  }

  initForm() {
    this.form = this.fb.group({
      ino: [0],
      idesc: [''],
      pname: [''],
      shortname: [''],
      hpname: [''],
      igroupid: [],
      unitid: [],
      srateunit: [false],
      lcode: [''],
      grade: [''],
      gcodeid: [],
      badhel: [0],
      catid: [],
      shortcnm: [''],
      stmethod: [0],
      //stocking By
      sm: [0],
      tpre: [''],
      pc: [0],
      treypc: [0],
      tgdigit: [0],
      desidigit: [0],
      twodet: [false],
      linktg: [false],
      //LinkItem Drop Down
      linkino: [0],
      starttgno: [0],
      maxtgno: [0],
      ditemrate: [0],
      prncmd: [''],
      polywt: [0],
      boxwt: [0],
      sqrmtr: [0],
      wirewt: [0],
      bpretype: [0],
      stval: [0],
      stvaltunch: [0],
      stvalwstg: [0],
      stvallbr: [0],
      istud: [false],
      pexwt: [0],
      stampid: [''],
      deftunch: [0],
      pcstock: [false],
      polish: [0],
      intorate: [0],
      blist: [false],
      cgwt: [false],
      cbeeds: [false],
      tgstkless: [false],
      restgwt: [false],
      resttunch: [false],
      restwstg: [false],
      restrate: [false],
      restzero: [false],
      reststamp: [false],
      restbatch: [false],
      restoth: [false],
      restwl: [false],
      restpc: [false],
      irgwt: [false],
      cstamp: [false],
      stones: [false],
      sale: [false],
      purchase: [false],
      stock: [false],
      partydst: [false],
      karigar: [false],
    
      lessdet: [false],
      desipre: [''],
      svstk: [false],
      saleless: [''],
      pointupon: [''],
      raparate: [''],
      gcon: [''],
      scon: [''],
      dtrnstk: ['']
    });

  }

  optionSelected = false;

  


  selectUnit(event: Event) {
   
    this.IunitSelectId = event["id"];
    this.IUnitInitValue = event["name"];
   // alert("Initial Value"+this.IUnitInitValue);

  }
  selectItemGroup(event: Event) {
    this.IgroupSelectId = event["id"];
    this.IgroupInitValue = event["name"];

  }

  selectGCode(event: Event) {
    this.IGrpSelectId = event["id"];
    this.IGrpInitValue = event["name"];
  }
  selectCat(event: Event) {
    this.ICatSelectId = event["id"];
    this.ICatInitValue = event["name"];
  }
  selectStamp(event: Event) {
    this.IStampSelectId = event["id"];
    this.IStampInitValue = event["name"];

  }



  fillSelect() {
    //Fill Category
    this.cat.Records().subscribe(res => {

      for (var i = 0; i < res.length; i++) {
         
        this.CatSelect.push({
          id: res[i]["catid"],
          name: res[i]["category1"]
        });
      }
      this.CatSelect.push({
        id: -1,
        name: "New Category"
      });
    });
    //Fill Unit

    this.unitSer.Records().subscribe(res => {
      for (var i = 0; i < res.length; i++) {
        this.unitSelect.push({
          id: res[i]["unitid"],
          name: res[i]["unit"]
        });
      }
      this.unitSelect.push({ id: -1, name: 'New Unit' });

      //  console.log("Unit select");
      //  console.log(this.unitSelect);

    })
    //fill Stamp
    this.stamp.Records().subscribe(res => {
      for (var i = 0; i < res.length; i++) {
        this.stampSelect.push({
          id: res[i]["stampid"],
          name: res[i]["stamp1"]
        });
      }

      this.stampSelect.push({
        id: -1,
        name: 'New Stamp'
      });

      // console.log("Stamp select");
      //  console.log(this.stampSelect);

    })
    //fill gcode

    this.gcode.Records().subscribe(res => {

      for (var i = 0; i < res.length; i++) {
        this.gcodeSelect.push({
          id: res[i]["gcodeid"],
          name: res[i]["gcode1"]
        });
      }

      // console.log("GCode select");
      // console.log(this.gcodeSelect);
      this.gcodeSelect.push({
        id: -1,
        name: "New Gcode"
      });
    })

    //fill igroup
    this.ItemGrp.Records().subscribe(res => {
      
      let data = [];
      for (var i = 0; i < res.length; i++) {
        
        data.push({
          "id": res[i]["igroupid"],
          "name": res[i]["igroup1"]
        });

       

      }
      this.IGroupSelect = data;
      this.IGroupSelect.push({
        "id": -1,
        "name": "New Igroup"
      });
    })

  }
  getValue(value: string) {
    // alert(value);
  }

  onChangeSearch(search: string) {
   
    // And reassign the 'data' which is binded to 'data' property.
    this.optionSelected = false;
  }

  onFocused(ctrlName: string) {


    // do something
  }



  getServerResponse(event) { }


  selectEvent1(event: Event) { }


  unitselectEvent(event: any) {

  }
  catselectEvent(event: any) {
  }


  ngOnInit(): void {
    this.LoadRecords();
    this.initForm();

    this.fillSelect();


    this.operationType = "Add";




    

  }


  childComponent(data:any)
  { 
    this.ischildshow=!this.ischildshow;
    if(data==1)
    {
      this.isgrpshow=true;
      this.isunitshow=false;
      this.isgcodeshow=false;
      this.iscategoryshow=false;
      this.isstampshow=false;
    }
    else if(data==2)
    {
      this.isgrpshow=false;
      this.isunitshow=true;
      this.isgcodeshow=false;
      this.iscategoryshow=false;
      this.isstampshow=false;
    }
    else if(data==3)
    { 
      this.isgrpshow=false;     
      this.isunitshow=false;
      this.isgcodeshow=true;
      this.iscategoryshow=false;
      this.isstampshow=false;
    }
    else if(data==4)
    {      
      this.isgrpshow=false;
      this.isunitshow=false;
      this.isgcodeshow=false;
      this.iscategoryshow=true;
      this.isstampshow=false;
    }
    else if(data==5)
    {      
      this.isgrpshow=false;
      this.isunitshow=false;
      this.isgcodeshow=false;
      this.iscategoryshow=false;
      this.isstampshow=true;
    }
  }

  submitForm() {

    

    this.submitted = true;
    if (this.form.invalid) {
      //alert("Invalid Form");
      return;
    }
    this.patchFormValueinSubmit();
   // alert("IStud Value"+this.form.get("istud").value);
    let bindData = {

      "idesc": this.form.get('idesc').value,
      "srateunit": this.form.get('srateunit').value == true ? 1 : 0,
      "istud": this.form.get('istud').value == true ? 1 : 0,
      "pexwt": this.form.get('pexwt').value,
      "pcstock": this.form.get('pcstock').value == true ? 1 : 0,
      "blist": this.form.get('blist').value == true ? 1 : 0,
      "cgwt": this.form.get('cgwt').value == true ? 1 : 0,
      "cbeeds": this.form.get('cbeeds').value == true ? 1 : 0,
      "tgstkless": this.form.get('tgstkless').value == true ? 1 : 0,
      "restgwt": this.form.get('restgwt').value == true ? 1 : 0,
      "resttunch": this.form.get('resttunch').value == true ? 1 : 0,
      "restwstg": this.form.get('restwstg').value == true ? 1 : 0,
      "restrate": this.form.get('restrate').value == true ? 1 : 0,
      "restzero": this.form.get('restzero').value == true ? 1 : 0,
      "reststamp": this.form.get('reststamp').value == true ? 1 : 0,
      "restbatch": this.form.get('restbatch').value == true ? 1 : 0,
      "restoth": this.form.get('restoth').value == true ? 1 : 0,
      "restwl": this.form.get('restwl').value == true ? 1 : 0,
      "restpc": this.form.get('restpc').value == true ? 1 : 0,
      "irgwt": this.form.get('irgwt').value == true ? 1 : 0,
      "cstamp": this.form.get('cstamp').value == true ? 1 : 0,
      "stones": this.form.get('stones').value == true ? 1 : 0,
      "sale": this.form.get('sale').value == true ? 1 : 0,
      "purchase": this.form.get('purchase').value == true ? 1 : 0,
      "stock": this.form.get('stock').value == true ? 1 : 0,
      "partydst": this.form.get('partydst').value == true ? 1 : 0,
      "karigar": this.form.get('karigar').value == true ? 1 : 0,

      "lessdet": this.form.get('lessdet').value == true ? 1 : 0,
      "svstk": this.form.get('svstk').value == true ? 1 : 0,
      "twodet": this.form.get('twodet').value == true ? 1: 0,
      "treypc": this.form.get('treypc').value == null ? 0 : this.form.get('treypc').value,
      "tpre": this.form.get('tpre').value == null ? 0 : this.form.get('tpre').value,
      "tgdigit": this.form.get('tgdigit').value == null ? 0 : this.form.get('tgdigit').value,
      "starttgno": this.form.get('starttgno').value == null ? 0 : this.form.get('starttgno').value,
      "scon": this.form.get('scon').value == null ? 0 : this.form.get('scon').value,
      "saleless": this.form.get('saleless').value == null ? "" : this.form.get('saleless').value,
      "raparate": this.form.get('raparate').value == null ? "" : this.form.get('raparate').value,
      "prncmd": this.form.get('prncmd').value == null ? "" : this.form.get('prncmd').value,
      "pointupon": this.form.get('pointupon').value == null ? "" : this.form.get('pointupon').value,
      "maxtgno": this.form.get('maxtgno').value == null ? 0 : this.form.get('maxtgno').value,
      "linktg": this.form.get('linktg').value == true ? 1: 0,
      "linkino": this.form.get('linkino').value == null ? 0 : this.form.get('linkino').value,
      "ino": this.form.get('ino').value == null ? 0 : this.form.get('ino').value,
      "gcon": this.form.get('gcon').value == null ? 0 : this.form.get('gcon').value,
      "dtrnstk": this.form.get('dtrnstk').value == null ? 0 : this.form.get('dtrnstk').value,
      "desipre": this.form.get('desipre').value == null ? "" : this.form.get('desipre').value,
      "desidigit": this.form.get('desidigit').value == null ? 0 : this.form.get('desidigit').value,
      "pc": this.form.get('pc').value == null ? 0 : this.form.get('pc').value,
      "pname": this.form.get('pname').value,
      "shortname": this.form.get('shortname').value == null ? "" : this.form.value.shortname,
      "hpname": this.form.get('hpname').value == null ? "" : this.form.value.hpname,
      "igroupid": this.IgroupSelectId,
      "unitid": this.IunitSelectId,
      "lcode": this.form.get('lcode').value == null ? "" : this.form.value.lcode,
      "grade": this.form.get('grade').value == null ? "" : this.form.value.grade,
      "gcodeid": this.IGrpSelectId,
      "badhel": this.form.get('badhel').value == null ? 0 : this.form.value.badhel,
      "catid": this.ICatSelectId,
      "shortcnm": this.form.get('shortcnm').value == null ? "" : this.form.value.shortcnm,
      "stmethod": this.form.get('stmethod').value == null ? 0 : this.form.value.stmethod,
      //stocking By
      "sm": this.form.get('sm').value==null ? 0 : this.form.value.sm,

      "ditemrate": this.form.get('ditemrate').value == null ? 0 : this.form.value.ditemrate,

      "polywt": this.form.get('polywt').value == null ? 0 : this.form.value.polywt,
      "boxwt": this.form.get('boxwt').value == null ? 0 : this.form.value.boxwt,

      "sqrmtr": this.form.get('sqrmtr').value == null ? 0 : this.form.value.sqrmtr,

      "wirewt": this.form.get('wirewt').value == null ? 0 : this.form.value.wirewt,

      "bpretype": this.form.get('bpretype').value == null ? 0 : this.form.value.bpretype,

      "stval": this.form.get('stval').value == null ? 0 : this.form.value.stval,

      "stvaltunch": this.form.get('stvaltunch').value == null ? 0 : this.form.value.stvaltunch,

      "stvalwstg": this.form.get('stvalwstg').value == null ? 0 : this.form.value.stvalwstg,

      "stvallbr": this.form.get('stvallbr').value == null ? 0 : this.form.value.stvallbr,

      "stampid": this.IStampSelectId,

      "deftunch": this.form.get('deftunch').value == null ? 0 : this.form.value.deftunch,

      "polish": this.form.get('polish').value == null ? 0 : this.form.value.polish,

      "intorate": this.form.get('intorate').value == null ? 0 : this.form.value.intorate,
      

    }

   // alert(JSON.stringify(bindData));
    //Add Data Here
    if (this.operationType == "Add") {
      //alert(this.form.get('bpretype').value);
      //alert(this.form.get('stmethod').value);

     

 // alert(JSON.stringify(bindData));
      this.myService.Create(bindData).subscribe(res => {

        this.alertService.success(res["message"],this.alertOptions);
        if (res["isSuccess"]) {
         
          this.form.reset();
          this.isFormDisplay = false;
          this.listDisplay = true;
          this.LoadRecords();
          this.isnew = true;
          this.initForm();
        }
        else {

          this.alertService.warn(res["message"], this.alertOptions);
          //alert(res["message"]);

        }
        
      });
    }

    //Update data Here
    if (this.operationType == "Update") {
     
     

     

      this.myService.Update(bindData).subscribe(res => {
        
        if (res["isSuccess"]) {

          this.alertService.success(res["message"], this.alertOptions);

        //  alert(res["message"]);
          this.form.reset();
          this.isFormDisplay = false;
          this.listDisplay = true;
          this.LoadRecords();
          this.isnew = true;
          this.operationType = "Add";
          this.isDelete = false;
          this.initForm();
        }
        else {

          this.alertService.warn(res["message"], this.alertOptions);
          //alert(res["message"]);

        }
      });
    }


  }

  patchFormValueinSubmit() {

    
    this.form.patchValue({
      srateunit: this.form.get('srateunit').value == true ? 1 : 0,
      istud: this.form.get('istud').value == true ? 1 : 0,
      pexwt: this.form.get('pexwt').value == null ? 0 : this.form.get('pexwt').value,
      pcstock: this.form.get('pcstock').value == true ? 1 : 0,
      blist: this.form.get('blist').value == true ? 1 : 0,
      cgwt: this.form.get('cgwt').value == true ? 1 : 0,
      cbeeds: this.form.get('cbeeds').value == true ? 1 : 0,
      tgstkless: this.form.get('tgstkless').value == true ? 1 : 0,
      restgwt: this.form.get('restgwt').value == true ? 1 : 0,
      resttunch: this.form.get('resttunch').value == true ? 1 : 0,
      restwstg: this.form.get('restwstg').value == true ? 1 : 0,
      restrate: this.form.get('restrate').value == true ? 1 : 0,
      restzero: this.form.get('restzero').value == true ? 1 : 0,
      reststamp: this.form.get('reststamp').value == true ? 1 : 0,
      restbatch: this.form.get('restbatch').value == true ? 1 : 0,
      restoth: this.form.get('restoth').value == true ? 1 : 0,
      restwl: this.form.get('restwl').value == true ? 1 : 0,
      restpc: this.form.get('restpc').value == true ? 1 : 0,
      irgwt: this.form.get('irgwt').value == true ? 1 : 0,
      cstamp: this.form.get('cstamp').value == true ? 1 : 0,
      stones: this.form.get('stones').value == true ? 1 : 0,
      sale: this.form.get('sale').value == true ? 1 : 0,
      purchase: this.form.get('purchase').value == true ? 1 : 0,
      stock: this.form.get('stock').value == true ? 1 : 0,
      partydst: this.form.get('partydst').value == true ? 1 : 0,
      karigar: this.form.get('karigar').value == true ? 1 : 0,
      lessdet: this.form.get('lessdet').value == true ? 1 : 0,
      svstk: this.form.get('svstk').value == true ? 1 : 0,
      twodet: this.form.get('twodet').value == true ? 1:0,
      treypc: this.form.get('treypc').value == null ? 0 : this.form.get('treypc').value,
      tpre: this.form.get('tpre').value == null ? 0 : this.form.get('tpre').value,
      tgdigit: this.form.get('tgdigit').value == null ? 0 : this.form.get('tgdigit').value,
      starttgno: this.form.get('starttgno').value == null ? 0 : this.form.get('starttgno').value,
      scon: this.form.get('scon').value == null ? 0 : this.form.get('scon').value,
      saleless: this.form.get('saleless').value == null ? "" : this.form.get('saleless').value,
      raparate: this.form.get('raparate').value == null ? "" : this.form.get('raparate').value,
      prncmd: this.form.get('prncmd').value == null ? "" : this.form.get('prncmd').value,
      pointupon: this.form.get('pointupon').value == null ? "" : this.form.get('pointupon').value,
      maxtgno: this.form.get('maxtgno').value == null ? 0 : this.form.get('maxtgno').value,
      linktg: this.form.get('linktg').value == true?1:0,
      linkino: this.form.get('linkino').value == null ? 0 : this.form.get('linkino').value,
      ino: this.form.get('ino').value == null ? 0 : this.form.get('ino').value,
      gcon: this.form.get('gcon').value == null ? 0 : this.form.get('gcon').value,
      dtrnstk: this.form.get('dtrnstk').value == null ? 0 : this.form.get('dtrnstk').value,
      desipre: this.form.get('desipre').value == null ? "" : this.form.get('desipre').value,
      desidigit: this.form.get('desidigit').value == null ? 0 : this.form.get('desidigit').value,
      pc: this.form.get('pc').value == null ? 0 : this.form.get('pc').value,
      unitid: this.IunitSelectId,
      igroupid: this.IgroupSelectId,
      catid: this.ICatSelectId,
      gcodeid: this.IGrpSelectId,
      stampid: this.IStampSelectId,
      
    });
   
  }
  clearform() {
    
    this.IgroupSelectId = 0;
    this.IgroupInitValue = "";
    this.IunitSelectId = 0;
    this.IUnitInitValue = "";
    this.ICatSelectId = 0;
    this.ICatInitValue = "";
    this.IGrpSelectId = 0;
    this.IGrpInitValue = "";
    this.IStampSelectId = 0;
    this.IStampInitValue = "";

  }

  
  cancel(): void {
    this.clearForm();
    this.isFormDisplay = false;
    this.listDisplay = true;
    this.isnew = true;
    this.initForm();
    this.clearForm();
   


  }

  Delete(item:any): void {
    let cnfm = confirm("Are You Sure to Delete this Record?");
    if (cnfm) {
      this.myService.Delete(this.itemRecord).subscribe(res => {
        if (res["isSuccess"]) {

          this.alertService.success(res["message"], this.alertOptions);

         // alert(res["message"]);
          this.form.reset();
          this.isFormDisplay = false;
          this.listDisplay = true;
          this.LoadRecords();
          this.isnew = true;
          this.operationType = "Add";
          this.isDelete = false;
          this.initForm();
        }
        else {

          this.alertService.warn(res["message"], this.alertOptions);
        //  alert(res["message"]);

        }

      });
    }
    else {
      this.clearForm();
    }

  }

  clearForm(): void {
    this.form.reset();
    this.submitted = false;

  }

  // convenience getter for easy access to form fields for validating the Form
  get f() { return this.form.controls; }

  //Hide Show Data
  stockSelected = false;
  AddStock(value: string) {
   // alert(value); 
    if (value == 'Yes') {
      this.stockSelected = true;
      this.RestrictionSelected = false;
      this.AddSettingSelected = false;
      this.StockBySelected = false;
      
    }
    else {
      this.stockSelected = false;
      this.RestrictionSelected = false;
      this.AddSettingSelected = false;
      this.StockBySelected = false;
    }

  }
  RestrictionSelected = false;
  AddRestriction(value: string) {

    if (value == 'Yes') {

      this.RestrictionSelected = true;
      this.stockSelected = false;
      this.AddSettingSelected = false;
      this.StockBySelected = false;
    }
    else {

      this.RestrictionSelected = false;
      this.stockSelected = false;
      this.AddSettingSelected = false;
      this.StockBySelected = false;
    }

  }
  AddSettingSelected = false;
  AddSetting(value: string) {
    if (value == 'Yes') {
      this.AddSettingSelected = true;
      this.RestrictionSelected = false;
      this.stockSelected = false;
      this.StockBySelected = false;


    }
    else {
      this.AddSettingSelected = false;
      this.RestrictionSelected = false;
      this.stockSelected = false;
      this.StockBySelected = false;

    }
    //alert("Additonl Setting Value"+value);

  }
  StockBySelected = false;
  AddStockBy(value: string) {

    if (value == '2' || value=='3') {
      this.stockSelected = false;
      this.AddSettingSelected = false;
      this.RestrictionSelected = false;
      this.StockBySelected = true;

    }
    else {
      this.stockSelected = false;
      this.AddSettingSelected = false;
      this.RestrictionSelected = false;
      this.StockBySelected = false;

    };
  }
  close()
  {
    
    this.StockBySelected = false;
    this.stockSelected=false;
    this.RestrictionSelected=false;
    this.AddSettingSelected=false;
   //  this.selectNValue = true;
   //  this.selectYValue = false;
   //  this.acgrpForm.patchValue({"selectSet":0});
    
   
  }


  //Declare List Related Variable
  records: any[];
  retData: any[];
  count: number = 1;
  dtOptions: any;
  searchText = '';
  //Load List
  LoadRecords() {

    this.records = [];

    this.myService.Records().subscribe(res => {
      //alert(JSON.stringify(res));
      //alert(res.length);

      for (var i = 0; i < res.length; i++) {
        console.log(res[i]["unitName"]);
        console.log(res[i]["groupName"]);
      }
      //fill List
     // alert(JSON.stringify(res));
      this.records = res;
    
      
      this.retData = this.records.slice(0, 15);

    });
    err => {
      console.log(err);
    }
  }

  //Page Changed Event
  pageChanged(event: PageChangedEvent): void {
  // alert(event.page);
    this.count = (event.page - 1) * event.itemsPerPage + 1;
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.retData = this.records.slice(startItem, endItem);

  }

  EditData(item: any) {
    
    
    this.form.patchValue({
      "idesc": item['idesc'],
      "srateunit": item['srateunit'],
      "istud": item['istud'] == true ? 1 : 0,
      "pexwt": item['pexwt'],
      "pcstock": item['pcstock'] == true ? 1 : 0,
      "blist": item['blist'] == true ? 1 : 0,
      "cgwt": item['cgwt'] == true ? 1 : 0,
      "cbeeds": item['cbeeds'] == true ? 1 : 0,
      "tgstkless": item['tgstkless'] == true ? 1 : 0,
      "restgwt": item['restgwt'] == true ? 1 : 0,
      "resttunch": item['resttunch'] == true ? 1 : 0,
      "restwstg": item['restwstg'] == true ? 1 : 0,
      "restrate": item['restrate'] == true ? 1 : 0,
      "restzero": item['restzero'] == true ? 1 : 0,
      "reststamp": item['reststamp'] == true ? 1 : 0,
      "restbatch": item['restbatch'] == true ? 1 : 0,
      "restoth": item['restoth'] == true ? 1 : 0,
      "restwl": item['restwl'] == true ? 1 : 0,
      "restpc": item['restpc'] == true ? 1 : 0,
      "irgwt": item['irgwt'] == true ? 1 : 0,
      "cstamp": item['cstamp'] == true ? 1 : 0,
      "stones": item['stones'] == true ? 1 : 0,
      "sale": item['sale'] ? 1 : 0,
      "purchase": item['purchase'] == true ? 1 : 0,
      "stock": item['stock'] == true ? 1 : 0,
      "partydst": item['partydst'] == 1 ? true : false,
      "karigar": item['karigar'] == true ? 1 : 0,

      "lessdet": item['lessdet'] == true ? 1 : 0,
      "svstk": item['svstk'] ? 1 : 0,
      "twodet": item['twodet'] == true ? 1 :0,
      "treypc": item['treypc'] == null ? 0 : item['treypc'],
      "tpre": item['tpre'],
      "tgdigit": item['tgdigit'] == null ? 0 : item['tgdigit'],
      "starttgno": item['starttgno'] == null ? 0 : item['starttgno'],
      "scon": item['scon'] == null ? 0 : item['scon'],
      "saleless": item['saleless'] == null ? "" : item['saleless'],
      "raparate": item['raparate'] == null ? "" : item['raparate'],
      "prncmd": item['prncmd'] == null ? "" : item['prncmd'],
      "pointupon": item['pointupon'] == null ? "" : item['pointupon'],
      "maxtgno": item['maxtgno'] ,
      "linktg": item['linktg'] == true ? 1 : 0,
      "linkino": item['linkino'] == null ? 0 : item['linkino'],
      "ino": item['ino'] == null ? 0 : item['ino'],
      "gcon": item['gcon'] == null ? 0 : item['gcon'],
      "dtrnstk": item['dtrnstk'] == null ? 0 : item['dtrnstk'],
      "desipre": item['desipre'] == null ? "" : item['desipre'],
      "desidigit": item['desidigit'] == null ? 0 : item['desidigit'],
      "pc": item['pc'] == null ? 0 : item['pc'],
      "pname": item['pname'],
      "shortname": item['shortname'] == null ? "" : item['shortname'],
      "hpname": item['hpname'] == null ? "" : item['hpname'],
      "igroup": item['igroup'],
      "unit": item['unit'],
      "lcode": item['lcode'] == null ? "" : item['lcode'],
      "grade": item['grade'] == null ? "" : item['grade'],
      "gcode": item['gcode'] ? "" : item['gcode'],
      "badhel": item['badhel']==null ? 0 : item['badhel'],
      "cat": item['cat'],
      "shortcnm": item['shortcnm'] == null ? "" : item['shortcnm'],
      "stmethod": item['stmethod'] == null ? 0 : item['stmethod'],
      //stocking By
      "sm": item['sm']==null ? 0 : item['sm'],

      "ditemrate": item['ditemrate'] == null ? 0 : item['ditemrate'],

      "polywt": item['polywt'] == null ? 0 : item['polywt'],
      "boxwt": item['boxwt'] == null ? 0 : item['boxwt'],

      "sqrmtr": item['sqrmtr'] == null ? 0 : item['sqrmtr'],

      "wirewt": item['wirewt'] == null ? 0 : item['wirewt'],

      "bpretype": item['bpretype'] == null ? 0 : item['bpretype'],

      "stval": item['stval'] == null ? 0 : item['stval'],

      "stvaltunch": item['stvaltunch'] == null ? 0 : item['stvaltunch'],

      "stvalwstg": item['stvalwstg'] == null ? 0 : item['stvalwstg'],

      "stvallbr": item['stvallbr'] == null ? 0 : item['stvallbr'],

      "stamp": item['stamp'],

      "deftunch": item['deftunch'] == null ? 0 : item['deftunch'],

      "polish": item['polish'] == null ? 0 : item['polish'],

      "intorate": item['intorate'] == null ? 0 : item['intorate'],
      "unitid":item["unitName"] ,
      "igroupid": item["igroupName"] ,
      "catid":  item["catName"] ,
      "gcodeid":item["gcodeName"],
      "stampid": item["stampName"] 


    });

   // this.IUnitInitValue = { "id": item["unitid"], "name": item["unitName"] ;
        this.IunitSelectId = item["unitid"],
        this.IgroupSelectId = item["igroupid"],
        this.ICatSelectId = item["catid"],
        this.IGrpSelectId = item["gcodeid"],
      this.IStampSelectId = item["stampid"]
     //set Initial value
    this.IgroupInitValue = item["igroupName"],
      this.IUnitInitValue = item["unitName"],
      this.IGrpInitValue = item["gcodeName"],
      this.ICatInitValue = item["catName"],
      this.IStampInitValue = item["stampName"] 
   
    this.operationType = "Update";
    this.isFormDisplay = true;
    this.listDisplay = false;
    this.itemRecord = item;
    this.isDelete = true;
    this.isnew = false;
  
  }

  Search() {
   
   
    if (this.searchText == "") {
      this.ngOnInit();
    }
    else {
      this.retData = this.records.filter(x => x.idesc.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    }
  }
  sendgrp(e)
  {
    this.comboval=e.target.value;
  }
  sendunit(e)
  {
    this.comboval=e.target.value;
  }
  sendgcode(e)
  {
    this.comboval=e.target.value;
  }
  sendcat(e)
  {
    this.comboval=e.target.value;
  }
  sendstamp(e)
  {
    this.comboval=e.target.value;
  }


}
