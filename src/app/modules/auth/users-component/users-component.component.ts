import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddUserComponentComponent } from './add-user-component/add-user-component.component';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

interface User {
  id: number;
  name: string;
  email: string;
  initials: string;
  badgeBg: string;
  role: 'Admin' | 'Editor' | 'Member' | 'Billing';
  status: 'Active' | 'Pending' | 'Suspended';
  dateAdded: string;
}

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.scss']
})
export class UsersComponentComponent implements OnInit {

  // Search & Filters state
  searchQuery: string = '';
  selectedRole: string = 'All';
  selectedStatus: string = 'All';

  roles: string[] = ['All', 'Admin', 'Editor', 'Member', 'Billing'];
  statuses: string[] = ['All', 'Active', 'Pending', 'Suspended'];

  // Pagination state
  currentPage: number = 1;
  itemsPerPage: number = 5;

  // Mock User Data Pool
  users: User[] = [
    {
      id: 1,
      name: 'Alex Morgan',
      email: 'alex.m@company.com',
      initials: 'AM',
      badgeBg: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      role: 'Admin',
      status: 'Active',
      dateAdded: 'Jan 12, 2026'
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      email: 'sarah.j@startup.io',
      initials: 'SJ',
      badgeBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      role: 'Editor',
      status: 'Active',
      dateAdded: 'Feb 04, 2026'
    },
    {
      id: 3,
      name: 'Liam Chen',
      email: 'liam.chen@devhub.net',
      initials: 'LC',
      badgeBg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      role: 'Member',
      status: 'Pending',
      dateAdded: 'Mar 19, 2026'
    },
    {
      id: 4,
      name: 'Elena Rostova',
      email: 'elena@designcraft.co',
      initials: 'ER',
      badgeBg: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      role: 'Billing',
      status: 'Active',
      dateAdded: 'Apr 02, 2026'
    },
    {
      id: 5,
      name: 'Marcus Vance',
      email: 'marcus@vancemedia.com',
      initials: 'MV',
      badgeBg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      role: 'Member',
      status: 'Suspended',
      dateAdded: 'Apr 15, 2026'
    }
  ];

  constructor(
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void { }

  // Computed filtered users list
  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.selectedRole === 'All' || user.role === this.selectedRole;
      const matchesStatus = this.selectedStatus === 'All' || user.status === this.selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  // Paginated users slice
  get paginatedUsers(): User[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage) || 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Open Add User Dialog
  openAddUserView(): void {
    this.openUserDialog();
  }

  // Open Edit User Dialog
  editUser(user: User): void {
    this.openUserDialog(user);
  }

  // Universal Dialog Handler for Add & Edit
  private openUserDialog(userToEdit?: User): void {
    const isBrowser = isPlatformBrowser(this.platformId);

    const viewportWidth = isBrowser ? window.innerWidth : 1024;
    const viewportHeight = isBrowser ? window.innerHeight : 768;

    let width: string;
    let height: string;
    let maxWidth: string;
    let maxHeight: string;

    /*
     * ============================================================
     * EXTRA SMALL MOBILE
     * <= 480px
     * ============================================================
     * Full-width dialog with comfortable side spacing handled
     * by the dialog container itself.
     */
    if (viewportWidth <= 480) {
      width = '100vw';
      height = 'auto';
      maxWidth = '100vw';
      maxHeight = '100vh';
    }

    /*
     * ============================================================
     * SMALL MOBILE
     * 481px - 600px
     * ============================================================
     */
    else if (viewportWidth <= 600) {
      width = '96vw';
      height = 'auto';
      maxWidth = '96vw';
      maxHeight = '94vh';
    }

    /*
     * ============================================================
     * LARGE MOBILE / SMALL TABLET
     * 601px - 768px
     * ============================================================
     */
    else if (viewportWidth <= 768) {
      width = '92vw';
      height = 'auto';
      maxWidth = '92vw';
      maxHeight = '92vh';
    }

    /*
     * ============================================================
     * TABLET / FOLDABLE
     * 769px - 1024px
     * ============================================================
     */
    else if (viewportWidth <= 1024) {
      width = '78vw';
      height = 'auto';
      maxWidth = '78vw';
      maxHeight = '90vh';
    }

    /*
     * ============================================================
     * SMALL LAPTOP
     * 1025px - 1280px
     * ============================================================
     */
    else if (viewportWidth <= 1280) {
      width = '58vw';
      height = 'auto';
      maxWidth = '720px';
      maxHeight = '88vh';
    }

    /*
     * ============================================================
     * DESKTOP
     * 1281px - 1600px
     * ============================================================
     */
    else if (viewportWidth <= 1600) {
      width = '520px';
      height = 'auto';
      maxWidth = '520px';
      maxHeight = '86vh';
    }

    /*
     * ============================================================
     * LARGE DESKTOP
     * 1601px - 1920px
     * ============================================================
     */
    else if (viewportWidth <= 1920) {
      width = '540px';
      height = 'auto';
      maxWidth = '540px';
      maxHeight = '84vh';
    }

    /*
     * ============================================================
     * ULTRAWIDE / 2K / 4K
     * > 1920px
     * ============================================================
     */
    else {
      width = '560px';
      height = 'auto';
      maxWidth = '560px';
      maxHeight = '82vh';
    }

    /*
     * Prevent the dialog from becoming too tall on
     * short laptop / tablet screens.
     */
    if (viewportHeight <= 600) {
      height = 'auto';
      maxHeight = '94vh';
    } else if (viewportHeight <= 720) {
      maxHeight = '90vh';
    }

    const dialogRef = this.dialog.open(AddUserComponentComponent, {
      width,
      height,
      maxWidth,
      maxHeight,

      // Important for responsive Material dialogs
      panelClass: 'responsive-user-dialog',

      disableClose: true,

      data: {
        user: userToEdit || null
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (userToEdit) {
          this.updateUserRecord(userToEdit.id, result);
        } else {
          this.addNewUserRecord(result);
        }
      }
    });
  }

  addNewUserRecord(formData: any): void {
    const nameParts = formData.fullName.trim().split(' ');
    const initials = nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : nameParts[0].substring(0, 2).toUpperCase();

    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
    ];
    const randomBadgeBg = gradients[Math.floor(Math.random() * gradients.length)];

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    const createdUser: User = {
      id: this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
      name: formData.fullName,
      email: formData.email,
      initials: initials,
      badgeBg: randomBadgeBg,
      role: formData.role,
      status: formData.status,
      dateAdded: formattedDate
    };

    this.users.unshift(createdUser);
    this.currentPage = 1;
  }

  updateUserRecord(id: number, formData: any): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      const nameParts = formData.fullName.trim().split(' ');
      const initials = nameParts.length > 1
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : nameParts[0].substring(0, 2).toUpperCase();

      this.users[index] = {
        ...this.users[index],
        name: formData.fullName,
        email: formData.email,
        initials: initials,
        role: formData.role,
        status: formData.status
      };
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}