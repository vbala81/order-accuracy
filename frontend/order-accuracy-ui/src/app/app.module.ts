import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceorderComponent } from './placeorder/placeorder.component';
import { ShowordersComponent } from './showorders/showorders.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomerorderComponent } from './customerorder/customerorder.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatBadgeModule} from '@angular/material/badge';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
  declarations: [
    AppComponent,
    PlaceorderComponent,
    ShowordersComponent,
    CustomerorderComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatListModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
