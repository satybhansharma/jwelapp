import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-analysis',
  templateUrl: './sale-analysis.component.html',
  styleUrls: ['./sale-analysis.component.css']
})
export class SaleAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title:string;
settitle(t:any)
{
  this.title="Sale Register Billwise"
  alert(t);
}
}
