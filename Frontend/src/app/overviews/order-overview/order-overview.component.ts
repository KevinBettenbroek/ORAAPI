import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/orderModels';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.css'],
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];
  history: string = 'False';

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rollService: RollService,
    private batchService: BatchService,
    private orderService: OrderService
  ) {}

  setOrder(order: Order) {
    this.orderService.setOrder(order);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.history = params.get('history')!;
    });
    this.orderService
      .getOrders('?order_released=' + this.history)
      .subscribe((data) => {
        this.orders = data;
      });
  }

  back(): void {
    this.location.back();
  }
}
