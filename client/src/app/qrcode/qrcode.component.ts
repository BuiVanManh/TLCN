import { Component, OnInit, style } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import Report from '../models/report.model';
import { ReportService } from '../service/report.service';

import Event from '../models/event.model';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCodeComponent implements OnInit {

  host = 'http://192.168.9.103:4200/event/checkinmobile';

  constructor() {  }

  ngOnInit() {
    
  }
  
}
