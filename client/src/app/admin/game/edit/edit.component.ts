import { Component, OnInit } from '@angular/core';

import Game from '../../../models/game.model';
import { GameService } from '../../../service/game.service';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Get user ID
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user;
  idUser;
  game = new Game();

  public form : FormGroup;
  message = '';
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private gameService : GameService,
  ) { this.createForm(); }

  createForm(){
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([

      ])],
      prizeamount: ['', Validators.compose([

      ])],
    });
  }

  disableForm() {
    this.form.controls['title'].disable();
    this.form.controls['prizeamount'].disable();
  }

  enableForm(){
    this.form.controls['title'].enable();
    this.form.controls['prizeamount'].enable();
  }

  ngOnInit(){
    this.getGameDetail(this.activatedRoute.snapshot.params['id']);
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
      this.idUser = data.user._id;
      console.log(this.user);
    });
  }

  getGameDetail(id){
    this.gameService.getSingleGame(id).subscribe(
      res => {
        this.game = res
        console.log(this.game);
      },
      error => console.log(error)
    );
  }

  editGame() {
    this.processing = true;
    this.disableForm();
    const game = {
      id: this.activatedRoute.snapshot.params['id'],
      title: this.form.get('title').value,
      prizeamount: this.form.get('prizeamount').value,
      employee: this.idUser
    }
    console.log(game)
    this.gameService.editGame(game).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
        console.log(this.message);
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        console.log(this.message);
        setTimeout(() =>{
          this.router.navigate(['/admin/game/list']);
        }, 2000);
      }
    });
  }

}
