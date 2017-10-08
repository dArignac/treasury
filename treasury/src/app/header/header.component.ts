import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private userService: UserService, public router: Router) {

  }

  gotoPage(slug: string) {
    this.router.navigate(([slug]));
  }

  ngOnInit() {
  }

}
