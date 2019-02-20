import { Component, OnInit } from '@angular/core';
import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit {

  public code = {
    one: null,
    two: null,
    three: null
  };

  constructor(public loader: NgxSmartLoaderService) {

    this.code.one = `
<ngx-smart-loader identifier="myCustomLoader1" [delayIn]="2000" [delayOut]="2000">
  <div class="rubik-loader"></div>
</ngx-smart-loader>`;

    this.code.two = `
<ngx-smart-loader identifier="myCustomLoader2" [delayOut]="200">
  <div id="jelly-loader">
    <div id="shadow"></div>
    <div id="box"></div>
  </div>
</ngx-smart-loader>`;

    this.code.three = `
<ngx-smart-loader identifier="myCustomLoader3" [delayOut]="200">
  ...
</ngx-smart-loader>`;

  }

  ngOnInit() {
  }

  onStart(event) {
    console.log('loader started', event);
  }

  onStop(event) {
    console.log('loader stopped', event);
  }
}
