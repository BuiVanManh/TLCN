import { Component, OnInit } from '@angular/core';

import Event from '../../../../models/event.model';
import { EventService } from '../../../../service/event.service';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  event = new Event();

  public form : FormGroup;
  message = '';
  messageClass;
  processing = false;

  constructor( 
    private eventService : EventService,
    private activatedRoute: ActivatedRoute,
   ) { }
  
  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
  }

   getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res;
        console.log(this.event);
      },
      error => console.log(error)
    );
  }
}
