import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../service/auth-service.service';

import { User } from "../../../../models/user";
//Event
import Event from "../../../../models/event.model"; 
import { EventService } from '../../../../service/event.service';
//Game
import Game from "../../../../models/game.model"; 
import { GameService } from '../../../../service/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listgame',
  templateUrl: './listgame.component.html',
  styleUrls: ['./listgame.component.css']
})
export class ListgameComponent implements OnInit {

  events: Array<Event> = [];
  users: Array<User> = [];

  userId;
  user: User;
  games: Array<Game> = [];
  //Get Game By Event

  constructor(
    private authService: AuthServiceService,
    private eventService: EventService,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.getProfileUser();
    this.gameService.getAllGames().subscribe(data =>{
      this.games = data.listGames;
      console.log('List game here: ', this.games);
    });
  }

  getProfileUser(){
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
        this.userId = profile.user._id;
        this.getEvents();
      }else{
        return;
      }
      console.log('Profile Id user: ', profile.user._id);
    });
  }

  getEvents(){
    this.eventService.getAllEvents().subscribe(
      data => {
        var filter_data = []
        for(let e of data.listEvents) {
          if (e['employee']._id == this.userId) {
            filter_data.push(e)
          }
        }
        this.events = filter_data;
        console.log('List events', this.events);
      }
    );
  }
}
