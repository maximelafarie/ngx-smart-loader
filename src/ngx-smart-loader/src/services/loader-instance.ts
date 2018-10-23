import { NgxSmartLoaderComponent } from '../components/ngx-smart-loader.component';

export class LoaderInstance {
  public id: string;
  public loader: NgxSmartLoaderComponent;
}

export interface ActionsToExecute {
    onStart?: (id: string) => void;
    onStop?: (id: string) => void;
}
