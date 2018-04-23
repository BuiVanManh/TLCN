
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { NoSanitizePipe } from "./nosanitizepipe.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DetailRoutingModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        DetailComponent,
        NoSanitizePipe
    ]
})

export class DetailModule {}