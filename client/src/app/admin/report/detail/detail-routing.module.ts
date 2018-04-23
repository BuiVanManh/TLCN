import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { DetailComponent } from './detail.component';
const routes: Routes = [
    { 
        path: '', component: DetailComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailRoutingModule {}