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
      
      if (this.orders.length > 0) {
        let forder = this.orders[0].order.filter(_x => _x.itemname == _orders.name);
        if (forder.length > 0) {
          let filterbysequence = forder[0].orderedItems.filter(_i => !_i.isadded).sort((a, b) => a.sequencenumber - b.sequencenumber).at(0);
          if(!filterbysequence) {
            this.orders[0].orderstatus = "Extra item is picked!! " + _orders.item; 
            return;
          }
          let firstelement = filterbysequence?.name;
          let firstelementseq = filterbysequence?.sequencenumber;
          firstelement = firstelement?.includes('(') ? firstelement.split('(')[0].trim() : firstelement
          //console.log(firstelement);
          if (firstelement?.toLowerCase() === _orders.item.toLowerCase()) {
            this.orders[0].order.filter(_x => _x.itemname == _orders.name)[0].orderedItems.filter(_i => !_i.isadded).sort((a, b) => a.sequencenumber - b.sequencenumber).map(
              (_ad => {
                if (_ad.name.toLowerCase().includes(_orders.item.toLowerCase()) &&
                  _ad.sequencenumber == firstelementseq
                ) {
                  _ad.isadded = true;
                 // console.log(_ad)
                }

              })
            )
            this.orders[0].orderstatus = "Your order is in progress";   
          } else {
            this.orders[0].orderstatus = "Wrong item picked!!  Next Item is " + firstelement   
          }

        } else {

          this.orders[0].orderstatus = "Wrong Item picked :: " + _orders.name
        }
        //filter(_i => !_i.isadded).sort((a,b) => a.sequencenumber - b.sequencenumber).at(0)?.name 

        // Checking the order is ready to serve.

        this.orders[0].order.forEach((_item, index) => {
            let anyitemsnotadded = _item.orderedItems.filter(_f => !_f.isadded);
            console.log(anyitemsnotadded);
            if(anyitemsnotadded.length == 0 && index == _item.items.length){
            this.orders[0].orderstatus = "Your order is ready to serve!! ";
            let message = {
              action: "sendmessage",
              message: JSON.stringify({
                oid: '',
                omessage: "Your order is ready to serve!!",
                items: []
              })
          }
          console.log("MESSAGE IN THE STORE TO CUSTOMER");
          console.log(JSON.stringify(message));
          api.send(JSON.stringify(message));
            }

        })


      }


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
