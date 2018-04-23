import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddgamesRoutingModule } from './add-routing.module';
import { AddgamesComponent } from './add.component';

@NgModule({
    imports: [
        CommonModule,
        AddgamesRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        AddgamesComponent
    ]
})

export class AddgamesModule {}