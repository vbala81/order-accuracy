import { Component } from '@angular/core';
import { FOODITEMS, FoodItem } from './fooditem';
import { Observable,of } from 'rxjs';
import { Order, Results } from './order';
import { OrderAPIService } from '../OrderAPI.service';
import { orderDisplay } from './orderdisplay';
import { interval } from 'rxjs';
import awsmobile from 'src/aws-exports';


@Component({
  selector: 'app-showorders',
  templateUrl: './showorders.component.html',
  styleUrls: ['./showorders.component.css']
})
export class ShowordersComponent {
  orders:Order[] = [];
  message: String = "Waiting for the orders..";
  result!: Results;
  order:orderDisplay = {order: '', orderdate: '' , orderissue:"", orderId:''};
  returnorder: any
  

  
  constructor (private api: OrderAPIService) {
    this.api.observable.subscribe(_orders=> {
      console.log("In the component")
     console.log(_orders);
      //let o = this.orders.filter(o => o.orderId===_orders.orderId);
      //console.log(_orders);
      //Object.assign(this.orders.filter(o => o.orderId===_orders.orderId),_orders);

      this.orders.map(function(order) {
         if(order.orderId===_orders.orderId)
            {
               order.order.map(function(o){

                  if(o.name == _orders.name)
                    {
                       o.items.map(_o=> { if(_o.name == _orders.item) _o.isadded = true})
                    }

                     // Checking the order status

               let allareadded = o.items.filter(_all => !_all.isadded)
               console.log(allareadded);
               if(allareadded && allareadded.length==0)
                  order.orderstatus = "Your order is ready to serve"
                else
                  order.orderstatus = "Your order is progress" 




               });

               
               
            }
      });

      let o = this.orders.filter(o => o.orderId===_orders.orderId);
      console.log(o)
    })
    


    // this.api.loggedInObservable.subscribe(_log => this.isLoggedIn=_log);
    this.api.isLoggedIn.next(true);
    
  }
  ngOnInit() {
     

     const interval$ = interval(5000);

     // Subscribe to the observable and do something every 1000 milliseconds
    //  interval$.subscribe(val => {
    //   this.orders = [];
    //   this.getOrders();
    //  });
      this.getOrders();


  }

  ngOnDestroy(): void {
    this.api.close();
    //this.$messages.unsubscribe();
  }


  
  async getOrders() {
  //   let result = await this.api.ListORDERS();
  //  // console.log(result);
  //   result.items.forEach ((item)=> {
  //     console.log("======" + item);
  //     this.order = {order: '', orderdate: '' , orderissue:"", orderId:''};
  //      this.returnorder = item?.order
  //     this.returnorder = JSON.parse(this.returnorder?this.returnorder:"[]")
  //     this.returnorder = this.returnorder.map((el:any)=> el.name)
  //     //console.log(this.returnorder.join(","))
  //     this.order.order = this.returnorder.join(",")
  //     this.order.orderId = item!.id
  //     this.order.orderdate = item?.orderdate!;
  //   //  console.log(this.order)
     
  //     this.orders.push(this.order);

  //   })
  //   console.log(this.orders
  //     )
    this.api.listorders().subscribe(
      (results) => {
        if(results.Items && results.Items.length > 0){
            this.message = "Orders..."
            this.orders = results.Items;
        }

      }
    );

    this.api.connect(awsmobile.web_socket_url);

    // Connecting to Web Socket URL.



  }
}
