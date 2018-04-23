import { Component, OnInit } from '@angular/core';
import Game from "../../../models/game.model";
import { GameService } from "../../../service/game.service";

// import {News} from ''
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  games;
  constructor(
    private gameService : GameService
  ) { }

  ngOnInit() {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data.listGames;
      console.log(this.games);
    });
  }

  deleteGame(game) {
    this.gameService.deleteGame(game._id).subscribe(
      res => {
        this.games.splice(this.games.indexOf(game), 1);
      },
      err => { console.log(err) }
    );
  }

}
