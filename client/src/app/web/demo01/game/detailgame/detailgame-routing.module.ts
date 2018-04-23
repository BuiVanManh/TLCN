import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailgameComponent } from './detailgame.component';
const routes: Routes = [
    { 
        path: '', component: DetailgameComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailgameRoutingModule {}