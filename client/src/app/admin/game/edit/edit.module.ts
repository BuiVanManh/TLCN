import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [
        CommonModule,
        EditRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditComponent
    ]
})

export class EditModule {}