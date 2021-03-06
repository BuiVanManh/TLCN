import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class GameShowService {
  
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

  addGameShow(game){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'gameshows/addgameshow', game, this.options).map(res => res.json());
  }

  editGameShow(game){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'gameshows/editgameshow', game, this.options).map(res => res.json());
  }

  getAllGameShows() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'gameshows/getall', this.options).map(res => res.json());
  }

}
