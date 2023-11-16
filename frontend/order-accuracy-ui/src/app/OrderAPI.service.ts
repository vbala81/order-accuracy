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

     insertOrder(order: Order) {
        console.log(awsmobile);
        this.http.post(awsmobile.aws_api_gateway_url+"/orders/insert",order).subscribe (
            (data) => { console.log(data)},
            (error) => { console.log(error)}
        )
    }

    listorders () : Observable<Results> {
        return this.http.get<Results>(awsmobile.aws_api_gateway_url + "/orders/list");
    }

}