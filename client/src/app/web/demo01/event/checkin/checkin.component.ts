import { Component, OnInit, style } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Client from '../../../../models/client.model';
import { ClientService } from '../../../../service/client.service';

import Event from '../../../../models/event.model';
import { EventService } from '../../../../service/event.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {
  event;
  idEvent;

  public addClientForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService : EventService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
  ) { this.createForm(); }

  createForm(){
    this.addClientForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber:['', Validators.required],
      job: ['', Validators.required],
      skill: ['', Validators.required],
    });
  }
  
  disableForm() {
    this.addClientForm.controls['fullname'].disable();
    this.addClientForm.controls['email'].disable();
    this.addClientForm.controls['phonenumber'].disable();
    this.addClientForm.controls['job'].disable();
    this.addClientForm.controls['skill'].disable();
  }

  enableForm() {
    this.addClientForm.controls['fullname'].enable();
    this.addClientForm.controls['email'].enable();
    this.addClientForm.controls['phonenumber'].enable();
    this.addClientForm.controls['job'].enable();
    this.addClientForm.controls['skill'].enable();
  }

  reset() {
    this.createForm();
    this.enableForm();
  }

  onClientSubmit() {
    this.processing = true;
    this.disableForm();
    const client = {
      fullname: this.addClientForm.get('fullname').value,
      email: this.addClientForm.get('email').value,
      phonenumber: this.addClientForm.get('phonenumber').value,
      job: this.addClientForm.get('job').value,
      skill: this.addClientForm.get('skill').value,
      event: this.idEvent,
    }
    this.clientService.addClient(client).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.addClientForm.reset();
          this.enableForm();
        }, 1000);
      }
    });
  }

  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res;
        console.log(this.event);
        this.idEvent = id;
        console.log(this.idEvent);
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
  }
  
}
