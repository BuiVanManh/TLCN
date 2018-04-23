import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { SharedModule } from './shared/shared.module'

//import { CarouselComponent } from './demo01/carousel/carousel.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';

import { HomeComponent } from './demo01/home/home.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
    imports: [
        CommonModule,
        WebRoutingModule,
        SharedModule
    ],
    declarations: [
        WebComponent,
        HeaderComponent,
        FooterComponent,
        //CarouselComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class WebModule {}