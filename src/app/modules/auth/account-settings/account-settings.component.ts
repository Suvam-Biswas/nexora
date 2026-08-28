import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  preferencesForm!: FormGroup;

  profileSubmitted = false;
  passwordSubmitted = false;

  successMessage: string | null = null;
  passwordMessage: string | null = null;

  // Avatar properties
  avatarUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    // 1. Profile Form Setup
    this.profileForm = this.fb.group({
      firstName: ['Suvam', [Validators.required]],
      lastName: ['Biswas', [Validators.required]],
      email: ['suvam.biswas@enterprise.com', [Validators.required, Validators.email]],
      bio: ['System Administrator and Enterprise Application Developer.', [Validators.maxLength(250)]]
    });

    // 2. Password Form Setup with Custom Match Validator
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // 3. Preferences Form Setup
    this.preferencesForm = this.fb.group({
      emailNotifications: [true],
      darkMode: [true], // Default to dark mode theme
      marketingUpdates: [false],
      twoFactorAuth: [true]
    });
  }

  // Convenience getters for easy template validation access
  get f() { return this.profileForm.controls; }
  get p() { return this.passwordForm.controls; }

  // Custom Validator for Password Confirmation Match
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPass = control.get('newPassword');
    const confirmPass = control.get('confirmPassword');
    if (newPass && confirmPass && newPass.value !== confirmPass.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Navigation back handler
  goBack(): void {
    this.location.back();
  }

  // Safe programmatic trigger for hidden file input using ViewChild
  triggerFileInput(): void {
    if (this.fileInputRef && this.fileInputRef.nativeElement) {
      this.fileInputRef.nativeElement.click();
    }
  }

  // Read selected image file and generate data URL preview
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveProfile(): void {
    this.profileSubmitted = true;
    if (this.profileForm.invalid) return;

    // Simulate backend call success
    this.successMessage = 'Profile information updated successfully!';
    setTimeout(() => { this.successMessage = null; }, 4000);
  }

  onChangePassword(): void {
    this.passwordSubmitted = true;
    if (this.passwordForm.invalid) return;

    // Simulate backend call success
    this.passwordMessage = 'Security credentials modified successfully!';
    this.passwordForm.reset();
    this.passwordSubmitted = false;
    setTimeout(() => { this.passwordMessage = null; }, 4000);
  }

  onSavePreferences(): void {
    // Auto-saves on toggle change or can be mapped to API call
    console.log('Preferences updated:', this.preferencesForm.value);
  }
}