import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Login1RoutingModule } from './login1-routing.module';
import { Login1Component } from './login1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        Login1RoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        Login1Component
    ]
})

export class Login1Module {}