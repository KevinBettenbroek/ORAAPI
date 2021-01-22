import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ControleService } from '../../services/controle.service';

import { Check } from '../../models/controleModels';

@Component({
  selector: 'app-controle-loggen',
  templateUrl: './controle-loggen.component.html',
  styleUrls: ['./controle-loggen.component.css'],
})
export class ControleLoggenComponent implements OnInit {
  title = 'Controle loggen';
  id = '';
  abstractieLevel = 'Opdracht';
  controle = 'Controle';
  remarks = '';
  check: Check;

  constructor(
    private location: Location,
    private controleService: ControleService
  ) {
    this.check = {
      order_NR: '',
      batch_NR: '',
      roll_NR: '',
      bag_NR: '',
      check_type: '',
      checked_by: '',
      check_remarks: '',
    };
  }

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }

  logControle() {
    this.check.check_type = this.controle;
    this.check.checked_by = 'Jan';
    this.check.check_remarks = this.remarks;
    switch (this.abstractieLevel) {
      case 'Opdracht': {
        this.check.order_NR = this.id;
        this.controleService.createCheck(this.check).subscribe();
        break;
      }
      case 'Batch': {
        this.check.batch_NR = this.id;
        this.controleService.createCheck(this.check).subscribe();
        break;
      }
      case 'MediRol': {
        this.check.roll_NR = this.id;
        this.controleService.createCheck(this.check).subscribe();
        break;
      }
      case 'Zakje': {
        this.check.bag_NR = this.id;
        this.controleService.createCheck(this.check).subscribe();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
}
