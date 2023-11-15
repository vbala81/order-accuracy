import { HttpClient } from '@angular/common/http';
import awsmobile from 'src/aws-exports';
import { Order } from './showorders/order';
import { Injectable } from '@angular/core';

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

}