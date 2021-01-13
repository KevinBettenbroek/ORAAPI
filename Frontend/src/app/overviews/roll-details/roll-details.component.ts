import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Controle, controles } from '../../models/controle';
import { ControleService } from '../../services/controle.service';
import { RolService, Rol } from '../../services/rol.service';
import { BatchService, Batch } from '../../services/batch.service';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-roll-details',
  templateUrl: './roll-details.component.html',
  styleUrls: ['./roll-details.component.css'],
})
export class RollDetailsComponent implements OnInit {
  rol: Rol;
  controles: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private controleService: ControleService,
    private rolService: RolService,
    private batchService: BatchService,
    private orderService: OrderService
  ) {
    this.rol = {
      roll_NR: -1,
      batch_NR:  "",
      patient: "",
      packaging_code: "",
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.rolService.getRol(params.get('roll_NR')!).subscribe((data) => {
        this.rol = data;
      });
    });
    this.controles = this.controleService.getControles();
  }

  back(): void {
    this.location.back();
  }
}