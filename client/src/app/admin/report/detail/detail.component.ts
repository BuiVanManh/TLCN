import { Component, OnInit } from '@angular/core';
import Event from '../../../models/event.model';
import { EventService } from '../../../service/event.service';

import Report from '../../../models/report.model';
import { ReportService } from '../../../service/report.service';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  event = new Event();
  events: Array<Event> = [];
  reports: Array<Report> = [];

  public eventID;

  constructor(
    private eventService : EventService,
    private reportService : ReportService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getEventDetail(this.activatedRoute.snapshot.params['id']);
    this.getAllReport();
  }

  getEventDetail(id){
    this.eventService.getSingleEvent(id).subscribe(
      res => {
        this.event = res;
        console.log(this.event);
        this.eventID = res.event._id
        console.log(this.eventID);
      },
      error => console.log(error)
    );
  }

  getAllReport() {
    this.reportService.getAllReports().subscribe(
      data => {
        console.log('data:', data.listReports);
        var filter_data = []

        for(let e of data.listReports) {
          if (e['event']._id == this.eventID) {
            filter_data.push(e)
          }
        }
        this.reports = filter_data;
        console.log('List reports', this.reports);
      }
    );
  }
}
