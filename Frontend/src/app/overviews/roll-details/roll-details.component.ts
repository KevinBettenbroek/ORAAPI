import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService, Roll } from '../../services/roll.service';
import { BatchService, Batch } from '../../services/batch.service';
import { OrderService, Order } from '../../services/order.service';
import { BagService, Bag } from '../../services/bag.service';
import { ControleService, Check } from '../../services/controle.service';

@Component({
  selector: 'app-roll-details',
  templateUrl: './roll-details.component.html',
  styleUrls: ['./roll-details.component.css'],
})
export class RollDetailsComponent implements OnInit {
  bags: Bag[] = [];
  checks: Check[] = [];
  roll: Roll;
  controles: any;
  roll_NR: string;

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

  setRoll(roll: Roll) {
    this.rollService.setRoll(roll);
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
    });
    this.controleService
      .getChecks('?roll_NR=' + this.roll_NR)
      .subscribe((data) => {
        this.checks = data;
      });
  }

  back(): void {
    this.location.back();
  }
}
