import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { jsPDF } from 'jspdf';
import { DarkModeService } from 'angular-dark-mode';


@Component({
  selector: 'app-billing-subscription',
  templateUrl: './billing-subscription.component.html',
  styleUrls: ['./billing-subscription.component.scss']
})
export class BillingSubscriptionComponent implements OnInit, OnDestroy {

  billingForm!: FormGroup;

  paymentForm!: FormGroup;

  paymentSubmitted = false;

  successMessage: string | null = null;

  darkMode$ = this.darkModeService.darkMode$;

  private themeSubscription?: Subscription;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private darkModeService: DarkModeService,
    private renderer: Renderer2
  ) { }


  ngOnInit(): void {

    this.billingForm = this.fb.group({
      autoRenew: [true]
    });


    this.paymentForm = this.fb.group({

      cardholderName: [
        '',
        [Validators.required]
      ],

      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(15)
        ]
      ],

      cvv: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ]

    });


    this.watchTheme();

  }


  get cp() {
    return this.paymentForm.controls;
  }


  private watchTheme(): void {

    this.themeSubscription =
      this.darkModeService.darkMode$
        .subscribe((isDarkMode: boolean) => {

          const body = document.body;

          if (isDarkMode) {

            this.renderer.removeClass(
              body,
              'billing-light-theme'
            );

          } else {

            this.renderer.addClass(
              body,
              'billing-light-theme'
            );

          }

        });

  }


  goBack(): void {
    window.history.back();
  }


  onOpenChangePlanModal(): void {

    console.log(
      'Opening change plan modal workflow...'
    );

  }


  onRemoveCard(): void {

    console.log(
      'Payment card removed action triggered.'
    );


    this.successMessage =
      'Payment method removed successfully.';


    this.clearSuccessMessage();

  }


  onSavePaymentMethod(): void {

    this.paymentSubmitted = true;


    if (this.paymentForm.invalid) {
      return;
    }


    this.successMessage =
      'New payment card added successfully!';


    this.paymentForm.reset();

    this.paymentSubmitted = false;


    this.clearSuccessMessage();

  }


  onPayNow(): void {

    this.successMessage =
      'Early balance payment processed successfully.';


    this.clearSuccessMessage();

  }


  private clearSuccessMessage(): void {

    setTimeout(() => {

      this.successMessage = null;

    }, 4000);

  }


 downloadInvoice(invoiceId: string): void {

  const doc = new jsPDF();

  const pageWidth =
    doc.internal.pageSize.getWidth();


  // ============================================================
  // HEADER
  // ============================================================

  doc.setFillColor(
    30,
    41,
    59
  );

  doc.rect(
    0,
    0,
    pageWidth,
    45,
    'F'
  );


  // Brand

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(22);

  doc.text(
    'Nexora',
    14,
    24
  );


  // Developer credit

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);

  doc.text(
    'Developed by Suvam Biswas',
    14,
    31
  );


  // Invoice title

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(16);

  doc.text(
    'INVOICE',
    pageWidth - 14,
    22,
    {
      align: 'right'
    }
  );


  // Invoice ID

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);

  doc.text(
    invoiceId,
    pageWidth - 14,
    30,
    {
      align: 'right'
    }
  );


  // ============================================================
  // BILLING INFORMATION
  // ============================================================

  doc.setTextColor(
    100,
    116,
    139
  );

  doc.setFontSize(9);

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.text(
    'BILLED TO:',
    14,
    60
  );

  doc.text(
    'INVOICE DETAILS:',
    120,
    60
  );


  // Customer information

  doc.setTextColor(
    15,
    23,
    42
  );

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);

  doc.text(
    'Suvam Biswas',
    14,
    66
  );

  doc.text(
    'Nexora Client Account',
    14,
    72
  );

  doc.text(
    'support@nexora.com',
    14,
    78
  );


  // Invoice information

  doc.text(
    'Issue Date: August 27, 2026',
    120,
    66
  );

  doc.text(
    'Due Date: August 27, 2026',
    120,
    72
  );

  doc.text(
    'Payment Method: Visa •••• 4242',
    120,
    78
  );


  // ============================================================
  // PAYMENT STATUS
  // ============================================================

  doc.setFillColor(
    220,
    252,
    231
  );

  doc.setDrawColor(
    34,
    197,
    94
  );

  doc.roundedRect(
    120,
    84,
    76,
    8,
    2,
    2,
    'FD'
  );


  doc.setTextColor(
    22,
    101,
    52
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(9);

  doc.text(
    'STATUS: PAID SUCCESSFULLY',
    158,
    89,
    {
      align: 'center'
    }
  );


  // ============================================================
  // TABLE HEADER
  // ============================================================

  doc.setFillColor(
    241,
    245,
    249
  );

  doc.rect(
    14,
    105,
    pageWidth - 28,
    10,
    'F'
  );


  doc.setTextColor(
    71,
    85,
    105
  );

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(10);


  doc.text(
    'DESCRIPTION',
    20,
    112
  );

  doc.text(
    'QTY',
    120,
    112
  );

  doc.text(
    'AMOUNT',
    pageWidth - 20,
    112,
    {
      align: 'right'
    }
  );


  // ============================================================
  // INVOICE ITEM
  // ============================================================

  doc.setTextColor(
    15,
    23,
    42
  );

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);


  doc.text(
    'Nexora Enterprise Developer Pro (Monthly Subscription)',
    20,
    125
  );

  doc.text(
    '1',
    120,
    125
  );

  doc.text(
    '$49.00',
    pageWidth - 20,
    125,
    {
      align: 'right'
    }
  );


  // Item separator

  doc.setDrawColor(
    226,
    232,
    240
  );

  doc.line(
    14,
    133,
    pageWidth - 14,
    133
  );


  // ============================================================
  // TOTALS
  // ============================================================

  const summaryX = 120;


  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(10);

  doc.setTextColor(
    71,
    85,
    105
  );


  // Subtotal

  doc.text(
    'Subtotal:',
    summaryX,
    145
  );

  doc.text(
    '$49.00',
    pageWidth - 20,
    145,
    {
      align: 'right'
    }
  );


  // Tax

  doc.text(
    'Estimated Tax (0%):',
    summaryX,
    153
  );

  doc.text(
    '$0.00',
    pageWidth - 20,
    153,
    {
      align: 'right'
    }
  );


  // Total

  doc.setFont(
    'helvetica',
    'bold'
  );

  doc.setFontSize(12);

  doc.setTextColor(
    30,
    41,
    59
  );


  doc.text(
    'Total Due:',
    summaryX,
    163
  );

  doc.text(
    '$49.00',
    pageWidth - 20,
    163,
    {
      align: 'right'
    }
  );


  // ============================================================
  // FOOTER ACCENT LINE
  // ============================================================

  doc.setDrawColor(
    99,
    102,
    241
  );

  doc.setLineWidth(1);

  doc.line(
    14,
    175,
    pageWidth - 14,
    175
  );


  // ============================================================
  // FOOTER
  // ============================================================

  doc.setTextColor(
    148,
    163,
    184
  );

  doc.setFont(
    'helvetica',
    'normal'
  );

  doc.setFontSize(8);


  doc.text(
    'Thank you for your business! This is a computer-generated invoice from Nexora.',
    pageWidth / 2,
    183,
    {
      align: 'center'
    }
  );


  doc.text(
    'For any questions, please reach out to support@nexora.com',
    pageWidth / 2,
    188,
    {
      align: 'center'
    }
  );


  // ============================================================
  // SAVE PDF
  // ============================================================

  doc.save(
    `${invoiceId}.pdf`
  );

}

  ngOnDestroy(): void {

    this.themeSubscription?.unsubscribe();

    this.renderer.removeClass(
      document.body,
      'billing-light-theme'
    );

  }

}