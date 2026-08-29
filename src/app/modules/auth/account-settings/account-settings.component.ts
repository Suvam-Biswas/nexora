import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Location } from '@angular/common';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput')
  fileInputRef!: ElementRef<HTMLInputElement>;


  profileForm!: FormGroup;

  passwordForm!: FormGroup;

  preferencesForm!: FormGroup;


  profileSubmitted = false;

  passwordSubmitted = false;


  successMessage: string | null = null;

  passwordMessage: string | null = null;


  avatarUrl: string | ArrayBuffer | null = null;


  /*
   * Theme state is controlled by the navbar.
   */
  isLightMode = false;


  private themeObserver?: MutationObserver;

  private themeInterval?: ReturnType<typeof setInterval>;


  constructor(
    private fb: FormBuilder,
    private location: Location
  ) {}


  ngOnInit(): void {

    this.createForms();

    this.setupThemeSync();

  }


  ngOnDestroy(): void {

    if (this.themeObserver) {
      this.themeObserver.disconnect();
    }

    if (this.themeInterval) {
      clearInterval(this.themeInterval);
    }

  }


  private createForms(): void {

    /*
     * Profile
     */
    this.profileForm = this.fb.group({

      firstName: [
        'Suvam',
        [Validators.required]
      ],

      lastName: [
        'Biswas',
        [Validators.required]
      ],

      email: [
        'suvam.biswas@enterprise.com',
        [
          Validators.required,
          Validators.email
        ]
      ],

      bio: [
        'System Administrator and Enterprise Application Developer.',
        [
          Validators.maxLength(250)
        ]
      ]

    });


    /*
     * Password
     */
    this.passwordForm = this.fb.group({

      currentPassword: [
        '',
        [Validators.required]
      ],

      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      confirmPassword: [
        '',
        [Validators.required]
      ]

    }, {
      validators: this.passwordMatchValidator
    });


    /*
     * Preferences
     *
     * Theme selection is intentionally not included here.
     * The navbar controls the application theme.
     */
    this.preferencesForm = this.fb.group({

      emailNotifications: [
        true
      ],

      marketingUpdates: [
        false
      ],

      twoFactorAuth: [
        true
      ]

    });

  }


  /*
   * Profile controls.
   */
  get f() {
    return this.profileForm.controls;
  }


  /*
   * Password controls.
   */
  get p() {
    return this.passwordForm.controls;
  }


  /*
   * Password confirmation validator.
   */
  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {

    const newPass =
      control.get('newPassword');

    const confirmPass =
      control.get('confirmPassword');


    if (
      newPass &&
      confirmPass &&
      newPass.value !== confirmPass.value
    ) {

      return {
        passwordMismatch: true
      };

    }


    return null;

  }


  /*
   * Theme synchronization.
   */
  private setupThemeSync(): void {

    this.updateThemeState();


    /*
     * Watches body and html class changes.
     */
    if (typeof MutationObserver !== 'undefined') {

      this.themeObserver =
        new MutationObserver(() => {

          this.updateThemeState();

        });


      this.themeObserver.observe(
        document.documentElement,
        {
          attributes: true,
          attributeFilter: ['class']
        }
      );


      this.themeObserver.observe(
        document.body,
        {
          attributes: true,
          attributeFilter: ['class']
        }
      );

    }


    /*
     * Keeps the page synchronized with
     * theme classes used by different layouts.
     */
    this.themeInterval = setInterval(() => {

      this.updateThemeState();

    }, 250);

  }


  /*
   * Detects the theme currently selected
   * by the navbar or application shell.
   */
  private updateThemeState(): void {

    if (typeof document === 'undefined') {
      return;
    }


    const html =
      document.documentElement;

    const body =
      document.body;


    const lightTheme =
      html.classList.contains('light-mode') ||
      html.classList.contains('light-theme') ||
      html.classList.contains('theme-light') ||

      body.classList.contains('light-mode') ||
      body.classList.contains('light-theme') ||
      body.classList.contains('theme-light');


    const darkTheme =
      html.classList.contains('dark-mode') ||
      html.classList.contains('dark-theme') ||
      html.classList.contains('theme-dark') ||

      body.classList.contains('dark-mode') ||
      body.classList.contains('dark-theme') ||
      body.classList.contains('theme-dark');


    if (lightTheme) {

      this.isLightMode = true;

      return;

    }


    if (darkTheme) {

      this.isLightMode = false;

      return;

    }


    /*
     * Falls back to the browser preference
     * when no application theme class exists.
     */
    if (
      typeof window !== 'undefined' &&
      window.matchMedia
    ) {

      this.isLightMode =
        window.matchMedia(
          '(prefers-color-scheme: light)'
        ).matches;

    }

  }


  /*
   * Navigate back.
   */
  goBack(): void {

    this.location.back();

  }


  /*
   * Opens the avatar file selector.
   */
  triggerFileInput(): void {

    if (
      this.fileInputRef &&
      this.fileInputRef.nativeElement
    ) {

      this.fileInputRef.nativeElement.click();

    }

  }


  /*
   * Reads the selected avatar.
   */
  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const file =
      input.files[0];


    if (!file.type.startsWith('image/')) {

      return;

    }


    const reader =
      new FileReader();


    reader.onload = () => {

      this.avatarUrl =
        reader.result;

    };


    reader.readAsDataURL(file);

  }


  /*
   * Saves profile information.
   */
  onSaveProfile(): void {

    this.profileSubmitted = true;


    if (this.profileForm.invalid) {

      return;

    }


    this.successMessage =
      'Profile information updated successfully!';


    setTimeout(() => {

      this.successMessage = null;

    }, 4000);

  }


  /*
   * Changes the password.
   */
  onChangePassword(): void {

    this.passwordSubmitted = true;


    if (this.passwordForm.invalid) {

      return;

    }


    this.passwordMessage =
      'Security credentials modified successfully!';


    this.passwordForm.reset();

    this.passwordSubmitted = false;


    setTimeout(() => {

      this.passwordMessage = null;

    }, 4000);

  }


  /*
   * Saves preference changes.
   */
  onSavePreferences(): void {

    console.log(
      'Preferences updated:',
      this.preferencesForm.value
    );

  }

}