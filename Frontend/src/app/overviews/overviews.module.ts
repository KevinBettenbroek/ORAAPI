import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { RollDetailsComponent } from './roll-details/roll-details.component';
import { BagDetailsComponent } from './bag-details/bag-details.component';

@NgModule({
  declarations: [
    OrderDetailsComponent,
    OrderOverviewComponent,
    BatchDetailsComponent,
    RollDetailsComponent,
    BagDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
})
export class OverviewsModule {}
