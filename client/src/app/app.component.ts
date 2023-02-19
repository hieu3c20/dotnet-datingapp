import { AccountService } from './_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hi Angular';
  users: any;

  constructor(private accountService: AccountService) {}

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountService.setCurrentUser(user);
  }

  ngOnInit() {
    // this.getUsers();
    this.setCurrentUser();
  }

  // getUsers() {
  //   this.http.get('https://localhost:5001/api/users').subscribe(
  //     (res) => {
  //       this.users = res;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
