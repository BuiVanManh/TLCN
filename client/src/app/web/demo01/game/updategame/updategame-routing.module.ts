import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdategameComponent } from './updategame.component';
const routes: Routes = [
    { 
        path: '', component: UpdategameComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdategameRoutingModule {}