import { Injectable } from '@angular/core';

import { AngularFireDatabase } from "angularfire2/database";

import { AuthService } from "./auth.service";
import { UserService } from "./user.service";


@Injectable()
export class CatalogService {

  constructor(private authService: AuthService, private userService: UserService, db: AngularFireDatabase) {
  }

}
