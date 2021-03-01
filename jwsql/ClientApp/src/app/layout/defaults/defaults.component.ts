import { Component, OnInit } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { DatacommunicationService } from '../../shared/services/datacommunication.service';

@Component({
  selector: 'app-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.css']
})
export class DefaultsComponent implements OnInit {

  sideBarOpen = false;
  minisideBar = true;
  
  constructor(private ds:DatacommunicationService) { }

  ngOnInit(): void {
    this.ds._sideBarResponse.subscribe(res => {
     
      this.sideBarToggler();
    });
  }
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
    this.minisideBar = !this.minisideBar;
  }

}
