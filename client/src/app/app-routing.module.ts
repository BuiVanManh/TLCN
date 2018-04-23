import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
    {
        path: '', loadChildren: './web/web.module#WebModule'
    },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    { path: 'web', loadChildren: './web/web.module#WebModule'},
    { path: 'login', loadChildren: './components/login/login.module#LoginModule'},
    { path: 'login1', loadChildren: './components/login1/login1.module#Login1Module'},
    { path: 'register', loadChildren: './components/register/register.module#RegisterModule'},
    { path: 'register1', loadChildren: './components/register1/register1.module#Register1Module'},
    { path: 'forgotpassword', loadChildren: './components/forgotpassword/forgotpassword.module#ForgotpasswordModule'},
    { path: 'forgotpassword1', loadChildren: './components/forgotpassword1/forgotpassword1.module#Forgotpassword1Module'},
    { path: 'redirectpage', loadChildren: './components/redirectpage/redirectpage.module#RedirectpageModule'},
    { path: 'playgame/:id', loadChildren: './playgame/playgame.module#PlaygameModule'},
    { path: 'event/client', loadChildren: './web/demo01/event/client/client.module#ClientModule' },
    { path: 'game/listgame', loadChildren: './web/demo01/game/listgame/listgame.module#ListgameModule'},
    //Lotto game
    { path: 'game/lotto/:id', loadChildren: './gameshow/lotto/lotto.module#LottoModule'},
    //Report 
    { path: 'report/:id', loadChildren: './report/report.module#ReportModule'},
    //Checkin Mobile
    { path: 'event/checkinmobile/:id', loadChildren: './checkinmobile/checkinmobile.module#CheckinMobileModule'},
    //QRCode
    { path: 'qrcode', loadChildren: './qrcode/qrcode.module#QRCodeModule'},
    { path: 'event/checkinmobile', loadChildren: './checkinmobile/checkinmobile.module#CheckinMobileModule'},


    { path: 'notfound', loadChildren: './components/notfound/notfound.module#NotfoundModule'},
    { path: '**', redirectTo: 'notfound'}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

