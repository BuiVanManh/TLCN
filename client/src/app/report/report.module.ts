
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReportRoutingModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        ReportComponent,
    ]
})

export class ReportModule {}