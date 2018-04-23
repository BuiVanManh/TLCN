import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailgameComponent } from './detailgame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailgameRoutingModule } from './detailgame-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DetailgameRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DetailgameComponent]
})
export class DetailgameModule { }
