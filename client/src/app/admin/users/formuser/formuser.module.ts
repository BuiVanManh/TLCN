import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormuserRoutingModule } from './formuser-routing.module';
import { FormuserComponent } from './formuser.component';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        FormuserRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MyDatePickerModule

    ],
    declarations: [
        FormuserComponent
    ]
})

export class FormuserModule {}