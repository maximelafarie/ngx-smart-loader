import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxSmartLoaderService } from '../services/ngx-smart-loader.service';
import { NgxSmartLoaderComponent } from '../components/ngx-smart-loader.component';

@NgModule({
  declarations: [NgxSmartLoaderComponent],
  exports: [NgxSmartLoaderComponent],
  imports: [CommonModule]
})
export class NgxSmartLoaderModule {

  /**
   * Use in AppModule: new instance of NgxSmartModal.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSmartLoaderModule,
      providers: [NgxSmartLoaderService]
    };
  }

  /**
   * Use in features modules with lazy loading: new instance of NgxSmartModal.
   */
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: NgxSmartLoaderModule,
      providers: [NgxSmartLoaderService]
    };
  }

}
