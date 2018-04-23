import { Component, OnInit } from '@angular/core';

import Game from '../../../models/game.model';
import { GameService } from '../../../service/game.service';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Get user ID
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddgamesComponent implements OnInit {

  user;
  idUser;

  public form : FormGroup;
  message = '';
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private gameService : GameService,
    private router: Router,
    private authService: AuthServiceService
  ) { 
    this.createForm();
  }

  public newGame: Game = new Game();

  // addGame(){
  //   this.gameService.addGame(this.newGame).subscribe(
  //     res => {
  //       this.message = res.message;
  //       this.newGame = new Game();
  //       console.log(res);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  createForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([

      ])],
      prizeamount: ['', Validators.compose([

      ])],
    });
  }

  clearAllFields(){
    this.createForm();
  }

  disableForm() {
    this.form.controls['title'].disable();
    this.form.controls['prizeamount'].disable();
  }

  enableForm(){
    this.form.controls['title'].enable();
    this.form.controls['prizeamount'].enable();
  }

  addGame(){
    this.processing = true;
    this.disableForm();
    const game = {
      title: this.form.get('title').value,
      prizeamount: this.form.get('prizeamount').value,
      employee: this.idUser
    }
    console.log(game);
    this.gameService.addGame(game).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/admin/game/list']);
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
      this.idUser = data.user._id;
      console.log(this.user);
    });
  }

}
