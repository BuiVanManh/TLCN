import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class ClientService {  
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

  getClientByEvent(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'clients/getclients/' + id, this.options).map(res => res.json());
  }

  addClient(event){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'clients/addclient', event, this.options).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + 'clients/checkEmail/' + email).map(res => res.json());
  }

  getSingleClient(id){
    return this.http.get(this.domain + 'clients/getsingle/' + id).map( res => res.json());
  }

}
