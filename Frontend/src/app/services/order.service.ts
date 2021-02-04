import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { Order } from '../models/orderModels';

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

  setOrder(order: Order) {
    this.order = order;
  }

  getOrder(order_NR: string) {
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

  getOrders(optionalParameter: string = '') {
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
