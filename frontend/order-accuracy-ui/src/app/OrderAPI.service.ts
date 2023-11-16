import { HttpClient } from '@angular/common/http';
import awsmobile from 'src/aws-exports';
import { Order, Results } from './showorders/order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class OrderAPIService {
    constructor(private http: HttpClient){}

     insertOrder(order: Order) : Observable<Order>{
        return this.http.post<Order>(awsmobile.aws_api_gateway_url+"/orders/insert",order);
    }

    listorders () : Observable<Results> {
        return this.http.get<Results>(awsmobile.aws_api_gateway_url + "/orders/list");
    }

}