import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { formatDate, Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';
import { ControleService } from '../../services/controle.service';

import { Batch, BatchRow } from '../../models/batchModels';
import { Roll } from '../../models/rollModels';
import { Check } from '../../models/controleModels';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.css'],
})
export class BatchDetailsComponent implements AfterViewInit, OnInit {
  rolls: Roll[] = [];
  batchRows: BatchRow[] = [];
  checks: Check[] = [];
  batch: Batch;
  batch_NR: string;

  displayedColumns: string[] = ['roll'];
  dataSource = new MatTableDataSource<Roll>(this.rolls);

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
    this.batch = batchService.batch;
    this.batch_NR = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.batch_NR = params.get('batch_NR')!;
    });
    if (this.batch.batch_NR != this.batch_NR) {
      this.batchService.getBatch(this.batch_NR).subscribe((data) => {
        this.batch = data;
      });
    }
    this.batchService.getBatchDetails(this.batch_NR).subscribe((data) => {
      this.batchRows = data;
    });
    this.rollService.getRols(this.batch_NR).subscribe((data) => {
      this.rolls = data;
      this.dataSource.data = data;
    });
    this.controleService
      .getChecks('?batch_NR=' + this.batch_NR)
      .subscribe((data) => {
        this.checks = data;
      });
  }

  transformdatetime(date: Date) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  setRoll(roll: Roll) {
    this.rollService.setRoll(roll);
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  back(): void {
    this.location.back();
  }
}
