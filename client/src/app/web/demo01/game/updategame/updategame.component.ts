import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//Event
import Event from "../../../../models/event.model"; 
import { EventService } from '../../../../service/event.service';
//Game
import Game from "../../../../models/game.model"; 
import { GameService } from '../../../../service/game.service';

//Client
import Client from "../../../../models/client.model";
import { ClientService } from "../../../../service/client.service";

//GameShow
import GameShow from "../../../../models/gameshow.model"; 
import { GameShowService } from '../../../../service/gameshow.service';

@Component({
  selector: 'app-updategame',
  templateUrl: './updategame.component.html',
  styleUrls: ['./updategame.component.css']
})
export class UpdategameComponent implements OnInit {

  event = new Event();
  events: Array<Event> = [];

  game = new Game();
  games: Array<Game> = [];

  client = new Client();
  clients: Array<Client> = [];

  //Get
  eventID;
  gameID;

  public form : FormGroup;
  message = '';
  messageClass;
  processing = false;

  constructor(
    private eventService: EventService,
    private gameService: GameService,
    private gameShowService: GameShowService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { this.createForm(); }

  createForm(){
    this.form = this.formBuilder.group({
      title_first: ['', Validators.required],
      prize_first: ['', Validators.required],
      image_first: ['', Validators.required],

      title_second: ['', Validators.required],
      prize_second: ['', Validators.required],
      image_second: ['', Validators.required],

      title_third: ['', Validators.required],
      prize_third: ['', Validators.required],
      image_third: ['', Validators.required],
    });
  }

  disableForm() {
    this.form.controls['title_first'].disable();
    this.form.controls['prize_first'].disable();
    this.form.controls['image_first'].disable();
    this.form.controls['title_second'].disable();
    this.form.controls['prize_second'].disable();
    this.form.controls['image_second'].disable();
    this.form.controls['title_third'].disable();
    this.form.controls['prize_third'].disable();
    this.form.controls['image_third'].disable();
  }

  enableForm(){
    this.form.controls['title_first'].enable();
    this.form.controls['prize_first'].enable();
    this.form.controls['image_first'].enable();
    this.form.controls['title_second'].enable();
    this.form.controls['prize_second'].enable();
    this.form.controls['image_second'].enable();
    this.form.controls['title_third'].enable();
    this.form.controls['prize_third'].enable();
    this.form.controls['image_third'].enable();
  }

  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
  }
  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res.event;
        console.log('Detail event:', this.event);
        console.log('Id Game', this.event.game);
        this.getGameDetail(this.event.game);
        this.getClients(res.event._id);

        //Get
        this.eventID = res.event._id;
        this.gameID = this.event.game;
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

  updateGame() {
    this.processing = true;
    this.disableForm();
    const gameshow = {
      title_first: this.form.get('title_first').value,
      prize_first: this.form.get('prize_first').value,
      image_first: this.form.get('image_first').value,

      title_second: this.form.get('title_second').value,
      prize_second: this.form.get('prize_second').value,
      image_second: this.form.get('image_second').value,

      title_third: this.form.get('title_third').value,
      prize_third: this.form.get('prize_third').value,
      image_third: this.form.get('image_third').value,
      game: this.gameID,
      event: this.eventID,
    }
    console.log(gameshow);
    this.gameShowService.addGameShow(gameshow).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/game/listgame']);
        }, 1000);
      }
    });
  }
}
