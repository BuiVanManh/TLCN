import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Client from "../models/client.model";
import { ClientService } from "../service/client.service";

import Event from "../models/event.model"; 
import { EventService } from '../service/event.service';

import Game from "../models/game.model"; 
import { GameService } from '../service/game.service';

import GameShow from "../models/gameshow.model"; 
import { GameShowService } from '../service/gameshow.service';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {

  event;
  client;

  gameID;
  game;

  events: Array<Event> = [];
  clients: Array<Client> = [];
  gameshows: Array<GameShow> = [];

  constructor(
    private clientService: ClientService,
    private gameService: GameService,
    private gameShowService: GameShowService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
  }

  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res.event;
        console.log('Event Detail: ', this.event);
        this.gameID = this.event.game;
        this.getGameDetail(this.gameID);
        this.getClientByEvent(res.event._id);
        this.gameShowService.getAllGameShows().subscribe(
          data => {
            console.log('data:', data.listGameShows);
            var filter_data = []

            for(let e of data.listGameShows) {
              if (e['event']._id == res.event._id) {
                filter_data.push(e)
              }
            }
            this.gameshows = filter_data;
            console.log('List gameshows', this.gameshows);
          }
        );
      },
      error => console.log(error)
    );
  }

  getGameDetail(id) {
    this.gameService.getSingleGame(id).subscribe(
      res => {
        this.game = res.game;
        console.log('Game Detail: ', this.game);
      },
      error => console.log(error)
    );
  }

  getClientByEvent(id){
    this.clientService.getClientByEvent(id).subscribe(data => {
      this.clients = data.listClients;
      console.log('List client here: ', this.clients);
    });
  }
}
