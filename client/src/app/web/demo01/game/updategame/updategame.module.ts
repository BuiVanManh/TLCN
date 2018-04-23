import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdategameComponent } from './updategame.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdategameRoutingModule } from './updategame-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    UpdategameRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UpdategameComponent]
})
export class UpdategameModule { }
