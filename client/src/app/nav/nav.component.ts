import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // currentUser$!: Observable<User>;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    // this.currentUser$ = this.accountService.currentUser$
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/members');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
