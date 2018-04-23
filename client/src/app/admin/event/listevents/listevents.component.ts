import { Component, OnInit } from '@angular/core';
import Event from "../../../models/event.model";
import { EventService } from "../../../service/event.service";
// import {News} from ''
@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css']
})

export class ListeventsComponent implements OnInit {

  events;
  constructor(
     private eventService : EventService
  ) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data.listEvents;
      console.log(this.events);
    });
  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event._id).subscribe(
      res => {
        this.events.splice(this.events.indexOf(event), 1);
      },
      err => { console.log(err) }
    );
  }

}
