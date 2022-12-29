import { Component, Input, OnInit } from '@angular/core';

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
      icon: 'fa-solid fa-house'
    },
    {
      number: '2',
      name: 'Profile',
      icon: 'fa-solid fa-user-large'
    },
    {
      number: '3',
      name: 'Teams',
      icon: 'fa-solid fa-users'
    },
    {
      number: '4',
      name: 'Matches',
      icon: 'fa-solid fa-gamepad'
    },
    {
      number: '5',
      name: 'Ranking',
      icon: 'fa-solid fa-trophy'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
