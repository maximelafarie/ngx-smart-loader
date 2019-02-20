import { NgxSmartLoaderComponent } from '../components/ngx-smart-loader.component';

export class LoaderInstance {
  public id: string;
  public component: NgxSmartLoaderComponent;

  constructor(component: NgxSmartLoaderComponent) {
    this.id = component.identifier;
    this.component = component;
  }
}
