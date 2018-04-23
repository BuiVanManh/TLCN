import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListgameComponent } from './listgame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListgameRoutingModule } from './listgame-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ListgameRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ListgameComponent
  ]
})
export class ListgameModule { }
