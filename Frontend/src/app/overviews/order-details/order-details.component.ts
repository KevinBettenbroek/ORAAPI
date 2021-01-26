import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements AfterViewInit, OnInit {
  batches: Batch[] = [];
  checks: Check[] = [];
  order: Order;
  order_NR: string;

  displayedColumns: string[] = ['batch'];
  dataSource = new MatTableDataSource<Batch>(this.batches);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

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
      this.dataSource.data = data;
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

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  back(): void {
    this.location.back();
  }
}
