import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../public/pesanan/pesanan.interface';
import { DetailPemesananService } from './detail-pemesanan.service';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-pemesanan',
  templateUrl: './detail-pemesanan.page.html'
})
export class DetailPemesananPage {

  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  orderId: string = '';
  order: Order = {} as Order;

  constructor(
    private route: ActivatedRoute,
    private detail: DetailPemesananService
  ) {
    this.orderId = this.route.snapshot.params.id;
  }

  ionViewDidEnter() {
    this.detail.getOrder(this.orderId)
      .subscribe(order => {
        console.log(order)
        this.order = order
      }, err => {
        console.log(err)
      })
  }
  
  exportOrder(){
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
