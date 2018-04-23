import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class GameService {
  
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

  getAllGames() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'games/getall', this.options).map(res => res.json());
  }

  getSingleGame(id){
    return this.http.get(this.domain + 'games/getsingle/' + id).map( res => res.json());
  }

  addGame(game){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'games/addgame', game, this.options).map(res => res.json());
  }

  editGame(game){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'games/editgame', game, this.options).map(res => res.json());
  }
  
  deleteGame(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'games/deletegame/' + id, this.options).map(res => res.json());
  }
  

  
}
