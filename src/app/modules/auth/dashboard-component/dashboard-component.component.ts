import { Component, OnInit } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  icon: string;
  iconBg: string;
}

interface Transaction {
  name: string;
  email: string;
  initials: string;
  badgeBg: string;
  plan: string;
  amount: string;
  status: 'Active' | 'Pending' | 'Failed';
  date: string;
}

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.scss']
})
export class DashboardComponentComponent implements OnInit {

  selectedDateRange: string = 'Last 30 Days';

  isDateDropdownOpen: boolean = false;

  activeChartTab:
    'Revenue' | 'Users' | 'Conversion' = 'Revenue';

  dateRanges: string[] = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'This Year'
  ];


  statCards: StatCard[] = [

    {
      title: 'Total Revenue',
      value: '$48,250.80',
      percentage: '+12.5% from last period',
      isPositive: true,
      icon: 'fa-solid fa-dollar-sign',
      iconBg: 'rgba(99, 102, 241, 0.15)'
    },

    {
      title: 'Active Users',
      value: '2,420',
      percentage: '+8.2% from last period',
      isPositive: true,
      icon: 'fa-solid fa-users',
      iconBg: 'rgba(52, 211, 153, 0.15)'
    },

    {
      title: 'Bounce Rate',
      value: '24.3%',
      percentage: '-2.1% from last period',
      isPositive: true,
      icon: 'fa-solid fa-chart-pie',
      iconBg: 'rgba(168, 85, 247, 0.15)'
    },

    {
      title: 'Conversion Rate',
      value: '4.86%',
      percentage: '+1.4% from last period',
      isPositive: true,
      icon: 'fa-solid fa-arrow-trend-up',
      iconBg: 'rgba(234, 179, 8, 0.15)'
    }

  ];


  recentTransactions: Transaction[] = [

    {
      name: 'Alex Morgan',
      email: 'alex.m@company.com',
      initials: 'AM',
      badgeBg:
        'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      plan: 'Enterprise Pro',
      amount: '$499.00',
      status: 'Active',
      date: 'Today, 2:45 PM'
    },

    {
      name: 'Sarah Jenkins',
      email: 'sarah.j@startup.io',
      initials: 'SJ',
      badgeBg:
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      plan: 'Growth Team',
      amount: '$199.00',
      status: 'Active',
      date: 'Today, 11:12 AM'
    },

    {
      name: 'Liam Chen',
      email: 'liam.chen@devhub.net',
      initials: 'LC',
      badgeBg:
        'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      plan: 'Developer Starter',
      amount: '$49.00',
      status: 'Pending',
      date: 'Yesterday, 6:30 PM'
    },

    {
      name: 'Elena Rostova',
      email: 'elena@designcraft.co',
      initials: 'ER',
      badgeBg:
        'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      plan: 'Growth Team',
      amount: '$199.00',
      status: 'Active',
      date: 'May 24, 2026'
    },

    {
      name: 'Marcus Vance',
      email: 'marcus@vancemedia.com',
      initials: 'MV',
      badgeBg:
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      plan: 'Enterprise Pro',
      amount: '$499.00',
      status: 'Failed',
      date: 'May 23, 2026'
    }

  ];


  constructor() { }


  ngOnInit(): void { }


  toggleDateDropdown(): void {

    this.isDateDropdownOpen =
      !this.isDateDropdownOpen;

  }


  selectDateRange(range: string): void {

    this.selectedDateRange = range;

    this.isDateDropdownOpen = false;

  }


  setChartTab(
    tab: 'Revenue' | 'Users' | 'Conversion'
  ): void {

    this.activeChartTab = tab;

  }


  exportReport(): void {

    const csvContent =
      'data:text/csv;charset=utf-8,'
      + 'Customer,Email,Plan,Amount,Status,Date\n'
      + this.recentTransactions
        .map(transaction =>
          `"${transaction.name}",` +
          `"${transaction.email}",` +
          `"${transaction.plan}",` +
          `"${transaction.amount}",` +
          `"${transaction.status}",` +
          `"${transaction.date}"`
        )
        .join('\n');


    const encodedUri =
      encodeURI(csvContent);


    const link =
      document.createElement('a');


    link.setAttribute(
      'href',
      encodedUri
    );


    link.setAttribute(
      'download',
      `dashboard_report_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }


  viewAllTransactions(): void {

    alert(
      'Redirecting to full transactions directory table...'
    );

  }


  onTransactionAction(
    tx: Transaction
  ): void {

    alert(
      `Opening action menu for transaction: ${tx.name} (${tx.amount})`
    );

  }

}