import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginSignUpComponent } from "./login-sign-up/login-sign-up.component";
import { DashboardComponentComponent } from "./dashboard-component/dashboard-component.component";
import { UsersComponentComponent } from "./users-component/users-component.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BillingSubscriptionComponent } from "./billing-subscription/billing-subscription.component";
import { AnalyticsComponent } from "./analytics/analytics.component";
import { PricingComponent } from "./pricing/pricing.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { AuditLogsComponent } from "./audit-logs/audit-logs.component";

const authModuleRoutes: Routes = [



    {
        path: 'login',
        component: LoginSignUpComponent
    },

    { path: 'dashboard', component: DashboardComponentComponent },

    { path: 'users', component: UsersComponentComponent },

    { path: 'account-settings', component: AccountSettingsComponent },

    { path: 'not-found', component: NotFoundComponent },

    { path: 'billing-subscription', component: BillingSubscriptionComponent },

    { path: 'analytics', component: AnalyticsComponent },

    { path: 'pricing', component: PricingComponent },

    { path: 'notification', component: NotificationsComponent },

    { path: 'audit-logs', component: AuditLogsComponent },


  { path: '', redirectTo: 'auth/dashboard', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forChild(authModuleRoutes)],
    exports: [RouterModule]
})
export class AuthRouterModule { }