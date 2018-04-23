import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckinMobileComponent } from './checkinmobile.component';
const routes: Routes = [
    { 
        path: '', component: CheckinMobileComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckinMobileRoutingModule {}