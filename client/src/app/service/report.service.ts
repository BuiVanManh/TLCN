import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class ReportService {
  
  constructor(
        private http: Http,
        private authService : AuthServiceService
  ) { }

  domain = this.authService.domain;
  options;

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  getAllReports() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'reports/getall', this.options).map(res => res.json());
  }

  getSingleReport(id){
    return this.http.get(this.domain + 'reports/getsingle/' + id).map( res => res.json());
  }

  addReport(report){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'reports/addreport', report, this.options).map(res => res.json());
  }

  editReport(report){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'reports/editreport', report, this.options).map(res => res.json());
  }
  
  deleteReport(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'reports/deletereport/' + id, this.options).map(res => res.json());
  }
}
