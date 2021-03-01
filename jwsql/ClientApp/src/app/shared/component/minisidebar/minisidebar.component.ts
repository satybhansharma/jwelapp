import { Component, OnInit } from '@angular/core';
import { DatacommunicationService } from '../../services/datacommunication.service';

@Component({
  selector: 'app-minisidebar',
  templateUrl: './minisidebar.component.html',
  styleUrls: ['./minisidebar.component.css']
})
export class MinisidebarComponent implements OnInit {

  constructor(private ds:DatacommunicationService) { }

  ngOnInit(): void {
  }
  isviewside() {
    this.ds._sendSidebarReponse({"sideBarShow":true});
  }

}
