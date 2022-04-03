import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  router: Router;
  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  navigate(route: string){
    this.router.navigate([route])
  }

}
