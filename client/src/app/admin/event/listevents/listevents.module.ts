import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeventsRoutingModule } from './listevents-routing.module';
import { ListeventsComponent } from './listevents.component';
import { NoSanitizePipe } from "./nosanitizepipe.component";

@NgModule({
    imports: [
        CommonModule,
        ListeventsRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListeventsComponent,
        NoSanitizePipe
    ]
})

export class ListeventsModule {}