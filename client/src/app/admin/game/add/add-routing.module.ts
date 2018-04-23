import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { AddgamesComponent } from './add.component';
const routes: Routes = [
    { 
        path: '', component: AddgamesComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddgamesRoutingModule {}