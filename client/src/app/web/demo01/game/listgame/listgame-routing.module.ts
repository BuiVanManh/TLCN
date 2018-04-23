import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListgameComponent } from './listgame.component';
const routes: Routes = [
    { 
        path: '', component: ListgameComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListgameRoutingModule {}