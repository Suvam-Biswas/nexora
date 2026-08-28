import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-billing-subscription',
  templateUrl: './billing-subscription.component.html',
  styleUrls: ['./billing-subscription.component.scss']
})
export class BillingSubscriptionComponent implements OnInit {

  billingForm!: FormGroup;
  paymentForm!: FormGroup;

  paymentSubmitted = false;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // 1. General Billing Preferences / State Form
    this.billingForm = this.fb.group({
      autoRenew: [true]
    });

    // 2. Add New Payment Method Form Setup with Length Validations
    this.paymentForm = this.fb.group({
      cardholderName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(15)]],
      cvv: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Convenience getter for payment template validation
  get cp() { return this.paymentForm.controls; }

  // Navigation back handler using native history
  goBack(): void {
    window.history.back();
  }

  onOpenChangePlanModal(): void {
    console.log('Opening change plan modal workflow...');
  }

  onRemoveCard(): void {
    console.log('Payment card removed action triggered.');
    this.successMessage = 'Payment method removed successfully.';
    setTimeout(() => { this.successMessage = null; }, 4000);
  }

  onSavePaymentMethod(): void {
    this.paymentSubmitted = true;
    if (this.paymentForm.invalid) return;

    this.successMessage = 'New payment card added successfully!';
    this.paymentForm.reset();
    this.paymentSubmitted = false;
    setTimeout(() => { this.successMessage = null; }, 4000);
  }

  onPayNow(): void {
    this.successMessage = 'Early balance payment processed successfully!';
    setTimeout(() => { this.successMessage = null; }, 4000);
  }



/**
    * Premium, professional, and stylish PDF Invoice Generator
    */
  downloadInvoice(invoiceId: string): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. Premium Header Banner Background (Dark Slate / Indigo feel)
    doc.setFillColor(30, 41, 59); // Dark slate background
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Brand / Title inside Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('ApexUI Studio', 14, 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Created by Suvam Biswas', 14, 31);

    // Invoice Meta (Right aligned in Header)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('INVOICE', pageWidth - 14, 22, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${invoiceId}`, pageWidth - 14, 30, { align: 'right' });

    // 2. Billing Metadata Section (Billed To & Dates)
    doc.setTextColor(100, 116, 139); // Muted gray
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('BILLED TO:', 14, 60);
    doc.text('INVOICE DETAILS:', 120, 60);

    doc.setTextColor(15, 23, 42); // Dark text
    doc.setFont('helvetica', 'normal');
    doc.text('Suvam Biswas', 14, 66);
    doc.text('ApexUI Studio Client Account', 14, 72);
    doc.text('support@apexui.studio', 14, 78);

    doc.text(`Issue Date: August 27, 2026`, 120, 66);
    doc.text(`Due Date: August 27, 2026`, 120, 72);
    doc.text(`Payment Method: Visa •••• 4242`, 120, 78);

  // Status Badge background box
    doc.setFillColor(220, 252, 231); // Light green background
    doc.setDrawColor(34, 197, 94);   // Green border
    doc.roundedRect(120, 84, 76, 8, 2, 2, 'FD');
    doc.setTextColor(22, 101, 52);   // Dark green text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    // Changed y from 90 to 88.5 to push the text slightly higher inside the box
    doc.text('STATUS: PAID SUCCESSFULLY', 158, 89, { align: 'center' });


    // 3. Table Header Background
    doc.setFillColor(241, 245, 249); // Light gray slate
    doc.rect(14, 105, pageWidth - 28, 10, 'F');

    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('DESCRIPTION', 20, 112);
    doc.text('QTY', 120, 112);
    doc.text('AMOUNT', pageWidth - 20, 112, { align: 'right' });

    // 4. Table Item Row
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.text('Enterprise Developer Pro (Monthly Subscription)', 20, 125);
    doc.text('1', 120, 125);
    doc.text('$49.00', pageWidth - 20, 125, { align: 'right' });

    // Divider Line under item
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 133, pageWidth - 14, 133);

    // 5. Summary / Totals block (Right aligned)
    const summaryX = 120;
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal:', summaryX, 145);
    doc.text('$49.00', pageWidth - 20, 145, { align: 'right' });

    doc.text('Estimated Tax (0%):', summaryX, 153);
    doc.text('$0.00', pageWidth - 20, 153, { align: 'right' });

    // Bold Total Line
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text('Total Due:', summaryX, 163);
    doc.text('$49.00', pageWidth - 20, 163, { align: 'right' });

    // Thick accent bar above footer
    doc.setDrawColor(99, 102, 241); // Indigo accent
    doc.setLineWidth(1);
    doc.line(14, 175, pageWidth - 14, 175);

    // 6. Professional Footer
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Thank you for your business! This is a computer-generated invoice from ApexUI Studio.', pageWidth / 2, 183, { align: 'center' });
    doc.text('For any questions, reach out to support@apexui.studio', pageWidth / 2, 188, { align: 'center' });

    // Trigger browser file download
    doc.save(`${invoiceId}.pdf`);
  }

}