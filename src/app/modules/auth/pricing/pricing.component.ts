import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  pricingForm!: FormGroup;
  isYearly: boolean = false;
  successMessage: string | null = null;

  // Pricing Tiers Data Structure
  pricingPlans = [
    {
      name: 'Starter Tier',
      description: 'Ideal for individual developers and small personal side-projects.',
      monthlyPrice: 19,
      yearlyPrice: 15,
      badge: null,
      isCurrent: false,
      features: [
        { text: 'Up to 3 Active Projects', included: true },
        { text: 'Standard Analytics Dashboard', included: true },
        { text: 'Community Support Forum', included: true },
        { text: 'Custom Domain Integration', included: false },
        { text: 'Advanced API Webhooks', included: false },
        { text: 'Dedicated Account Manager', included: false }
      ],
      ctaText: 'Get Started Free',
      ctaClass: 'btn-outline-custom'
    },
    {
      name: 'Professional Pro',
      description: 'Built for growing teams and professional software creators.',
      monthlyPrice: 49,
      yearlyPrice: 39,
      badge: 'Most Popular',
      isCurrent: true,
      features: [
        { text: 'Unlimited Active Projects', included: true },
        { text: 'Deep-Dive Analytics & Reports', included: true },
        { text: 'Priority Email & Chat Support', included: true },
        { text: 'Custom Domain Integration', included: true },
        { text: 'Advanced API Webhooks', included: true },
        { text: 'Dedicated Account Manager', included: false }
      ],
      ctaText: 'Current Plan',
      ctaClass: 'btn-primary-custom active-tier'
    },
    {
      name: 'Enterprise Scale',
      description: 'Maximum performance, ultimate security, and full custom scalability.',
      monthlyPrice: 199,
      yearlyPrice: 159,
      badge: 'Best Value',
      isCurrent: false,
      features: [
        { text: 'Unlimited Active Projects', included: true },
        { text: 'Deep-Dive Analytics & Reports', included: true },
        { text: '24/7 Priority Support & SLA', included: true },
        { text: 'Custom Domain Integration', included: true },
        { text: 'Advanced API Webhooks', included: true },
        { text: 'Dedicated Account Manager', included: true }
      ],
      ctaText: 'Upgrade to Enterprise',
      ctaClass: 'btn-outline-custom'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.pricingForm = this.fb.group({
      billingCycle: [false], // false = Monthly, true = Yearly
      autoRenew: [true]      // Controls the Light/Dark mode preview toggle matching other pages
    });

    // Listen to billing toggle changes
    this.pricingForm.get('billingCycle')?.valueChanges.subscribe((yearly: boolean) => {
      this.isYearly = yearly;
    });
  }

  goBack(): void {
    window.history.back();
  }

  onSelectPlan(planName: string): void {
    this.successMessage = `Successfully selected the ${planName} plan! Redirecting to secure checkout...`;
    setTimeout(() => {
      this.successMessage = null;
    }, 4000);
  }
}