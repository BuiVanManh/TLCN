import { Forgotpassword1Component } from './forgotpassword1.component';
import { Forgotpassword1RoutingModule } from './forgotpassword1-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        Forgotpassword1RoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        Forgotpassword1Component
    ]
})

export class Forgotpassword1Module {}