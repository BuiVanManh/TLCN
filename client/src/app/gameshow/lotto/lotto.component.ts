import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';

import Client from "../../models/client.model";
import { ClientService } from "../../service/client.service";

//Client in the Gameshow
import GameShow from "../../models/gameshow.model"; 
import { GameShowService } from '../../service/gameshow.service';
//Event
import Event from "../../models/event.model"; 
import { EventService } from '../../service/event.service';

import { Router, ActivatedRoute } from '@angular/router';
// Set up our Component Decorator
@Component({
  selector: 'app-lotto',
  templateUrl: './lotto.component.html',
  styleUrls: ['./lotto.component.css']
})
export class LottoComponent implements OnInit {

  //Khai báo biến
  event;
  client;
  events: Array<Event> = [];
  clients: Array<Client> = [];
  clients_1: Array<Client> = [];
  gameshows: Array<GameShow> = [];

  public gameshowsID;
  public winner1;
  public winner2;

  employees = [ 
                {fullname: 'Phạm Vũ Hoàng Tuấn', age: 26, job: 'student'}, 
                {fullname: 'Bùi Văn Manh', age: 26, job: 'student'} 
              ];

  public winner: any = [];
  public temp: any = [];
  // Set up various variables for the Lotto Game
  public picks: any = []; // Array to story user's quick picks
  public infor: any = []; // Array to store user's information of client
  public random: number; // Set a public variable and assign the type number
  public counter: number = 0; // Create a counter variable
  public c: number = 0;
  public numbdel: number = 0;
  public winningNumber: any = []; // Array to store the winning numbers
  public isWinner: boolean = false; // Bool if the user wins
  public isPlaying: boolean = false; // Bool if the user clicked play

  // Constructor function
  constructor(
    private clientService: ClientService,
    private gameShowService: GameShowService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
  ) { }

