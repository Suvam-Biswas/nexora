import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { AddUserComponentComponent } from './add-user-component/add-user-component.component';


interface User {
  id: number;

  name: string;

  email: string;

  initials: string;

  badgeBg: string;

  role:
  | 'Admin'
  | 'Editor'
  | 'Member'
  | 'Billing';

  status:
  | 'Active'
  | 'Pending'
  | 'Suspended';

  dateAdded: string;
}


@Component({
  selector: 'app-users-component',

  templateUrl: './users-component.component.html',

  styleUrls: ['./users-component.component.scss']
})
export class UsersComponentComponent implements OnInit {


  /* =========================================================
     SEARCH AND FILTERS
     ========================================================= */

  searchQuery: string = '';

  selectedRole: string = 'All';

  selectedStatus: string = 'All';


  roles: string[] = [
    'All',
    'Admin',
    'Editor',
    'Member',
    'Billing'
  ];


  statuses: string[] = [
    'All',
    'Active',
    'Pending',
    'Suspended'
  ];


  /* =========================================================
     PAGINATION
     ========================================================= */

  currentPage: number = 1;

  itemsPerPage: number = 5;


  /* =========================================================
     USERS
     ========================================================= */

  users: User[] = [

    {
      id: 1,

      name: 'Alex Morgan',

      email: 'alex.m@company.com',

      initials: 'AM',

      badgeBg:
        'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

      role: 'Admin',

      status: 'Active',

      dateAdded: 'Jan 12, 2026'
    },


    {
      id: 2,

      name: 'Sarah Jenkins',

      email: 'sarah.j@startup.io',

      initials: 'SJ',

      badgeBg:
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',

      role: 'Editor',

      status: 'Active',

      dateAdded: 'Feb 04, 2026'
    },


    {
      id: 3,

      name: 'Liam Chen',

      email: 'liam.chen@devhub.net',

      initials: 'LC',

      badgeBg:
        'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',

      role: 'Member',

      status: 'Pending',

      dateAdded: 'Mar 19, 2026'
    },


    {
      id: 4,

      name: 'Elena Rostova',

      email: 'elena@designcraft.co',

      initials: 'ER',

      badgeBg:
        'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',

      role: 'Billing',

      status: 'Active',

      dateAdded: 'Apr 02, 2026'
    },


    {
      id: 5,

      name: 'Marcus Vance',

      email: 'marcus@vancemedia.com',

      initials: 'MV',

      badgeBg:
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',

      role: 'Member',

      status: 'Suspended',

      dateAdded: 'Apr 15, 2026'
    }

  ];


  constructor(
    private dialog: MatDialog,

    @Inject(PLATFORM_ID)
    private platformId: Object
  ) { }


  ngOnInit(): void {
  }


  /* =========================================================
     SEARCH CHANGE
     ========================================================= */

  onSearchChange(): void {

    this.currentPage = 1;

  }


  /* =========================================================
     FILTER CHANGE
     ========================================================= */

  onFilterChange(): void {

    this.currentPage = 1;

  }


  /* =========================================================
     FILTERED USERS
     ========================================================= */

