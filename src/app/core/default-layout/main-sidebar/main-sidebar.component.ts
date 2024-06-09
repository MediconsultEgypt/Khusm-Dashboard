// import { Component, OnInit } from '@angular/core';
// import { navItems } from '../_nav';

// @Component({
//   selector: 'app-main-sidebar',
//   templateUrl: './main-sidebar.component.html',
//   styleUrls: ['./main-sidebar.component.css']
// })
// export class MainSidebarComponent implements OnInit {
//   public navItems = navItems;
//   provider_name: any;
//   isProvider: boolean = false;

//   user_name: any;
//   isAdmin: boolean = false;
//   constructor() { }

//   ngOnInit(): void {
//     this.provider_name = localStorage.getItem('provider_name');
//     this.user_name = localStorage.getItem('user_name');
//     if (this.provider_name != null) {
//       this.isProvider = true;
//       this.isAdmin = false;
//       console.log(this.isProvider)
//     }
//     if (this.user_name != null) {
//       this.isAdmin = true;
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { navItems } from '../_nav';

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

  constructor() { }

  ngOnInit(): void {
    this.provider_name = localStorage.getItem('provider_name');
    this.user_name = localStorage.getItem('user_name');
    
    console.log('provider_name:', this.provider_name); // Debugging
    console.log('user_name:', this.user_name);         // Debugging

    if (this.provider_name !== undefined && this.user_name == '') {
      this.isProvider = true;
      this.isAdmin = false;
    } else if (this.user_name != null) {
      this.isAdmin = true;
    }
  }
}

