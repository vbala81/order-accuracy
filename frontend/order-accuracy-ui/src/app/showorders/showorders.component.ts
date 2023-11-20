import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FOODITEMS, FoodItem } from './fooditem';
import { Observable, of } from 'rxjs';
import { Order, Results } from './order';
import { OrderAPIService } from '../OrderAPI.service';
import { orderDisplay } from './orderdisplay';
import { interval } from 'rxjs';
import awsmobile from 'src/aws-exports';
import { LoginDetails } from '../logindetails';


@Component({
  selector: 'app-showorders',
  templateUrl: './showorders.component.html',
  styleUrls: ['./showorders.component.css']
})
export class ShowordersComponent {
  orders: Order[] = [];
  message: String = "Waiting for the orders..";
  result!: Results;
  order: orderDisplay = { order: '', orderdate: '', orderissue: "", orderId: '' };
  returnorder: any
  details: any = { name: "Store #101" }




  constructor(private api: OrderAPIService) {


    this.api.observable.subscribe(_orders => {
      console.log("In the component")
      console.log(_orders);
      this.orders.map(function (order) {
        if (order.orderId === _orders.orderId) {
          order.order.map(function (o) {

            if (o.name == _orders.name) {
              o.items.map(_o => { if (_o.name == _orders.item) _o.isadded = true })
            }

            // Checking the order status

            let allareadded = o.items.filter(_all => !_all.isadded)
            console.log(allareadded);
            if (allareadded && allareadded.length == 0) {
              order.orderstatus = "Your order is ready to serve"
              let message = {
                action: "sendmessage",
                message: JSON.stringify({
                  oid: _orders.orderId,
                  omessage: order.orderstatus,
                  items: []
                })
            }
            console.log("MESSAGE IN THE STORE TO CUSTOMER");
            console.log(JSON.stringify(message));
            api.send(JSON.stringify(message));
            }
            else {

              order.orderstatus = "Your order is progress";
              console.log(o.items.length + "=====" + allareadded.length);
              if(allareadded && allareadded.length == 1)
              {
                let message = {
                    action: "sendmessage",
                    message: JSON.stringify({
                      oid: _orders.orderId,
                      omessage: order.orderstatus,
                      items: []
                    })
                }
                console.log("MESSAGE IN THE STORE TO CUSTOMER");
                console.log(JSON.stringify(message));
                api.send(JSON.stringify(message));
              }

            }


          });
        }
      });
      let o = this.orders.filter(o => o.orderId === _orders.orderId);
      console.log(o)
    })




    this.api.isLoggedIn.next(true);

  }
  ngOnInit() {
    //this.api.isLoggedIn.next(true);
    this.getOrders();



    Promise.resolve().then(() => {
      this.api.logindetails.next({ name: "Store #101", id: '' })
      this.api.isLoggedIn.next(true);
    })



  }

  ngOnDestroy(): void {
    this.api.close();
    //this.$messages.unsubscribe();
  }



  async getOrders() {
    this.api.listorders().subscribe(
      (results) => {
        if (results.Items && results.Items.length > 0) {
          this.message = "Orders..."
          this.orders = results.Items;
        }

      }
    );

    // Connecting to Web Socket URL.
    this.api.connect(awsmobile.web_socket_url);
  }
}
