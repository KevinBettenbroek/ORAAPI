import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/orderModels';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.css'],
})
export class OrderOverviewComponent implements AfterViewInit, OnInit {
  orders: Order[] = [];
  history: string = 'False';
  displayedColumns: string[] = ['order'];

  dataSource = new MatTableDataSource<Order>(this.orders);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rollService: RollService,
    private batchService: BatchService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.history = params.get('history')!;
    });
    this.orderService
      .getOrders('?order_released=' + this.history)
      .subscribe((data) => {
        this.orders = data;
        this.dataSource.data = data;
      });
  }

  setOrder(order: Order) {
    this.orderService.setOrder(order);
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  back(): void {
    this.location.back();
  }
}
