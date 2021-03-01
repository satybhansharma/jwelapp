import { Component, OnInit, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

// imgsrc:string="/mmilogo.png";
isDisplay=true;

  @Output ()toggleSideBarForMe:EventEmitter<any>=new EventEmitter() 
  constructor() { }

  ngOnInit() {}
  toggleSideBar(){
    
    this.toggleSideBarForMe.emit();
    this.isDisplay=!this.isDisplay;
    //console.log(this.toggleSideBarForMe.emit());
  }

}
