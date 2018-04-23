import { Component, OnInit, style } from '@angular/core';

import Client from "../../../../models/client.model";
import { ClientService } from "../../../../service/client.service";

import { User } from "../../../../models/user";
import { AuthServiceService } from '../../../../service/auth-service.service';

import Event from "../../../../models/event.model"; 
import { EventService } from '../../../../service/event.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  month = 0;
  users: Array<User> = [];
  user: User;
  public idUser: string;
  events: Array<Event> = [];
  clients: Array<Client> = [];
  constructor(
    private clientService: ClientService,
    private authService: AuthServiceService,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.idUser = profile.user._id;
        console.log('Id user: ', this.idUser);
        this.eventService.getAllEvents().subscribe(
          data => {
            console.log('data:', data.listEvents);
            var filter_data = []

            for(let e of data.listEvents) {
              if (e['employee']._id == this.idUser) {
                filter_data.push(e)
              }
            }
            this.events = filter_data;
            console.log('List events', this.events);
          }
        );
      }else{
        return;
      }
    });
  }

  getClientByEvent(id){
    this.clientService.getClientByEvent(id).subscribe(data => {
      this.clients = data.listClients;
      console.log('List client here: ', this.clients);
    });
  }
}
