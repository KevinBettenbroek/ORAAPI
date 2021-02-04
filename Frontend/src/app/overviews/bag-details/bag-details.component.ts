import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RollService } from '../../services/roll.service';
import { BatchService } from '../../services/batch.service';
import { OrderService } from '../../services/order.service';
import { ControleService } from '../../services/controle.service';
import { BagService } from '../../services/bag.service';
import {
  Error,
  MissingPictures,
  MissingPills,
  Bag,
} from '../../models/bagModels';
import { Check } from '../../models/controleModels';

@Component({
  selector: 'app-bag-details',
  templateUrl: './bag-details.component.html',
  styleUrls: ['./bag-details.component.css'],
})
export class BagDetailsComponent implements OnInit {
  errors: Error[] = [];
  missingPictures: MissingPictures[] = [];
  missingPills: MissingPills[] = [];
  checks: Check[] = [];
  bag: Bag;
  controles: any;
  bag_NR: string;

  displayedColumns: string[] = ['pil_ID', 'medication_name', 'free_text'];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private rollService: RollService,
    private batchService: BatchService,
    private orderService: OrderService,
    private bagService: BagService,
    private controleService: ControleService
  ) {
    this.bag = bagService.bag;
    this.bag_NR = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bag_NR = params.get('bag_NR')!;
    });
    if (this.bag.bag_NR != this.bag_NR) {
      this.bagService.getBag(this.bag_NR).subscribe((data) => {
        this.bag = data;
      });
    }
    this.bagService.getErrors(this.bag_NR).subscribe((data) => {
      this.errors = data;
    });
    this.bagService.getMissingPictures(this.bag_NR).subscribe((data) => {
      this.missingPictures = data;
    });
    this.bagService.getMissingPills(this.bag_NR).subscribe((data) => {
      this.missingPills = data;
    });
    this.controleService
      .getChecks('?bag_NR=' + this.bag_NR)
      .subscribe((data) => {
        this.checks = data;
      });
  }

  back(): void {
    this.location.back();
  }
}
