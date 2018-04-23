import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottoRoutingModule } from './lotto-routing.module';
import { LottoComponent } from './lotto.component';

@NgModule({
    imports: [
        CommonModule,
        LottoRoutingModule

    ],
    declarations: [
        LottoComponent
    ]
})

export class LottoModule {}