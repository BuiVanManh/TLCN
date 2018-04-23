import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';

import { User } from "../../../models/user";

import Event from "../../../models/event.model"; 
import { EventService } from '../../../service/event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Multiselect 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  month = 0;
  users: Array<User> = [];
  user: User;
  public idUser: string;
  events: Array<Event> = [];

  searchKey = "";
  searchName = "";

  constructor(
    private authService: AuthServiceService,
    private eventService: EventService,
  ) { }

  OnclickSearch(){
    this.searchKey = this.searchName;
  }
  getUser(){
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
        this.idUser = profile.user._id;
        console.log('Id user: ', this.idUser);
      }else{
        return;
      }
      console.log('User Info: ', this.user);
    });
  }

  ngOnInit() {
    this.getUser();
    this.getEvents();
    
    this.dropdownList = [
      {"id":1,"itemName":"India"},
      {"id":2,"itemName":"Singapore"},
      {"id":3,"itemName":"Australia"},
      {"id":4,"itemName":"Canada"},
      {"id":5,"itemName":"South Korea"},
      {"id":6,"itemName":"Germany"},
      {"id":7,"itemName":"France"},
      {"id":8,"itemName":"Russia"},
      {"id":9,"itemName":"Italy"},
      {"id":10,"itemName":"Sweden"}
    ];
    this.selectedItems = [
        {"id":2,"itemName":"Singapore"},
        {"id":3,"itemName":"Australia"},
        {"id":4,"itemName":"Canada"},
        {"id":5,"itemName":"South Korea"}
    ];
    this.dropdownSettings = { 
      singleSelection: false, 
      text:"Select Countries",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class"
    };            
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

  onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }
  
}
