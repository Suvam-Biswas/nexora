import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

interface AnalyticsData {
  totalRevenue: string;
  revenueTrend: string;
  revenuePositive: boolean;
  activeSubscribers: string;
  subscribersTrend: string;
  conversionRate: string;
  conversionTrend: string;
  bounceRate: string;
  bounceTrend: string;
  trafficSources: { name: string; percentage: number; visitors: string; color: string }[];
  funnelSteps: { stage: string; count: string; conversion: string; width: string }[];
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  filterForm!: FormGroup;
  successMessage: string | null = null;

  // Dataset mapping for dynamic date-range filtering
  private metricsDatasets: { [key: string]: AnalyticsData } = {
    '7days': {
      totalRevenue: '$28,450',
      revenueTrend: '+5.4%',
      revenuePositive: true,
      activeSubscribers: '1,920',
      subscribersTrend: '+3.1%',
      conversionRate: '3.91%',
      conversionTrend: '+0.4%',
      bounceRate: '39.8%',
      bounceTrend: '-1.2%',
      trafficSources: [
        { name: 'Organic Search', percentage: 45, visitors: '6,210', color: '#6366f1' },
        { name: 'Social Media (Reels/Carousels)', percentage: 30, visitors: '4,140', color: '#0ea5e9' },
        { name: 'Direct Traffic', percentage: 15, visitors: '2,070', color: '#10b981' },
        { name: 'Referral & Partners', percentage: 10, visitors: '1,380', color: '#f59e0b' }
      ],
      funnelSteps: [
        { stage: 'Total Unique Visitors', count: '13,800', conversion: '100%', width: '100%' },
        { stage: 'Signed Up for Free Trial', count: '3,720', conversion: '27.0%', width: '78%' },
        { stage: 'Activated Core Features', count: '1,650', conversion: '12.0%', width: '48%' },
        { stage: 'Converted to Paid Enterprise', count: '540', conversion: '3.9%', width: '27%' }
      ]
    },
    '30days': {
      totalRevenue: '$124,590',
      revenueTrend: '+14.8%',
      revenuePositive: true,
      activeSubscribers: '8,420',
      subscribersTrend: '+8.2%',
      conversionRate: '3.74%',
      conversionTrend: '+1.1%',
      bounceRate: '41.2%',
      bounceTrend: '-2.4%',
      trafficSources: [
        { name: 'Organic Search', percentage: 42, visitors: '24,520', color: '#6366f1' },
        { name: 'Social Media (Reels/Carousels)', percentage: 28, visitors: '16,340', color: '#0ea5e9' },
        { name: 'Direct Traffic', percentage: 18, visitors: '10,500', color: '#10b981' },
        { name: 'Referral & Partners', percentage: 12, visitors: '7,010', color: '#f59e0b' }
      ],
      funnelSteps: [
        { stage: 'Total Unique Visitors', count: '58,370', conversion: '100%', width: '100%' },
        { stage: 'Signed Up for Free Trial', count: '14,590', conversion: '25.0%', width: '75%' },
        { stage: 'Activated Core Features', count: '6,420', conversion: '11.0%', width: '45%' },
        { stage: 'Converted to Paid Enterprise', count: '2,150', conversion: '3.7%', width: '25%' }
      ]
    },
    '90days': {
      totalRevenue: '$368,200',
      revenueTrend: '+22.5%',
      revenuePositive: true,
      activeSubscribers: '24,100',
      subscribersTrend: '+15.6%',
      conversionRate: '3.60%',
      conversionTrend: '+0.8%',
      bounceRate: '42.5%',
      bounceTrend: '-1.5%',
      trafficSources: [
        { name: 'Organic Search', percentage: 40, visitors: '71,200', color: '#6366f1' },
        { name: 'Social Media (Reels/Carousels)', percentage: 32, visitors: '56,960', color: '#0ea5e9' },
        { name: 'Direct Traffic', percentage: 16, visitors: '28,480', color: '#10b981' },
        { name: 'Referral & Partners', percentage: 12, visitors: '21,360', color: '#f59e0b' }
      ],
      funnelSteps: [
        { stage: 'Total Unique Visitors', count: '178,000', conversion: '100%', width: '100%' },
        { stage: 'Signed Up for Free Trial', count: '44,500', conversion: '25.0%', width: '75%' },
        { stage: 'Activated Core Features', count: '19,580', conversion: '11.0%', width: '45%' },
        { stage: 'Converted to Paid Enterprise', count: '6,408', conversion: '3.6%', width: '24%' }
      ]
    },
    'year': {
      totalRevenue: '$1,420,800',
      revenueTrend: '+45.2%',
      revenuePositive: true,
      activeSubscribers: '84,500',
      subscribersTrend: '+38.4%',
      conversionRate: '3.85%',
      conversionTrend: '+2.3%',
      bounceRate: '40.1%',
      bounceTrend: '-3.8%',
      trafficSources: [
        { name: 'Organic Search', percentage: 44, visitors: '316,800', color: '#6366f1' },
        { name: 'Social Media (Reels/Carousels)', percentage: 26, visitors: '187,200', color: '#0ea5e9' },
        { name: 'Direct Traffic', percentage: 18, visitors: '129,600', color: '#10b981' },
        { name: 'Referral & Partners', percentage: 12, visitors: '86,400', color: '#f59e0b' }
      ],
      funnelSteps: [
        { stage: 'Total Unique Visitors', count: '720,000', conversion: '100%', width: '100%' },
        { stage: 'Signed Up for Free Trial', count: '194,400', conversion: '27.0%', width: '78%' },
        { stage: 'Activated Core Features', count: '86,400', conversion: '12.0%', width: '48%' },
        { stage: 'Converted to Paid Enterprise', count: '27,720', conversion: '3.85%', width: '26%' }
      ]
    }
  };

  // Active view model bound to template
  currentData: AnalyticsData = this.metricsDatasets['30days'];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dateRange: ['30days'],
      autoRenew: [true] // Controls light/dark mode preview toggle matching your billing screen
    });

    // Listen to changes on the date-range dropdown filter
    this.filterForm.get('dateRange')?.valueChanges.subscribe((selectedRange: string) => {
      if (this.metricsDatasets[selectedRange]) {
        this.currentData = this.metricsDatasets[selectedRange];
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  onExportReport(): void {
    this.successMessage = 'ApexUI Studio Analytics report exported successfully as CSV/PDF!';
    setTimeout(() => {
      this.successMessage = null;
    }, 4000);
  }
}