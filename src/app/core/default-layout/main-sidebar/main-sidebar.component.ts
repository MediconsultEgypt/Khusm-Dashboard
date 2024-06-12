import { Component, OnInit } from '@angular/core';
import { navItems } from '../_nav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  public navItems = navItems;
  provider_name: any;
  isProvider: boolean = false;

  user_name: any;
  isAdmin: boolean = false;

  isSidebarCollapsed: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.provider_name = localStorage.getItem('provider_name');
    this.user_name = localStorage.getItem('user_name');


    if (this.provider_name !== undefined && this.user_name == '') {
      this.isProvider = true;
      this.isAdmin = false;
    } else if (this.user_name != null) {
      this.isAdmin = true;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.collapseSidebar();
      }
    });

  }

  collapseSidebar(): void {
    const body = document.body;
    body.classList.remove('sidebar-open');
  }


  toggleSidebar() {
    console.log('doniaaa');
    // this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const body = document.body;
  if (body.classList.contains('sidebar-open')) {
    body.classList.remove('sidebar-open');
    body.classList.add('sidebar-closed');
    body.classList.add('sidebar-collapse')
  } else {
    body.classList.add('sidebar-open');
  }
  }
}

