import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ListRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListComponent
    ]
})

export class ListModule {}