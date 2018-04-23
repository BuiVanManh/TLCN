import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListeventsComponent } from './listevents.component';
const routes: Routes = [
    { 
        path: '', component: ListeventsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListeventsRoutingModule {}