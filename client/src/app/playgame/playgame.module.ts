import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlaygameRoutingModule } from './playgame-routing.module';
import { PlaygameComponent } from './playgame.component';

@NgModule({
    imports: [
        CommonModule,
       PlaygameRoutingModule

    ],
    declarations: [
        PlaygameComponent
    ]
})

export class PlaygameModule {}