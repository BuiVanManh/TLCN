import { Forgotpassword1Component } from './forgotpassword1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
const routes: Routes = [
    { 
        path: '', component: Forgotpassword1Component,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Forgotpassword1RoutingModule {}