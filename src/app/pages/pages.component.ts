import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>

    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  private dyncMenu = [];

  constructor(private _menuService: BaMenuService,private authService:AuthService) {

  }

  ngOnInit() {
    //TODO dync load page_menu

    this.dyncMenu.push(this.authService.getPageMenu());


    this._menuService.updateMenuByRoutes(<Routes>this.dyncMenu);
  }
}
