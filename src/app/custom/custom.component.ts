import { AfterViewInit, Component } from '@angular/core';
import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements AfterViewInit {

  public code = {
    one: null,
    two: null,
    three: null
  };

  constructor(public loader: NgxSmartLoaderService) {

    this.code.one = `<ngx-smart-loader 
  identifier="myCustomLoader" 
  [delayIn]="2000" 
  [delayOut]="200">
    <div class="rubik-loader"></div>
</ngx-smart-loader>`;

    this.code.two = `<ngx-smart-loader 
  identifier="myCustomLoader" 
  [delayOut]="200">
    <div id="jelly-loader">
      <div id="shadow"></div>
      <div id="box"></div>
    </div>
</ngx-smart-loader>
  `;

    this.code.three = `<ngx-smart-loader 
  identifier="myCustomLoader" 
  [delayOut]="200">
    ...
</ngx-smart-loader>
  `;

  }

  ngAfterViewInit() {

    this.loader.getLoader('myCustomLoader').onStart.subscribe(res => {
      console.log('start');
    });

    this.loader.getLoader('myCustomLoader').onStop.subscribe(res => {
      console.log('stop');
    });
  }
}
