import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
    imports: [
        CommonModule,
        DetailRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        DetailComponent
    ]
})

export class DetailModule {}