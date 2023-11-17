import { HttpClient } from '@angular/common/http';
import awsmobile from 'src/aws-exports';
import { Order, Results } from './showorders/order';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { orderItem } from './showorders/fooditem';

@Injectable({
    providedIn: 'root'
  })

export class OrderAPIService {

    private websocket: WebSocket | undefined;

    //order:Order = {orderId:'', order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
    order:orderItem = {orderId:'',name:'',item: ''};

    private subject: BehaviorSubject<orderItem> = new BehaviorSubject<orderItem>(this.order);

    public observable: Observable<orderItem> = this.subject.asObservable();

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loggedInObservable: Observable<boolean> = this.isLoggedIn.asObservable();

    constructor(private http: HttpClient){}

     insertOrder(order: Order) : Observable<Order>{
        return this.http.post<Order>(awsmobile.aws_api_gateway_url+"/orders/insert",order);
    }

    listorders () : Observable<Results> {
        return this.http.get<Results>(awsmobile.aws_api_gateway_url + "/orders/list");
    }

    public connect(url: string): boolean {
        //this.subject.next([]);
        try {
         // this.addMessage("Connecting ...", "log", "info");
          this.websocket = new WebSocket(url);
          this.websocket.onerror = error => {
            //this.addMessage(`Error occurred: ${error.type}: See dev tools for more information`, "log", "error");
            this.close()
          };
          this.websocket.onclose = _ => console.log("Close")
          this.websocket.onmessage = message => {
            console.log(message.data);
                //this.order.orderId = JSON.parse(message.data).orderId;
                Object.assign(this.order,JSON.parse(message.data));
                this.subject.next(this.order);
                console.log(this.order);

          }
        } catch (e) {
          //this.addMessage("Connection failed!", "log", "error");
          return false;
        }
        this.websocket.onopen = _ => console.log("Connected");
        return true;
      }

      public close(): void {
        this.websocket?.close();
      }

}