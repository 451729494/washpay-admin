import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import {AuthService} from "../../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private router: Router,private _state:GlobalState, private authService:AuthService) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  public signOut() {
    this.authService.logout();
    console.log('logout ----');
    this.router.navigate(['/login']);
  }

  public change() {
    this.router.navigate(['/changepassword']);
  }
}
