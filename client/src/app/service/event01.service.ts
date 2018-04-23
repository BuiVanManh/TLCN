
import Event from '../models/event.model';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import {
  HttpParams,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Response, Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class EventService {
  
  api_url = environment.domain;
  eventUrl = `${this.api_url}events`;
  options;
  authToken;

  //domain = this.authService.domain;

  constructor(
    private http: HttpClient,
    //private authService : AuthServiceService
  ) { }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  getEvents(): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    return this.http
      .get(`${this.eventUrl}`, { withCredentials: true, headers: headers })
      .map(res => {
        return res['events'] as Event[];
      });
  }

  getAllEvents(): Observable<Event[]> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    return this.http.get(`${this.eventUrl}/getall` )
                    .map( res => {
                      return res['listEvents'] as Event[];
                    });
  }
  

  // getTop6Events() {
  //   return this.http.get(this.domain + 'event/gettop6').map(res => res.json());
  // }

  // getSingleEvent(id){
  //   return this.http.get(this.domain + 'event/event/' + id).map( res => res.json());
  // }

  addEvent(event: Event): Observable<any> {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);
    console.log(this.authToken);
    return this.http.post(`${this.eventUrl}/addevent/`, event, { headers: headers });
  }

  // addEvent(event){
  //     return this.http.get(this.domain + 'event/addevent/', event).map( res => res.json());
  // }
  
  editEvent(id: string, event: Event): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const putUrl = `${this.eventUrl}/${id}`;
    return this.http
      .put(putUrl, event, { withCredentials: true, headers: headers })
      .map(res => {
        return res;
      });
  }

  // editEvent(event) {
  //     return this.http.put(this.domain + 'event/editevent/', event).map( res => res.json());
  // }

  deleteEvent(id: string): any {
    this.loadToken(); // Ge
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.authToken);

    const deleteUrl = `${this.eventUrl}/${id}`;
    return this.http
      .delete(deleteUrl, { withCredentials: true, headers: headers })
      .map(res => {
        return res;
      });
  }

  // deleteEvent(id){
  //     return this.http.delete(this.domain + 'event/deletevent/' + id).map( res => res.json());
  // }

}
