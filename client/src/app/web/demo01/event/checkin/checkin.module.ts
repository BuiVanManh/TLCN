
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckinComponent } from './checkin.component';
import { CheckinRoutingModule } from './checkin-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CheckinRoutingModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        CheckinComponent,
    ]
})

export class CheckinModule {}