import { Component, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-purchase-analysis-button',
  templateUrl: './purchase-analysis-button.component.html',
  styleUrls: ['./purchase-analysis-button.component.css']
})
export class PurchaseAnalysisButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title:string;
settitle(t:any)
{
  this.title="Purchase Register Billwise"
}
}
