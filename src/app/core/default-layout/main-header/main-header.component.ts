import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  // user
  user_name: string;
  provider_name: string;

  constructor(private _AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // get user name
    this.user_name = localStorage.getItem('user_name');
    this.provider_name = localStorage.getItem('provider_name');
  }

  logout() {
    this._AuthService.logout();
    this.router.navigate(['/login']);
  }

}
