import { Component, OnInit } from '@angular/core';

//Event
import Event from "../../../../models/event.model"; 
import { EventService } from '../../../../service/event.service';
//Game
import Game from "../../../../models/game.model"; 
import { GameService } from '../../../../service/game.service';
import { Router, ActivatedRoute } from '@angular/router';
//Client
import Client from "../../../../models/client.model";
import { ClientService } from "../../../../service/client.service";
//GameShow
import GameShow from "../../../../models/gameshow.model"; 
import { GameShowService } from '../../../../service/gameshow.service';

@Component({
  selector: 'app-detailgame',
  templateUrl: './detailgame.component.html',
  styleUrls: ['./detailgame.component.css']
})
export class DetailgameComponent implements OnInit {

  event = new Event();
  events: Array<Event> = [];
  public eventID;

  game = new Game();
  games: Array<Game> = [];

  public client = new Client();
  public winner1 = new Client();
  public winner2 = new Client();
  public winner3 = new Client();

  public clients: Array<Client> = [];

  gameshow = new GameShow();
  gameshows: Array<GameShow> = [];

  constructor(
    private eventService: EventService,
    private gameService: GameService,
    private clientService: ClientService,
    private gameShowService: GameShowService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
  }
  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res.event;
        this.eventID = res.event._id;
        console.log('Detail event:', this.event);
        console.log('Id Game', this.event.game);
        this.getGameDetail(this.event.game);
        this.getClients(res.event._id);
        this.getGameShowDetail(res.event._id);
      },
      error => console.log(error)
    );
  }

  getGameDetail(id){
    this.gameService.getSingleGame(id).subscribe(
      res => {
        this.game = res.game;
        console.log('Detail game:', this.game);
      },
      error => console.log(error)  
    );
  }

  getClients(id){
    this.clientService.getClientByEvent(id).subscribe(
      res => {
        this.clients = res.listClients;
        console.log('List of clients:', this.clients);
      },
      error => console.log(error)  
    );
  }

  getGameShowDetail(id){
    this.gameShowService.getAllGameShows().subscribe(
      data => {
        var filter_data = []

        for(let e of data.listGameShows) {
          if (e['event']._id == this.eventID) {
            filter_data.push(e)
          }
        }
        this.gameshows = filter_data;
        console.log('GameShow: ', this.gameshows);

        this.clientService.getSingleClient(this.gameshows[0].winner1).subscribe(
          res => {
            this.client = res.client;
            this.winner1 = this.client;
          },
          error => console.log(error)  
        );

        this.clientService.getSingleClient(this.gameshows[0].winner2).subscribe(
          res => {
            this.client = res.client;
            this.winner2 = this.client;
          },
          error => console.log(error)  
        );

        this.clientService.getSingleClient(this.gameshows[0].winner3).subscribe(
          res => {
            this.client = res.client;
            this.winner3 = this.client;
          },
          error => console.log(error)  
        );
      }
    );
  }

  getClientDetail(id) {
    this.clientService.getSingleClient(id).subscribe(
      res => {
        this.client = res.client;
        console.log('Detail client:', this.client);
      },
      error => console.log(error)  
    );
  }

}
