import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';

// Header and footer
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { EventService } from './service/event.service';
import { GameService } from './service/game.service';
import { GameShowService } from './service/gameshow.service';
import { AuthServiceService } from './service/auth-service.service';
import { ClientService } from './service/client.service';
import { ReportService } from './service/report.service';
//Calendar
// import { CalendarHeaderComponent } from './calendar-utils/calendar-header/calendar-header.component';
// import { DateTimePickerComponent } from './calendar-utils/date-time-picker/date-time-picker.component';
// import { CalendarComponent } from './components/calendar/calendar.component';
// import { DialogEventComponent } from './components/dialog/dialog-event/dialog-event.component';

import { CalendarModule } from 'angular-calendar';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AsyncLocalStorage } from 'angular-async-local-storage/src/service/lib.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModule,
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,

    // CalendarHeaderComponent,
    // DateTimePickerComponent,
    // CalendarComponent,
    // DialogEventComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapModalModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    NgxQRCodeModule
  ],
  providers: [
    EventService,
    GameService,
    GameShowService,
    AuthServiceService,
    ClientService,
    ReportService,

    NgbModal,
  ],
  bootstrap: [
    AppComponent, 
    // CalendarComponent, DialogEventComponent
  ],
  exports: [
    // CalendarComponent
  ],
  entryComponents: [
    // DialogEventComponent
  ]
})
export class AppModule { }
