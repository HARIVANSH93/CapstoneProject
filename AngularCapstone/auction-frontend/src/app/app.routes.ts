import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UserDashboardComponent } from './components/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { UserCategoryComponent } from './components/user-category/user-category.component';
import { UserBidComponent } from './components/user-bid/user-bid.component';
import { UserCategoryListComponent } from './components/user-category-list/user-category-list.component';
import { UserAuctionListComponent } from './components/user-auction-list/user-auction-list.component';
import { UserNotificationComponent } from './components/user-notification/user-notification.component';
import { UserTransactionComponent } from './components/user-transaction/user-transaction.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageAuctionsComponent } from './components/manage-auctions/manage-auctions.component';

import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';
import { ManageTransactionsComponent } from './components/manage-transactions/manage-transactions.component';
import { ManageNotificationsComponent } from './components/manage-notifications/manage-notifications.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'user/login', component: LoginUserComponent },
  { path: 'user/register', component: RegisterUserComponent },
  { path: 'admin/login', component: LoginAdminComponent },

  {
    path: 'user/dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
{
  path: 'user/categories',
  component: UserCategoryComponent
},

{
  path: 'user/bids',
  component: UserBidComponent
},
{ path: 'user/categories', component: UserCategoryListComponent, canActivate: [authGuard] },
{ path: 'user/auctions', component: UserAuctionListComponent, canActivate: [authGuard] },
{ path: 'user/notifications', component: UserNotificationComponent },
{ path: 'user/transactions', component: UserTransactionComponent },
{
  path: 'admin',
  component: AdminDashboardComponent, // this is now the layout
  canActivate: [adminGuard],
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'manage-users', component: ManageUsersComponent },
    { path: 'manage-auctions', component: ManageAuctionsComponent },
    { path: 'manage-bids', component: ManageBidsComponent },
    { path: 'manage-transactions', component: ManageTransactionsComponent },
    { path: 'manage-notifications', component: ManageNotificationsComponent }
  ]
},
  { path: '**', redirectTo: '' }
];
