import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Batch, BatchRow } from '../models/batchModels';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  batches: Batch[] = [];
  batch: Batch;
  batchRows: BatchRow[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.batch = {
      batch_NR: '',
      machine_ID: '',
      packaging_code: -1,
      DB: '',
      leave_datetime: new Date(),
      forward_datetime: new Date(),
      remarks_end_control: '',
      checked_by: '',
      start_datetime: new Date(),
      end_datetime: new Date(),
      inspector: '',
      batch_started: new Date(),
      total_NR_bags: -1,
      bags_checked: -1,
      total_NR_patients: -1,
      bags_rejected: -1,
      NR_to_double_check: -1,
      double_checked: -1,
    };
  }

  setBatch(batch: Batch) {
    this.batch = batch;
  }

  getBatchDetails(batch_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'batchrow?batch_NR=' + batch_NR)
      .pipe(
        map((result) => {
          this.batchRows = result as BatchRow[];
          return this.batchRows;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getBatch(batch_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'batch/' + batch_NR + '/')
      .pipe(
        map((result) => {
          this.batch = result as Batch;
          return this.batch;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getBatches(order_NR: string) {
    return this.http
      .get(
        this.apiService.getApiUrl() + 'batch/?orderbatch__order_NR=' + order_NR
      )
      .pipe(
        map((result) => {
          this.batches = result as Batch[];
          return this.batches;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
