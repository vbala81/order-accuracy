import { HttpClient } from '@angular/common/http';
import awsmobile from 'src/aws-exports';
import { Order, Results } from './showorders/order';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { customerOrder, orderItem } from './showorders/fooditem';
import { LoginDetails } from './logindetails';

@Injectable({
    providedIn: 'root'
  })

export class OrderAPIService {

    private websocket: WebSocket | undefined;

    order:Order = {orderId:'', customerId:'',order: [], orderdate: new Date(), isready: false, orderstatus:"",s3imagelink:''};
    orderItem:orderItem = {orderId:'',name:'',item: ''};
    custOrder : customerOrder = {oid:'',omessage:'',items:[]};

    private subject: BehaviorSubject<orderItem> = new BehaviorSubject<orderItem>(this.orderItem);
    public observable: Observable<orderItem> = this.subject.asObservable();

    private customerSubject: BehaviorSubject<customerOrder> = new BehaviorSubject<customerOrder>(this.custOrder);
    public customerObservable: Observable<customerOrder> = this.customerSubject.asObservable();


    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loggedInObservable: Observable<boolean> = this.isLoggedIn.asObservable();

    public logindetails: BehaviorSubject<LoginDetails> = new BehaviorSubject<LoginDetails>({name:'',id:''});
    public logindetailObservable: Observable<LoginDetails> = this.logindetails.asObservable();

    public orderPlace: BehaviorSubject<Order> = new BehaviorSubject<Order>(this.order);
    public orderPlaceObservable: Observable<Order> = this.orderPlace.asObservable();


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
            console.log("Websocket Exception!! " + error);
            this.close()
          };
          this.websocket.onclose = _ => console.log("Close")
          this.websocket.onmessage = message => {
            console.log(message.data);
               
                let wsmessage = JSON.parse(message.data);
                if(wsmessage.name) {
                  Object.assign(this.orderItem,JSON.parse(message.data));
                  this.subject.next(this.orderItem);
                 // console.log(this.orderItem);

                } else {
                  Object.assign(this.custOrder, wsmessage);
                  this.customerSubject.next(this.custOrder);
                }
                

          }
        } catch (e) {
          //this.addMessage("Connection failed!", "log", "error");
          console.log("Error in websocket" + e);
          return false;
        }
        this.websocket.onopen = _ => console.log("Connected");
        return true;
      }

      public close(): void {
        this.websocket?.close();
      }

      public send(message: string): void {
        this.websocket?.send(message);
      }

}