import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { observable, Observable, of } from 'rxjs';
import { Data, Router } from '@angular/router';
import { ApiService } from './api.service';

import { Bag, Error, MissingPills, MissingPictures } from '../models/bagModels';

@Injectable({
  providedIn: 'root',
})
export class BagService {
  bags: Bag[] = [];
  errors: Error[] = [];
  missingPictures: MissingPictures[] = [];
  missingPills: MissingPills[] = [];
  bag: Bag;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.bag = {
      bag_NR: '',
      roll_NR: '',
      bag_type: '',
    };
  }

  getBag(bag_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'bag/' + bag_NR + '/')
      .pipe(
        map((result) => {
          this.bag = result as Bag;
          return this.bag;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getBags(roll_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'bag/?roll_NR=' + roll_NR)
      .pipe(
        map((result) => {
          this.bags = result as Bag[];
          return this.bags;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getErrors(bag_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'error/?bag_NR=' + bag_NR)
      .pipe(
        map((result) => {
          this.errors = result as Error[];
          return this.errors;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getMissingPictures(bag_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'missingpictures/?bag_NR=' + bag_NR)
      .pipe(
        map((result) => {
          this.missingPictures = result as MissingPictures[];
          return this.missingPictures;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getMissingPills(bag_NR: string) {
    return this.http
      .get(this.apiService.getApiUrl() + 'pillstoadd/?bag_NR=' + bag_NR)
      .pipe(
        map((result) => {
          this.missingPills = result as MissingPills[];
          return this.missingPills;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
