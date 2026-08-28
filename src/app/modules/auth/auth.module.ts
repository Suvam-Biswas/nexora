import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { AuthRouterModule } from './auth-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { LoadingWaitModule } from '../loading-wait/loading-wait.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WebcamModule } from 'ngx-webcam';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { UsersComponentComponent } from './users-component/users-component.component';
import { AddUserComponentComponent } from './users-component/add-user-component/add-user-component.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BillingSubscriptionComponent } from './billing-subscription/billing-subscription.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PricingComponent } from './pricing/pricing.component';

@NgModule({
  declarations: [
    LoginSignUpComponent,
    DashboardComponentComponent,
    UsersComponentComponent,
    AddUserComponentComponent,
    AccountSettingsComponent,
    NotFoundComponent,
    BillingSubscriptionComponent,
    AnalyticsComponent,
    PricingComponent,

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    AuthRouterModule,
    MatIconModule,
    LoadingWaitModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    WebcamModule,
    MatCheckboxModule,
    MatSelectModule,
    LoadingWaitModule,
    MatDividerModule,
    MatSnackBarModule

  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
