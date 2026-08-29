import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-component',
  templateUrl: './add-user-component.component.html',
  styleUrls: ['./add-user-component.component.scss']
})
export class AddUserComponentComponent implements OnInit {

  userForm!: FormGroup;

  isSubmitted = false;

  isEditMode = false;

  rolesList: string[] = [
    'Admin',
    'Editor',
    'Member',
    'Billing'
  ];

  statusesList: string[] = [
    'Active',
    'Pending',
    'Suspended'
  ];


  constructor(
    private fb: FormBuilder,

    public dialogRef:
      MatDialogRef<AddUserComponentComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }


  ngOnInit(): void {

    this.isEditMode =
      !!(this.data && this.data.user);

    const user = this.isEditMode
      ? this.data.user
      : null;

    this.userForm = this.fb.group({

      fullName: [
        user?.name || '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        user?.email || '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      role: [
        user?.role || 'Member',
        Validators.required
      ],

      status: [
        user?.status || 'Active',
        Validators.required
      ],

      sendInviteEmail: [
        !this.isEditMode
      ]

    });


    this.userForm.valueChanges.subscribe(() => {

      if (this.isSubmitted) {

        this.isSubmitted = false;

      }

    });

  }


  get f() {
    return this.userForm.controls;
  }


  onSubmit(): void {

    this.isSubmitted = true;

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    const formValue = {
      ...this.userForm.value
    };

    this.dialogRef.close(formValue);

  }

}