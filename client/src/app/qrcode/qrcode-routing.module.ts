import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QRCodeComponent } from './qrcode.component';
const routes: Routes = [
    { 
        path: '', component: QRCodeComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QRCodeRoutingModule {}