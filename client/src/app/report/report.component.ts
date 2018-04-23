import { Component, OnInit, style } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Report from '../models/report.model';
import { ReportService } from '../service/report.service';

import Event from '../models/event.model';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  event;
  idEvent;

  public addReportForm: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService : EventService,
    private reportService: ReportService,
    private activatedRoute: ActivatedRoute,
  ) { this.createForm(); }

  createForm(){
    this.addReportForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone:['', Validators.required],
      content: ['', Validators.required],
    });
  }
  
  disableForm() {
    this.addReportForm.controls['username'].disable();
    this.addReportForm.controls['email'].disable();
    this.addReportForm.controls['phone'].disable();
    this.addReportForm.controls['content'].disable();
  }

  enableForm() {
    this.addReportForm.controls['username'].enable();
    this.addReportForm.controls['email'].enable();
    this.addReportForm.controls['phone'].enable();
    this.addReportForm.controls['content'].enable();
  }

  reset() {
    this.createForm();
    this.enableForm();
  }

  onReportSubmit() {
    this.processing = true;
    this.disableForm();
    const report = {
      username: this.addReportForm.get('username').value,
      email: this.addReportForm.get('email').value,
      phone: this.addReportForm.get('phone').value,
      content: this.addReportForm.get('content').value,
      event: this.idEvent,
    }
    this.reportService.addReport(report).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() => {
          this.addReportForm.reset();
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
