import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';

import { User } from "../../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  month = 0;
  users: Array<User> = [];
  user: User;

  searchKey = "";
  searchName = "";

  constructor(
    private authService: AuthServiceService,

  ) { }

  OnclickSearch(){
    this.searchKey = this.searchName;
  }

  ngOnInit() {
    this.authService.getTop4User().subscribe(data =>{
      //this.users = data.listUsers;
      this.users = data.listUsers;
      console.log(this.users);
      var d = new Date();
      this.month = d.getMonth();
      if(this.month == 0){
        this.month = 12;
      }
      console.log(this.month);
    });

    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
      }else{
        return;
      }
    });

  }

}
