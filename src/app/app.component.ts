import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import {
  NavigationEnd,
  Router
} from '@angular/router';

import {
  Observable,
  filter
} from 'rxjs';

import {
  DarkModeService
} from 'angular-dark-mode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showNavbar = false;

  isMobileMenuOpen = false;

  mobileActiveLabel = 'Dashboard';

  mobileActiveIcon = 'fa-solid fa-house';

  isImagePreviewOpen = false;

  isNotificationOpen = false;

  hasUnreadNotifications = true;

  darkMode$: Observable<boolean> =
    this.darkModeService.darkMode$;


  constructor(
    private router: Router,
    private darkModeService: DarkModeService
  ) {
    this.checkUrl(this.router.url);
  }


  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {

        this.checkUrl(
          event.urlAfterRedirects
        );

        this.updateMobileNavigation(
          event.urlAfterRedirects
        );

      });

    this.updateMobileNavigation(
      this.router.url
    );
  }


  toggleTheme(): void {
    this.darkModeService.toggle();
  }


  private checkUrl(url: string): void {

    const lowerUrl =
      url.toLowerCase();

    this.showNavbar =
      lowerUrl.includes('/auth/') &&
      !lowerUrl.includes('login');

  }


  private updateMobileNavigation(
    url: string
  ): void {

    const lowerUrl =
      url.toLowerCase();


    if (
      lowerUrl === '/auth/dashboard' ||
      lowerUrl === '/auth/dashboard/'
    ) {

      this.mobileActiveLabel =
        'Dashboard';

      this.mobileActiveIcon =
        'fa-solid fa-house';

      return;
    }


    if (lowerUrl.includes('/auth/users')) {

      this.mobileActiveLabel =
        'Users';

      this.mobileActiveIcon =
        'fa-solid fa-users';

      return;
    }


    if (
      lowerUrl.includes(
        '/auth/billing-subscription'
      )
    ) {

      this.mobileActiveLabel =
        'Billing';

      this.mobileActiveIcon =
        'fa-solid fa-credit-card';

      return;
    }


    if (
      lowerUrl.includes('/auth/analytics')
    ) {

      this.mobileActiveLabel =
        'Analytics';

      this.mobileActiveIcon =
        'fa-solid fa-chart-pie';

      return;
    }


    if (
      lowerUrl.includes('/auth/pricing')
    ) {

      this.mobileActiveLabel =
        'Pricing';

      this.mobileActiveIcon =
        'fa-solid fa-tag';

      return;
    }


    if (
      lowerUrl.includes('/auth/audit-logs')
    ) {

      this.mobileActiveLabel =
        'Audit Logs';

      this.mobileActiveIcon =
        'fa-solid fa-shield-halved';

      return;
    }


    if (
      lowerUrl.includes(
        '/auth/account-settings'
      )
    ) {

      this.mobileActiveLabel =
        'Settings';

      this.mobileActiveIcon =
        'fa-solid fa-gear';

      return;
    }

  }


  toggleMobileMenu(): void {

    this.isMobileMenuOpen =
      !this.isMobileMenuOpen;

  }


  closeMobileMenu(): void {

    this.isMobileMenuOpen =
      false;

  }


  openImagePreview(): void {

    this.isImagePreviewOpen =
      true;

  }


  closeImagePreview(): void {

    this.isImagePreviewOpen =
      false;

  }


  toggleNotifications(
    event: MouseEvent
  ): void {

    event.stopPropagation();

    this.isNotificationOpen =
      !this.isNotificationOpen;

  }


  @HostListener('document:click')
  onDocumentClick(): void {

    this.isNotificationOpen =
      false;

  }


  @HostListener('document:keydown.escape')
  onEscape(): void {

    this.isNotificationOpen =
      false;

    this.isMobileMenuOpen =
      false;

    this.isImagePreviewOpen =
      false;

  }

}