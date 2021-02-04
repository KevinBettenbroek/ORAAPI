import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';
import { BagService } from '../../services/bag.service';
import { ControleService } from '../../services/controle.service';

import { Bag } from '../../models/bagModels';
import { Roll } from '../../models/rollModels';
import { Check } from '../../models/controleModels';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-roll-details',
  templateUrl: './roll-details.component.html',
  styleUrls: ['./roll-details.component.css'],
})
export class RollDetailsComponent implements AfterViewInit, OnInit {
  bags: Bag[] = [];
  checks: Check[] = [];
  roll: Roll;
  roll_NR: string;

  displayedColumns: string[] = ['bag'];
  dataSource = new MatTableDataSource<Bag>(this.bags);

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
    private bagService: BagService,
    private controleService: ControleService
  ) {
    this.roll = rollService.roll;
    this.roll_NR = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roll_NR = params.get('roll_NR')!;
    });
    if (this.roll.roll_NR != this.roll_NR) {
      this.rollService.getRol(this.roll_NR).subscribe((data) => {
        this.roll = data;
      });
    }
    this.bagService.getBags(this.roll_NR).subscribe((data) => {
      this.bags = data;
      this.dataSource.data = data;
    });
    this.controleService
      .getChecks('?roll_NR=' + this.roll_NR)
      .subscribe((data) => {
        this.checks = data;
      });
  }

  setBag(bag: Bag) {
    this.bagService.setBag(bag);
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  back(): void {
    this.location.back();
  }
}
