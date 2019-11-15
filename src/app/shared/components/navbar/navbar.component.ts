import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';

export interface NavItem {
  title: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})

@Injectable()
export class NavbarComponent {
  @Input() title;
  @Input() items: NavItem[];


  constructor(
      private authService: AuthService,
      private router: Router,
  ) { }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
