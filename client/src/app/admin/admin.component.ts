import { Router } from '@angular/router';
import { User } from './../models/user';
import { AuthServiceService } from './../service/auth-service.service';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;
declare let $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user : User;
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) { }

  RedirectUnregister(){
    this.router.navigate(['/redirectpage'],
    {queryParams: {mess: "error", messclass: "alert alert-danger"}});
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if(!profile.user){
        this.RedirectUnregister();
      }else{
        if(profile.user.role === 'admin'){
          return;
        }else{
          this.RedirectUnregister();
        }
      }
    });
    jQuery('#side-menu').metisMenu();
  }
}
