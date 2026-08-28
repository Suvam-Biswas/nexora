import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-component',
  templateUrl: './add-user-component.component.html',
  styleUrls: ['./add-user-component.component.scss']
})
export class AddUserComponentComponent implements OnInit {

  userForm!: FormGroup;
  isSubmitted: boolean = false;
  isEditMode: boolean = false;

  rolesList: string[] = ['Admin', 'Editor', 'Member', 'Billing'];
  statusesList: string[] = ['Active', 'Pending', 'Suspended'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!(this.data && this.data.user);

    this.userForm = this.fb.group({
      fullName: [this.isEditMode ? this.data.user.name : '', [Validators.required, Validators.minLength(2)]],
      email: [this.isEditMode ? this.data.user.email : '', [Validators.required, Validators.email]],
      role: [this.isEditMode ? this.data.user.role : 'Member', [Validators.required]],
      status: [this.isEditMode ? this.data.user.status : 'Active', [Validators.required]],
      sendInviteEmail: [!this.isEditMode]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.dialogRef.close(this.userForm.value);
  }
}