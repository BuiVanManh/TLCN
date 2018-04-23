import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    //BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // Shared Components
    ToastComponent
  ],
  declarations: [
    ToastComponent
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
