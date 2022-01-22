import { MixComponent } from './mix/mix.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'inventory', component: InventoryComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'mix', component: MixComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