  get filteredUsers(): User[] {

    const query =
      this.searchQuery
        .trim()
        .toLowerCase();


    return this.users.filter((user: User) => {

      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(query) ||

        user.email
          .toLowerCase()
          .includes(query);


      const matchesRole =
        this.selectedRole === 'All' ||

        user.role === this.selectedRole;


      const matchesStatus =
        this.selectedStatus === 'All' ||

        user.status === this.selectedStatus;


      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );

    });

  }


  /* =========================================================
     PAGINATED USERS
     ========================================================= */

  get paginatedUsers(): User[] {

    const totalPages =
      this.totalPages;


    if (this.currentPage > totalPages) {

      this.currentPage = totalPages;

    }


    const start =
      (this.currentPage - 1) *
      this.itemsPerPage;


    return this.filteredUsers.slice(
      start,
      start + this.itemsPerPage
    );

  }


  /* =========================================================
     TOTAL PAGES
     ========================================================= */

  get totalPages(): number {

    return Math.ceil(
      this.filteredUsers.length /
      this.itemsPerPage
    ) || 1;

  }


  /* =========================================================
     PAGE NUMBERS
     ========================================================= */

  get pageNumbers(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },

      (_, index) => index + 1

    );

  }


  /* =========================================================
     NEXT PAGE
     ========================================================= */

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }


  /* =========================================================
     PREVIOUS PAGE
     ========================================================= */

  prevPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }


  /* =========================================================
     GO TO PAGE
     ========================================================= */

  goToPage(page: number): void {

    if (
      page >= 1 &&
      page <= this.totalPages
    ) {

      this.currentPage = page;

    }

  }


  /* =========================================================
     ADD USER
     ========================================================= */

  openAddUserView(): void {

    this.openUserDialog();

  }


  /* =========================================================
     EDIT USER
     ========================================================= */

  editUser(user: User): void {

    this.openUserDialog(user);

  }


  /* =========================================================
     USER DIALOG
     ========================================================= */

  private openUserDialog(
    userToEdit?: User
  ): void {

    const isBrowser =
      isPlatformBrowser(
        this.platformId
      );


    const viewportWidth =
      isBrowser
        ? window.innerWidth
        : 1024;


    const viewportHeight =
      isBrowser
        ? window.innerHeight
        : 768;


    let width: string;

    let height: string;

    let maxWidth: string;

    let maxHeight: string;


    if (viewportWidth <= 480) {

      width = '100vw';

      height = 'auto';

      maxWidth = '100vw';

      maxHeight = '100vh';

    }


    else if (viewportWidth <= 600) {

      width = '96vw';

      height = 'auto';

      maxWidth = '96vw';

      maxHeight = '94vh';

    }


    else if (viewportWidth <= 768) {

      width = '92vw';

      height = 'auto';

      maxWidth = '92vw';

      maxHeight = '92vh';

    }


    else if (viewportWidth <= 1024) {

      width = '78vw';

      height = 'auto';

      maxWidth = '78vw';

      maxHeight = '90vh';

    }


    else if (viewportWidth <= 1280) {

      width = '58vw';

      height = 'auto';

      maxWidth = '720px';

      maxHeight = '88vh';

    }


    else if (viewportWidth <= 1600) {

      width = '520px';

      height = 'auto';

      maxWidth = '520px';

      maxHeight = '86vh';

    }


    else if (viewportWidth <= 1920) {

      width = '540px';

      height = 'auto';

      maxWidth = '540px';

      maxHeight = '84vh';

    }


    else {

      width = '560px';

      height = 'auto';

      maxWidth = '560px';

      maxHeight = '82vh';

    }


    if (viewportHeight <= 600) {

      height = 'auto';

      maxHeight = '94vh';

    }

    else if (viewportHeight <= 720) {

      maxHeight = '90vh';

    }


    const dialogRef =
      this.dialog.open(
        AddUserComponentComponent,
        {
          width,

          height,

          maxWidth,

          maxHeight,

          panelClass:
            'responsive-user-dialog',

          disableClose: true,

          data: {
            user:
              userToEdit || null
          }
        }
      );


    dialogRef
      .afterClosed()
      .subscribe((result: any) => {

        if (!result) {
          return;
        }


        if (userToEdit) {

          this.updateUserRecord(
            userToEdit.id,
            result
          );

        }

        else {

          this.addNewUserRecord(
            result
          );

        }

      });

  }


  /* =========================================================
     ADD USER RECORD
     ========================================================= */

  addNewUserRecord(
    formData: any
  ): void {

    const fullName =
      String(
        formData.fullName || ''
      ).trim();


    const nameParts =
      fullName
        .split(/\s+/)
        .filter(Boolean);


    const initials =
      nameParts.length > 1

        ? (
          nameParts[0][0] +
          nameParts[nameParts.length - 1][0]
        ).toUpperCase()

        : nameParts[0]
          ?.substring(0, 2)
          .toUpperCase() || 'US';


    const gradients: string[] = [

      'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',

      'linear-gradient(135deg, #10b981 0%, #059669 100%)',

      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',

      'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',

      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',

      'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'

    ];


    const randomBadgeBg =
      gradients[
      Math.floor(
        Math.random() *
        gradients.length
      )
      ];


    const options:
      Intl.DateTimeFormatOptions = {

      month: 'short',

      day: 'numeric',

      year: 'numeric'

    };


    const formattedDate =
      new Date()
        .toLocaleDateString(
          'en-US',
          options
        );


    const createdUser: User = {

      id:
        this.users.length

          ? Math.max(
            ...this.users.map(
              user => user.id
            )
          ) + 1

          : 1,

      name: fullName,

      email:
        formData.email,

      initials,

      badgeBg:
        randomBadgeBg,

      role:
        formData.role,

      status:
        formData.status,

      dateAdded:
        formattedDate

    };


    this.users.unshift(
      createdUser
    );


    this.currentPage = 1;

  }


  /* =========================================================
     UPDATE USER RECORD
     ========================================================= */

  updateUserRecord(
    id: number,
    formData: any
  ): void {

    const index =
      this.users.findIndex(
        user => user.id === id
      );


    if (index === -1) {
      return;
    }


    const fullName =
      String(
        formData.fullName || ''
      ).trim();


    const nameParts =
      fullName
        .split(/\s+/)
        .filter(Boolean);


    const initials =
      nameParts.length > 1

        ? (
          nameParts[0][0] +
          nameParts[nameParts.length - 1][0]
        ).toUpperCase()

        : nameParts[0]
          ?.substring(0, 2)
          .toUpperCase() || 'US';


    this.users[index] = {

      ...this.users[index],

      name:
        fullName,

      email:
        formData.email,

      initials,

      role:
        formData.role,

      status:
        formData.status

    };

  }


  /* =========================================================
     DELETE USER
     ========================================================= */

  deleteUser(user: User): void {

    const confirmed =
      confirm(
        `Are you sure you want to delete user ${user.name}?`
      );


    if (!confirmed) {
      return;
    }


    this.users =
      this.users.filter(
        item => item.id !== user.id
      );


    if (
      this.currentPage >
      this.totalPages
    ) {

      this.currentPage =
        this.totalPages;

    }

  }

}