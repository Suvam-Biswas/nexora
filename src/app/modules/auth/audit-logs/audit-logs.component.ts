import { Component } from '@angular/core';


interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  email: string;
  action: string;
  category: 'security' | 'billing' | 'user' | 'system';
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Failed';
}

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss']
})

export class AuditLogsComponent {

  searchQuery: string = '';
  selectedCategory: string = 'all';

  logs: AuditLog[] = [
    {
      id: 'LOG-8842',
      timestamp: '2026-08-29 14:15:22',
      user: 'Suvam Biswas',
      email: 'suvam@nexora.dev',
      action: 'Updated security password and MFA settings',
      category: 'security',
      ipAddress: '192.168.1.45',
      status: 'Success'
    },
    {
      id: 'LOG-8841',
      timestamp: '2026-08-29 12:04:10',
      user: 'System Bot',
      email: 'bot@nexora.dev',
      action: 'Automated monthly subscription tier processing',
      category: 'billing',
      ipAddress: '10.0.0.12',
      status: 'Success'
    },
    {
      id: 'LOG-8840',
      timestamp: '2026-08-28 18:30:55',
      user: 'Sarah Jenkins',
      email: 'sarah.j@enterprise.com',
      action: 'Failed login attempt with invalid credentials',
      category: 'security',
      ipAddress: '45.33.22.11',
      status: 'Failed'
    },
    {
      id: 'LOG-8839',
      timestamp: '2026-08-28 16:11:04',
      user: 'Suvam Biswas',
      email: 'suvam@nexora.dev',
      action: 'Created new user API access token for production',
      category: 'user',
      ipAddress: '192.168.1.45',
      status: 'Success'
    },
    {
      id: 'LOG-8838',
      timestamp: '2026-08-27 09:20:15',
      user: 'System Bot',
      email: 'bot@nexora.dev',
      action: 'Database index optimization and vacuum run',
      category: 'system',
      ipAddress: '10.0.0.8',
      status: 'Success'
    }
  ];

  get filteredLogs(): AuditLog[] {
    return this.logs.filter(log => {
      const matchesSearch =
        log.user.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        log.id.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCategory = this.selectedCategory === 'all' || log.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  exportLogs(): void {
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["ID,Timestamp,User,Email,Action,Category,IP,Status"].join(",") + "\n"
      + this.logs.map(e => Object.values(e).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nexora_audit_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}