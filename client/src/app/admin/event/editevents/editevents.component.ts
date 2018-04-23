import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

import Event from '../../../models/event.model';
import { EventService } from '../../../service/event.service';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Get user ID
import { AuthServiceService } from '../../../service/auth-service.service';
// Get Game 
import Game from '../../../models/game.model';
import { GameService } from '../../../service/game.service';
@Component({
  selector: 'app-editevents',
  templateUrl: './editevents.component.html',
  styleUrls: ['./editevents.component.css']
})
export class EditeventsComponent implements OnInit {

  user;
  idUser;
  event = new Event();
  games;

  public form : FormGroup;
  message = '';
  messageClass;
  processing = false;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService : EventService,
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
  ) { this.createForm(); }

  createForm(){
    this.form = this.formBuilder.group({
      image: ['', Validators.compose([

      ])],
      title: ['', Validators.compose([

      ])],
      number: ['', Validators.compose([

      ])],
      location: ['', Validators.compose([

      ])],
      description: ['', Validators.compose([

      ])],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      game_id: ['', Validators.required],
    });
  }

  disableForm() {
    this.form.controls['image'].disable();
    this.form.controls['title'].disable();
    this.form.controls['number'].disable();
    this.form.controls['location'].disable();
    this.form.controls['description'].disable();
    this.form.controls['start_date'].disable();
    this.form.controls['end_date'].disable();
    this.form.controls['game_id'].disable();
  }

  enableForm(){
    this.form.controls['image'].enable();
    this.form.controls['title'].enable();
    this.form.controls['number'].enable();
    this.form.controls['location'].enable();
    this.form.controls['description'].enable();
    this.form.controls['start_date'].enable();
    this.form.controls['end_date'].enable();
    this.form.controls['game_id'].enable();
  }

  ngOnInit() {
    this.gameService.getAllGames().subscribe(data => {
      this.games = data.listGames;
      console.log(this.games);
    });
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
      this.idUser = data.user._id;
      console.log(this.user);
    });
  }

  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res
        console.log(this.event);
      },
      error => console.log(error)
    );
  }

  editEvent() {
    this.processing = true;
    this.disableForm();
    const event = {
      id: this.activatedRoute.snapshot.params['id'],
      image: this.form.get('image').value,
      title: this.form.get('title').value,
      number: this.form.get('number').value,
      location: this.form.get('location').value,
      description: this.form.get('description').value,
      create_date: new Date().toString(),
      start_date: this.form.get('start_date').value.formatted,
      end_date: this.form.get('end_date').value.formatted,
      employee: this.idUser,
      game: this.form.get('game_id').value
    }
    console.log(event)
    this.eventService.editEvent(event).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/admin/listevents']);
        }, 2000);
      }
    });
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.form.patchValue({start_date: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
    this.form.patchValue({end_date: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.form.patchValue({start_date: null});
    this.form.patchValue({end_date: null});
  }


}
