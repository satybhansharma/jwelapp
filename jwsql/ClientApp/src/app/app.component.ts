import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dashboard';

  constructor(private ds:DataService) {
    //this.ds.set("OperationFrom", null);

  }
  
}
