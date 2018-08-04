import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() showImprint: false;

  constructor(
    public authService: AuthService,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

}
