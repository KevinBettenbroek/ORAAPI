import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { observable, Observable, of } from 'rxjs';
import { Data, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

export interface Order {
  order_NR: string;
  institute: string;
  order_released: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Array<Order> = [];
  order: Order;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {
    this.order = { order_NR: '', institute: '', order_released: false };
  }

  getOrder(order_NR: String) {
    return this.http
      .get(this.apiService.getApiUrl() + 'order/' + order_NR + '/')
      .pipe(
        map((result) => {
          this.order = result as Order;
          return this.order;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  getOrders(optionalParameter: String = '') {
    return this.http
      .get(this.apiService.getApiUrl() + 'order/' + optionalParameter)
      .pipe(
        map((result) => {
          this.orders = result as Order[];
          return this.orders;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }

  vrijgifte(order: Order) {
    return this.http
      .patch(
        this.apiService.getApiUrl() + 'ordervrijgifte/' + order.order_NR + '/',
        order
      )
      .pipe(
        map((result) => {
          return result as Order;
        }),
        catchError((err) => {
          return of(err);
        })
      );
  }
}
