import { Component, OnInit } from '@angular/core';
import Event from '../../../models/event.model';
import { EventService } from '../../../service/event.service';
import { Subject } from 'rxjs/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Get user ID
import { User } from '../../../models/user';
import { AuthServiceService } from '../../../service/auth-service.service';

//Get Client
import Client from "../../../models/client.model";
import { ClientService } from "../../../service/client.service";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  events: Array<Event> = [];
  users: Array<User> = [];
  clients: Array<Client> = [];
  public idUser;
  constructor(
    private eventService : EventService,
    private authService: AuthServiceService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.authService.getAllUser().subscribe(data => {
      if(data){
        this.users = data.listUsers;
      }else{
        return;
      }
      console.log('List user here:', this.users);
    });
  }

  getEventByUser(id){
    this.authService.findUserById(id).subscribe(profile => {
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
