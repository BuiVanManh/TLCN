import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

import { Login1Component } from './login1.component';
const routes: Routes = [
    { 
        path: '', component: Login1Component,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Login1RoutingModule {}