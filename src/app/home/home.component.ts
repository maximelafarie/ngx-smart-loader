import { Component, OnInit } from '@angular/core';
import { NgxSmartLoaderService } from '../../ngx-smart-loader/src/ngx-smart-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public demoOptions = {
    actionDelay: 0,
    hideDelay: 200,
    noHideDelay: false
  };

  constructor(public loader: NgxSmartLoaderService) {
  }

  ngOnInit(): void {
    this.loader.start('myLoader');
  }
}
