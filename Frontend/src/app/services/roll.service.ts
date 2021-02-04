import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

import { Roll } from '../models/rollModels';

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
      roll_NR: '',
      batch_NR: '',
      patient: '',
    };
  }

  setRoll(roll: Roll) {
    this.roll = roll;
  }

  getRol(roll_NR: string) {
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
