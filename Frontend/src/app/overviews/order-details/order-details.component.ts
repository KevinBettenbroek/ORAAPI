import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';
import { ControleService } from '../../services/controle.service';
import { from } from 'rxjs';

import { Order } from '../../models/orderModels';
import { Batch } from '../../models/batchModels';
import { Check } from '../../models/controleModels';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  batches: Batch[] = [];
  checks: Check[] = [];
  order: Order;
  order_NR: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rollService: RollService,
    private batchService: BatchService,
    private orderService: OrderService,
    private controleService: ControleService
  ) {
    this.order = this.orderService.order;
    this.order_NR = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.order_NR = params.get('order_NR')!;
    });
    if (this.order.order_NR != this.order_NR) {
      this.orderService.getOrder(this.order_NR).subscribe((data) => {
        this.order = data;
      });
    }
    this.batchService.getBatches(this.order_NR).subscribe((data) => {
      this.batches = data;
    });
    this.controleService
      .getChecks('?order_NR=' + this.order_NR)
      .subscribe((data) => {
        this.checks = data;
      });
  }

  setBatch(batch: Batch) {
    this.batchService.setBatch(batch);
  }

  back(): void {
    this.location.back();
  }
}
