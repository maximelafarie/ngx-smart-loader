import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

import { LoaderInstance } from './../services/loader-instance';
import { NgxSmartLoaderService } from "../services/ngx-smart-loader.service";

@Component({
  selector: 'ngx-smart-loader',
  template: `
    <div class="loader-container {{customClass}}" [ngClass]="{'active': loading}"
         [style.z-index]="layerPosition - 1" *ngIf="visible">
      <ng-content></ng-content>
    </div>
  `
})
export class NgxSmartLoaderComponent implements OnInit, OnDestroy {

  @Input() public identifier: string = '';
  @Input() public customClass: string = '';
  @Input() public force: boolean = false;
  @Input() public delayIn: number = 0;
  @Input() public delayOut: number = 0;
  @Input() public autostart: boolean = false;

  @Output() public onStart = new EventEmitter<NgxSmartLoaderComponent>();
  @Output() public onStop = new EventEmitter<NgxSmartLoaderComponent>();
  @Output() public onVisibleChange = new EventEmitter<NgxSmartLoaderComponent>();

  public loading: boolean = false;
  public visible: boolean = false;
  public layerPosition: number = 999;

  private _debouncer: any;
  private _isProcessing: boolean = false;

  private _loaderBodyClass = 'loader-open';
  private _enterClass = 'enter';
  private _leaveClass = 'leave';

  constructor(public ngxSmartLoaderService: NgxSmartLoaderService, private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    try {
      const loader = new LoaderInstance(this);

      this.ngxSmartLoaderService.addLoader(loader, this.force);

      this.layerPosition += this.ngxSmartLoaderService.getLoaderStackCount();
      this.addCustomClass(this.identifier.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());

      if (this.autostart) {
        this.ngxSmartLoaderService.start(this.identifier);
      } else {
        this.ngxSmartLoaderService.executeAction(this.identifier, 'start');
      }
    } catch (error) {
      throw (error);
    }
  }

  public ngOnDestroy(): void {
    this.ngxSmartLoaderService.removeLoader(this.identifier);
  }

  public start(top?: boolean): void {
    this._isProcessing = true;

    clearInterval(this._debouncer);

    this.visible = true;

    setTimeout(() => {
      this.addCustomClass(this._enterClass);
    });

    this._debouncer = setTimeout(() => {
      if (top) {
        this.layerPosition = this.ngxSmartLoaderService.getHigherIndex();
      }

      if (!document.body.classList.contains(this._loaderBodyClass)) {
        document.body.classList.add(this._loaderBodyClass);
      }

      this.loading = true;

      this.onStart.emit(this);
      this.onVisibleChange.emit(this);

      this.removeCustomClass(this._enterClass);
      this._isProcessing = false;
    }, this.delayIn);
  }

  public stop(): void {
    if (this._isProcessing) {
      this.visible = false;
      this.loading = false;
    }

    clearInterval(this._debouncer);

    this.addCustomClass(this._leaveClass);
    this.loading = false;
    this._debouncer = setTimeout(() => {
      if (document.body.classList.contains(this._loaderBodyClass)) {
        document.body.classList.remove(this._loaderBodyClass);
      }

      this.visible = false;

      this.onStop.emit(this);
      this.onVisibleChange.emit(this);

      this.removeCustomClass(this._leaveClass);
      setTimeout(() => {
        this.changeDetectorRef.markForCheck();
      });
    }, this.delayOut);
  }

  public addCustomClass(className: string): void {
    if (!this.customClass.length) {
      this.customClass = className;
    } else {
      if (this.customClass.indexOf(className) === -1) {
        this.customClass += ' ' + className;
      }
    }
  }

  public removeCustomClass(className?: string): void {
    if (className) {
      this.customClass = this.customClass.replace(className, '').trim();
    } else {
      this.customClass = '';
    }
  }
}
