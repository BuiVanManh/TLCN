import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

import { PlaygameComponent } from './playgame.component';
const routes: Routes = [
    { 
        path: '', component: PlaygameComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlaygameRoutingModule {}