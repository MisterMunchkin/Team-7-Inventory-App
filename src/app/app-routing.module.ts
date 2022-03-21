import { MixComponent } from './mix/mix.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(s => s.SignInModule)},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'mix', component: MixComponent, canActivate: [AuthGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
