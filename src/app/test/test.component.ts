import {AfterViewInit, Component, OnInit} from '@angular/core';

import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {
  constructor(public loader: NgxSmartLoaderService) {
  }

  ngOnInit(): void {
    this.loader.start('testLoader'); // Previously this failed
    setTimeout(() => this.loader.stop('testLoader'), 5000);
  }

  ngAfterViewInit() {
    this.loader.getLoader('testLoader').onStart.subscribe(res => {
      console.log('start');
    });

    this.loader.getLoader('testLoader').onStop.subscribe(res => {
      console.log('stop');
    });
  }
}
