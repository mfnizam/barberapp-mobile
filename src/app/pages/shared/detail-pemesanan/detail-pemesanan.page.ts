import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../public/pesanan/pesanan.interface';
import { DetailPemesananService } from './detail-pemesanan.service';

@Component({
  selector: 'app-detail-pemesanan',
  templateUrl: './detail-pemesanan.page.html'
})
export class DetailPemesananPage {

  orderId: string = '';
  order: Order = {} as Order;

  constructor(
    private route: ActivatedRoute,
    private detail: DetailPemesananService
  ) {
    this.orderId = this.route.snapshot.params.id;
  }

  ionViewDidEnter(){
    this.detail.getOrder(this.orderId)
    .subscribe(order => {
      console.log(order)
      this.order = order
    }, err => {
      console.log(err)
    })
  }
}
