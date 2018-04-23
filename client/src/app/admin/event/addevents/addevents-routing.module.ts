import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { AddeventsComponent } from './addevents.component';
const routes: Routes = [
    { 
        path: '', component: AddeventsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddeventsRoutingModule {}