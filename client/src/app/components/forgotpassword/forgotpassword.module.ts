import { ForgotpasswordComponent } from './forgotpassword.component';
import { ForgotpasswordRoutingModule } from './forgotpassword-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        ForgotpasswordRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ForgotpasswordComponent
    ]
})

export class ForgotpasswordModule {}