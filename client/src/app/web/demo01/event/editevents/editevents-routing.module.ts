import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditeventsComponent } from './editevents.component';
const routes: Routes = [
    { 
        path: '', component: EditeventsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditeventsRoutingModule {}