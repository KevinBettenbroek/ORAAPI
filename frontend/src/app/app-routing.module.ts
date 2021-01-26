import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { OrderOverviewComponent } from './overviews/order-overview/order-overview.component';
import { OrderDetailsComponent } from './overviews/order-details/order-details.component';
import { BatchDetailsComponent } from './overviews/batch-details/batch-details.component';
import { RollDetailsComponent } from './overviews/roll-details/roll-details.component';
import { ControleLoggenComponent } from './controles/controle-loggen/controle-loggen.component';
import { HomeComponent } from './home/home.component';
import { VrijgifteComponent } from './controles/vrijgifte/vrijgifte.component';
import { BagDetailsComponent } from './overviews/bag-details/bag-details.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'orderOverview/:history',
    component: OrderOverviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orderDetails/:order_NR',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'batchDetails/:batch_NR',
    component: BatchDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rollDetails/:roll_NR',
    component: RollDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bagDetails/:bag_NR',
    component: BagDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'controleLoggen',
    component: ControleLoggenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vrijgifte',
    component: VrijgifteComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