  getClientByEvent(id){
    this.clientService.getClientByEvent(id).subscribe(data => {
      this.clients = data.listClients;
    });
  }

  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res.event;
        console.log('Event Detail: ', this.event);
        //this.getClientByEvent(res.event._id);
        this.gameShowService.getAllGameShows().subscribe(
          data => {
            var filter_data = []

            for(let e of data.listGameShows) {
              if (e['event']._id == res.event._id) {
                filter_data.push(e)
              }
            }
            data.listGameShows = filter_data;
            this.gameshows = filter_data;
            this.gameshowsID = data.listGameShows[0]._id;
            console.log('List gameshows', data.listGameShows[0]._id);
          }
        );
      },
      error => console.log(error)
    );
  }

  onSave1(){
    var num = this.c - 1;
    console.log('Infor of winner: ', num);
    this.winner1 = this.infor[num]._id;
    const gameshow = {
      id: this.gameshowsID,
      winner1: this.infor[num]._id,
    }
    console.log('Gameshow:', gameshow);
    this.gameShowService.editGameShow(gameshow).subscribe(data => {
      if (!data.success) {
        console.log("error");
      }
      else{
        console.log("Success");
        this.reset();
      }
    })
    this.clients_1.splice(this.numbdel, 1);
  }

  onSave2(){
    var num = this.c - 1;
    console.log('Infor of winner: ', num);
    this.winner2 = this.infor[num]._id;
    const gameshow = {
      id: this.gameshowsID,
      winner1: this.winner1,
      winner2: this.infor[num]._id,
    }
    console.log('Gameshow:', gameshow);
    this.gameShowService.editGameShow(gameshow).subscribe(data => {
      if (!data.success) {
        console.log("error");
      }
      else{
        console.log("Success");
        this.reset();
      }
    })
    this.clients_1.splice(this.numbdel, 1);
  }

  onSave3(){
    var num = this.c - 1;
    console.log('Infor of winner: ', num);
    const gameshow = {
      id: this.gameshowsID,
      winner1: this.winner1,
      winner2: this.winner2,
      winner3: this.infor[num]._id,
    }
    console.log('Gameshow:', gameshow);
    this.gameShowService.editGameShow(gameshow).subscribe(data => {
      if (!data.success) {
        console.log("error");
      }
      else{
        console.log("Success");
        this.reset();
      }
    })
    this.clients_1.splice(this.numbdel, 1);
  }
  // Our init function - runs on load
  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
    this.createQuickPick(); // Let's get our first quick pick on load
  }
  
  // Creates a "quickpick" of numbers and adds to the user's ticket
  public createQuickPick() { 
    // Create a local variable for an array that will store the randomly selected numbers
    let numPick: any = [];

    // Generate the number
    this.generateNumber(numPick);
    
    this.clientService.getClientByEvent(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      this.clients = data.listClients;
      console.log('Clients List: ', this.clients);
      if (this.clients_1.length == 0){
        this.clients_1 = this.clients;
        for(var i=0; i < this.clients_1.length; i++ ) {
          var index = this.clients_1.indexOf(this.clients_1[i]);
          this.counter += 1;
          index += 1;
          this.picks[this.counter] = [index, this.clients_1[i].fullname];
        }
        this.counter = 0;
        console.log('If success!');
      }
      else {
        for(var i=0; i < this.clients_1.length; i++ ) {
          var index = this.clients_1.indexOf(this.clients_1[i]);
          this.counter += 1;
          index += 1;
          this.picks[this.counter] = [index, this.clients_1[i].fullname];
        }
        this.counter = 0;
        console.log('Else success!');
      }
    });
    //this.picks[this.counter] = numPick; // Let's store this array into our quick pick array based on our counter index
    

    // for(var i = 0; i< 5; i++){
    //   this.picks[this.counter] = [i]; 
    //   this.counter += 1;
    // }
    //var index = this.employees.indexOf(this.employees[2]);

    //this.picks[this.counter] = numPick;
    //this.counter += 1; // Let's add 1 to the current counter value
  }

  public playLotto(picks: any) {
    // Let's set our winner variable to false to start
    let isWinner: boolean = false;

    // Lotto is playing - user clicks play button
    this.isPlaying = true;

    // Generate the number
    console.log(this.generateNumber(this.winningNumber));
    this.generateNumber(this.winningNumber);
    
    // Set a local variable to store the winning number
    let wn: any = this.winningNumber;

    // Set a local variable to hold if the array / number is a winner
    let arrWin: boolean = false;
    // Loop over the quick picks and check each quick pick against the generated winning number
    // _.each(picks, function(pick){
    //   if(!arrWin) { 
    //     console.log('Pick: ', _.pick);
    //     arrWin = _.isEqual(wn, pick); // If the current pick is equal to the winning number - set the variable arrWin to true
    //   }
    // });

    for(var pick=0; pick < this.picks.length; pick++){
      if(!arrWin) {
        arrWin = _.isEqual(wn, [pick]);
        if(arrWin){
          this.winner = this.picks[pick];
          var num = pick - 1;
          this.numbdel = pick - 1;
          if(this.winner[1] == this.clients_1[num].fullname) {
            console.log('Employee: ', this.clients_1[num]);
            this.infor[this.c] = this.clients_1[num];
            this.c += 1;
          }
        }
      }
    }

    this.isWinner = arrWin; // Set the isWinner variable to the boolean produced in the _.each 
  }
  // Starts a new game
  public reset() {
    this.isPlaying = false;
    this.winningNumber = [];
    this.picks = [];
    this.counter = 0;
    this.createQuickPick();
  }

  // Number generator with sorting the array min - max
  public generateNumber(arr: any) {
    // Run a for loop like in our quick pick function 
    for(var i=0; i<1; ++i) { 
      // this.clientService.getClientByEvent(this.activatedRoute.snapshot.params['id']).subscribe(data => {
      //   this.clients = data.listClients;
      // });
      this.random = this.randomNumber(1, this.clients_1.length);
      while(arr.indexOf(this.random) !== -1){
        this.random = this.randomNumber(1, this.clients_1.length);
      }
      arr[i] = this.random;
    }; 
    return arr.sort(this.sortNumber);
  }

  // Helpers
  public randomNumber(min: number, max: number){
      return Math.round(Math.random() * (max - min) + min);
  }
  public sortNumber(a,b) {
    return a - b;
  }
}
