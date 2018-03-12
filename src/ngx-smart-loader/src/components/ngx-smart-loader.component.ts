import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
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

  @Input() public identifier: string;
  @Input() public customClass: string = '';
  @Input() public force: boolean = false;
  @Input() public delayIn: number = 0;
  @Input() public delayOut: number = 0;
  @Input() public autostart: boolean = false;

  @Output() public visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public onStart: EventEmitter<any> = new EventEmitter();
  @Output() public onStop: EventEmitter<any> = new EventEmitter();

  public loading: boolean = false;
  public visible: boolean = false;
  public layerPosition: number = 999;
  private debouncer: any;
  private isProcessing: boolean = false;

  constructor(public ngxSmartLoaderService: NgxSmartLoaderService, private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.layerPosition += this.ngxSmartLoaderService.getLoaderStackCount();
    this.addCustomClass(this.identifier.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase());
    this.ngxSmartLoaderService.addLoader({id: this.identifier, loader: this}, this.force);

    if (this.autostart) {
      this.ngxSmartLoaderService.start(this.identifier);
    }
  }

  public ngOnDestroy() {
    this.ngxSmartLoaderService.removeLoader(this.identifier);
  }

  public start(top?: boolean): void {
    const me = this;

    me.isProcessing = true;

    clearInterval(me.debouncer);

    me.visible = true;
    me.addCustomClass('enter');
    me.debouncer = setTimeout(() => {
      if (top) {
        me.layerPosition = me.ngxSmartLoaderService.getHigherIndex();
      }

      if (!document.body.classList.contains('loader-open')) {
        document.body.classList.add('loader-open');
      }

      me.loading = true;
      me.visibleChange.emit(me.visible);
      me.onStart.emit(me);
      me.removeCustomClass('enter');
      me.isProcessing = false;
    }, me.delayIn);
  }

  public stop(): void {
    const me = this;

    if (me.isProcessing) {
      me.visible = false;
      me.loading = false;
    }

    clearInterval(me.debouncer);

    me.addCustomClass('leave');
    me.loading = false;
    me.debouncer = setTimeout(() => {
      if (document.body.classList.contains('loader-open')) {
        document.body.classList.remove('loader-open');
      }

      me.visible = false;
      me.visibleChange.emit(me.visible);
      me.onStop.emit(me);
      me.removeCustomClass('leave');
      setTimeout(() => {
        me.changeDetectorRef.markForCheck();
      });
    }, me.delayOut);
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
