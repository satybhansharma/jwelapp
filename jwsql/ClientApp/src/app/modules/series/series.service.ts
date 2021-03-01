import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/shared/services/common.service';
@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor() { }
}
