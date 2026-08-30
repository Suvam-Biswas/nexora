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

    this.checkUrl(
      this.router.url
    );

  }


  ngOnInit(): void {

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(
        (event: NavigationEnd) => {

          this.checkUrl(
            event.urlAfterRedirects
          );

          this.updateMobileNavigation(
            event.urlAfterRedirects
          );

        }
      );


    this.updateMobileNavigation(
      this.router.url
    );

  }


  /* ============================================================
     THEME
     ============================================================ */

  toggleTheme(): void {

    this.darkModeService.toggle();

  }


  /* ============================================================
     URL / NAVBAR VISIBILITY
     ============================================================ */

  private checkUrl(
    url: string
  ): void {

    const lowerUrl =
      url.toLowerCase();


    this.showNavbar =
      lowerUrl.includes('/auth/') &&
      !lowerUrl.includes('login');

  }


  /* ============================================================
     MOBILE ACTIVE NAVIGATION
     ============================================================ */

  private updateMobileNavigation(
    url: string
  ): void {

    const lowerUrl =
      url.toLowerCase();


    /* ----------------------------------------------------------
       Dashboard
       ---------------------------------------------------------- */

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


    /* ----------------------------------------------------------
       Users
       ---------------------------------------------------------- */

    if (
      lowerUrl.includes('/auth/users')
    ) {

      this.mobileActiveLabel =
        'Users';

      this.mobileActiveIcon =
        'fa-solid fa-users';

      return;
    }


    /* ----------------------------------------------------------
       Billing
       ---------------------------------------------------------- */

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


    /* ----------------------------------------------------------
       Analytics
       ---------------------------------------------------------- */

    if (
      lowerUrl.includes('/auth/analytics')
    ) {

      this.mobileActiveLabel =
        'Analytics';

      this.mobileActiveIcon =
        'fa-solid fa-chart-pie';

      return;
    }


    /* ----------------------------------------------------------
       Pricing
       ---------------------------------------------------------- */

    if (
      lowerUrl.includes('/auth/pricing')
    ) {

      this.mobileActiveLabel =
        'Pricing';

      this.mobileActiveIcon =
        'fa-solid fa-tag';

      return;
    }


    /* ----------------------------------------------------------
       Audit Logs
       ---------------------------------------------------------- */

    if (
      lowerUrl.includes('/auth/audit-logs')
    ) {

      this.mobileActiveLabel =
        'Audit Logs';

      this.mobileActiveIcon =
        'fa-solid fa-shield-halved';

      return;
    }


    /* ----------------------------------------------------------
       Settings
       ---------------------------------------------------------- */

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


  /* ============================================================
     MOBILE MENU
     ============================================================ */

  toggleMobileMenu(): void {

    this.isMobileMenuOpen =
      !this.isMobileMenuOpen;

  }


  closeMobileMenu(): void {

    this.isMobileMenuOpen =
      false;

  }


  /* ============================================================
     IMAGE PREVIEW
     ============================================================ */

  openImagePreview(): void {

    this.isImagePreviewOpen =
      true;

  }


  closeImagePreview(): void {

    this.isImagePreviewOpen =
      false;

  }


  /* ============================================================
     NOTIFICATIONS
     ============================================================ */

  toggleNotifications(
    event: MouseEvent
  ): void {

    /*
     * Prevent the document click listener from immediately
     * closing the notification panel after opening it.
     */
    event.stopPropagation();


    /*
     * Close the mobile navigation menu when notifications
     * are opened.
     */
    if (!this.isNotificationOpen) {

      this.isMobileMenuOpen =
        false;

    }


    this.isNotificationOpen =
      !this.isNotificationOpen;

  }


  /* ============================================================
     DOCUMENT CLICK
     ============================================================ */

  @HostListener('document:click')
  onDocumentClick(): void {

    this.isNotificationOpen =
      false;

  }


  /* ============================================================
     ESCAPE KEY
     ============================================================ */

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