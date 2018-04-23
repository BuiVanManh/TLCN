import { ForgotpasswordComponent } from './forgotpassword.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
const routes: Routes = [
    { 
        path: '', component: ForgotpasswordComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForgotpasswordRoutingModule {}