
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QRCodeComponent } from './qrcode.component';
import { QRCodeRoutingModule } from './qrcode-routing.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        QRCodeRoutingModule,
        ReactiveFormsModule,
        NgxQRCodeModule
    ],
    declarations: [
        QRCodeComponent,
    ]
})

export class QRCodeModule {}