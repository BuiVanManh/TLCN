import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class EventService {  
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

  getAllEvents() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'events/getall', this.options).map(res => res.json());
  }
  getTop6Events() {
    return this.http.get(this.domain + 'events/gettop6').map(res => res.json());
  }

  getSingleEvent(id){
    return this.http.get(this.domain + 'events/getsingle/' + id).map( res => res.json());
  }

  addEvent(event){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'events/addevent/', event, this.options).map(res => res.json());
  }

  editEvent(event){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'events/editevent/', event, this.options).map(res => res.json());
  }
  
  deleteEvent(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'events/deleteevent/' + id, this.options).map(res => res.json());
  }
  
}
