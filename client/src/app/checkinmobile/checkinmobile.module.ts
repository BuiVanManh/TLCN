
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckinMobileComponent } from './checkinmobile.component';
import { CheckinMobileRoutingModule } from './checkinmobile-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CheckinMobileRoutingModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        CheckinMobileComponent,
    ]
})

export class CheckinMobileModule {}