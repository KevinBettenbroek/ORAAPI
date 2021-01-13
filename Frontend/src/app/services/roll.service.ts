import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { observable, Observable, of } from 'rxjs';
import { Data, Router } from '@angular/router';
import { ApiService } from './api.service';

export interface Roll {
  roll_NR: number;
  batch_NR: String;
  patient: string;
  packaging_code: string;
}

@Injectable({
  providedIn: 'root',
})
export class RollService {
  rolls: Array<Roll> = [];
  roll: Roll;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.roll = {
      roll_NR: 0,
      batch_NR: '',
      patient: '',
      packaging_code: '',
    };
  }

  getRol(roll_NR: String) {
    return this.http
      .get(this.apiService.getApiUrl() + 'roll/' + roll_NR + '/')
      .pipe(
        map((result) => {
          this.roll = result as Roll;
          return this.roll;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getRols(batch_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'roll/?batch_NR=' + batch_NR)
      .pipe(
        map((result) => {
          this.rolls = result as Roll[];
          return this.rolls;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
