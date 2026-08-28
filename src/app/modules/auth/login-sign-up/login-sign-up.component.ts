import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Import the Router

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.scss']
})
export class LoginSignUpComponent implements OnInit {
  authForm!: FormGroup;
  isLogin = true;
  isForgotPassword = false;
  showPassword = false;

  // 2. Inject Router into the constructor
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = this.fb.group({
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      rememberMe: [false]
    });
    this.updateValidators();
  }

  toggleView() {
    this.isLogin = !this.isLogin;
    this.isForgotPassword = false;
    this.showPassword = false;
    this.authForm.reset({ rememberMe: false });
    this.updateValidators();
  }

  toggleForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
    this.authForm.reset({ rememberMe: false });
    this.updateValidators();
  }

  updateValidators() {
    const fullNameControl = this.authForm.get('fullName');
    const phoneControl = this.authForm.get('phone');
    const passwordControl = this.authForm.get('password');
    const confirmPasswordControl = this.authForm.get('confirmPassword');

    if (this.isForgotPassword) {
      fullNameControl?.clearValidators();
      phoneControl?.clearValidators();
      passwordControl?.clearValidators();
      confirmPasswordControl?.clearValidators();
    } else if (!this.isLogin) {
      fullNameControl?.setValidators([Validators.required, Validators.minLength(2)]);
      phoneControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
      confirmPasswordControl?.setValidators([Validators.required]);
    } else {
      fullNameControl?.clearValidators();
      phoneControl?.clearValidators();
      passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
      confirmPasswordControl?.clearValidators();
    }

    fullNameControl?.updateValueAndValidity();
    phoneControl?.updateValueAndValidity();
    passwordControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    if (this.isForgotPassword) {
      console.log('Password Reset Requested for Email:', this.authForm.value.email);
      // Handle password reset API call here
      return;
    }

    // Form is valid! Handle login or registration success
    console.log('Form Submitted Successfully:', this.authForm.value);

    if (this.authForm.value.rememberMe) {
      console.log('Remember Me enabled: Save token/session preferences.');
    }

    // Inside your component or service when navigating:
    this.router.navigate(['/auth/dashboard']);
  }
}