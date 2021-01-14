import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { observable, Observable, of } from 'rxjs';
import { Data, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export interface Batch {
  batch_NR: string;
  machine_ID: string;
  packaging_code: number;
  DB: string;
  leave_datetime: Date;
  forward_datetime: Date;
  remarks_end_control: string;
  checked_by: string;
  start_datetime: Date;
  end_datetime: Date;
  inspector: string;
  batch_started: Date;
  total_NR_bags: number;
  bags_checked: number;
  total_NR_patients: number;
  bags_rejected: number;
  NR_to_double_check: number;
  double_checked: number;
}

export interface BatchRow {
  batch_NR: string;
  department: string;
  split_NR: number;
  start_datetime: Date;
  end_datetime: Date;
  NR_patients: number;
  NR_bags: number;
  MC_CD: string;
  remarks: string;
}

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
      .get(this.apiService.getApiUrl() + 'batch/?order_NR=' + order_NR)
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
