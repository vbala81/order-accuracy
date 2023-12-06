import { Component } from '@angular/core';
import { Order } from '../showorders/order';
import { OrderAPIService } from '../OrderAPI.service';
import { ActivatedRoute } from '@angular/router';
import awsmobile from 'src/aws-exports';

@Component({
  selector: 'app-customerorder',
  templateUrl: './customerorder.component.html',
  styleUrls: ['./customerorder.component.css']
})
export class CustomerorderComponent {
  placedOrders: Order[] = [];
  customerId: String = "";
  constructor(private api: OrderAPIService, private route: ActivatedRoute) {
    this.customerId = this.route.snapshot.params['customerId'];
    console.log(this.customerId);

    this.api.customerObservable.subscribe(_cust => {
      console.log(_cust);
      this.placedOrders.map((_order) => {
        
          _order.orderstatus = _cust.omessage
          if (_cust.items && _cust.items.length > 0) {
            let _o_names = _order.order.map((_o) => _o.itemname);
            
            //console.log(_cust.items.join(","))
            var misseditem = "";
            _o_names.forEach(_s => {
             console.log(_s);
             console.log(_cust.items.join(","))
             console.log(_cust.items.join(",").includes(_s.toString()));
              
              if (!_cust.items.join(",").includes(_s.toString())) 
                  misseditem = misseditem + " " + _s;

            })

            console.log(misseditem);

            if (misseditem.trim()!="") 
              _order.orderstatus = misseditem + " is missing in your order";
            else 
              _order.orderstatus = "Your order is completed"
           

            // if(_cust.items.join(",") === _o_names.join(","))
            //   _order.orderstatus = "Your order is completed"
            // else 
            //   _order.orderstatus = "Some of the item(s) is missing in your order";


          }
        
      }

      )


    })
  }
  ngOnInit() {
    this.customerId = this.route.snapshot.params['customerId'];
    console.log(this.customerId);

    this.api.listorders().subscribe(_r => {
      console.log(_r);
      this.placedOrders = _r.Items.filter(i => i.customerId === this.customerId)
      console.log(this.placedOrders);
    });
    Promise.resolve().then(() => {
      this.api.logindetails.next({ name: "Dave Bob", id: "7077" })
      this.api.isLoggedIn.next(true);

    })

    this.api.connect(awsmobile.web_socket_url);
  }
}
