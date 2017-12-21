import { Component } from '@angular/core';
import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent {

  public code = {
    one: null,
    two: null,
    three: null
  };

  constructor(public loader: NgxSmartLoaderService) {

    this.code.one = `<ngx-smart-loader 
  identifier="myLoaderMulti" 
  [delayIn]="2000" 
  [delayOut]="200">
    <div class="loader">
      <div class="circle"></div>
    </div>
</ngx-smart-loader>`;

    this.code.two = `<ngx-smart-loader 
  identifier="myLoaderMulti" 
  [delayOut]="200">
    <div class="loader">
      <div class="circle"></div>
    </div>
</ngx-smart-loader>
  `;

    this.code.three = `<ngx-smart-loader 
  identifier="myLoaderMulti" 
  [delayOut]="200">
    <div class="loader">
      <div class="circle"></div>
    </div>
</ngx-smart-loader>
  `;


  }

}
