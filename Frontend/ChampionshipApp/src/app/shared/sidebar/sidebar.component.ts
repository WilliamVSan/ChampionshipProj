import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Home',
      icon: 'fa-solid fa-house',
      route: 'home'
    },
    {
      number: '2',
      name: 'Profile',
      icon: 'fa-solid fa-user-large',
      route: `user/profile/`
    },
    {
      number: '3',
      name: 'Teams',
      icon: 'fa-solid fa-users',
      route: 'teams'
    },
    {
      number: '4',
      name: 'Matches',
      icon: 'fa-solid fa-gamepad',
      route: 'matches'
    },
    {
      number: '5',
      name: 'Ranking',
      icon: 'fa-solid fa-trophy',
      route: 'ranking'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showMenu(): boolean {
    return this.router.url != '/user/login';
  }

}
