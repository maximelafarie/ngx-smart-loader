import { Component, AfterViewInit } from '@angular/core';
import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  public demoOptions = {
    actionDelay: 0,
    hideDelay: 200,
    noHideDelay: false
  };

  constructor(public loader: NgxSmartLoaderService) {
  }

  ngAfterViewInit() {
    // For demo auto start purposes
    setTimeout(() => {
      this.loader.start('myLoader');
    }, 500);
  }

}
