import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/orderModels';

@Component({
  selector: 'app-vrijgifte',
  templateUrl: './vrijgifte.component.html',
  styleUrls: ['./vrijgifte.component.css'],
})
export class VrijgifteComponent implements OnInit {
  title = 'Vrijgifte';
  orders: any;
  selectedOptions: Order[] = [];

  constructor(private location: Location, private orderService: OrderService) {
    this.orderService.getOrders('?order_released=False').subscribe((data) => {
      this.orders = data;
    });
  }

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  vrijgeven() {
    this.selectedOptions.forEach((order) => {
      this.orderService.vrijgifte(order).subscribe();
    });
  }
}
