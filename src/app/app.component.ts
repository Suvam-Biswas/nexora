import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showNavbar: boolean = false;

  constructor(private router: Router) {
    this.checkUrl(this.router.url);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkUrl(event.urlAfterRedirects);
    });
  }

  private checkUrl(url: string) {
    const lowerUrl = url.toLowerCase();
    
    // Only show the navbar if it's an auth route and NOT the login page
    this.showNavbar = lowerUrl.includes('/auth/') && !lowerUrl.includes('login');
  }
}