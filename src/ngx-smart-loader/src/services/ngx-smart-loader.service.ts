import { Injectable } from '@angular/core';
import { NgxSmartLoaderComponent } from '../components/ngx-smart-loader.component';
import { LoaderInstance, ActionsToExecute } from './loader-instance';


@Injectable()
export class NgxSmartLoaderService {

  private loaderStack: LoaderInstance[] = [];
  private debouncer: any;
  private waitingActions = new Map<string, ActionsToExecute>();

  /**
   * Add a new loader instance. This step is essential and allows to retrieve any loader at any time.
   * It stores an object that contains the given loader identifier and the loader itself directly in the `loaderStack`.
   *
   * @param loaderInstance The object that contains the given loader identifier and the loader itself.
   * @param force Optional parameter that forces the overriding of loader instance if it already exists.
   */
  public addLoader(loaderInstance: LoaderInstance, force?: boolean): void {
    if (force) {
      const i: number = this.loaderStack.findIndex((o: LoaderInstance) => {
        return o.id === loaderInstance.id;
      });
      if (i > -1) {
        this.loaderStack[i].loader = loaderInstance.loader;
        return;
      }
    }

    this.loaderStack.push(loaderInstance);
    this.executeWaitingAction(loaderInstance.id, 'onStart');
  }

  /**
   * Remove a loader instance from the loader stack.
   *
   * @param id The loader identifier.
   */
  public removeLoader(id: string): void {
    const i: number = this.loaderStack.findIndex((o: any) => {
      return o.id === id;
    });
    if (i > -1) {
      this.executeWaitingAction(id, 'onStop');
      this.waitingActions.delete(id);
      this.loaderStack.splice(i, 1);
    }
  }

  /**
   * Retrieve all the created loaders.
   *
   * @returns Returns an array that contains all loader instances.
   */
  public getLoaderStack(): LoaderInstance[] {
    return this.loaderStack;
  }

  /**
   * It gives the number of loader instances. It's helpful to know if the loader stack is empty or not.
   *
   * @returns Returns the number of loader instances.
   */
  public getLoaderStackCount(): number {
    return this.loaderStack.length;
  }

  /**
   * Retrieve all the opened loaders. It looks for all loader instances with their `visible` property set to `true`.
   *
   * @returns Returns an array that contains all the opened loaders.
   */
  public getOpenedLoaders(): LoaderInstance[] {
    return this.loaderStack.filter((loaderInstance: LoaderInstance) => loaderInstance.loader.visible );
  }

  /**
   * Get the higher `z-index` value between all the loader instances. It iterates over the `LoaderStack` array and
   * calculates a higher value (it takes the highest index value between all the loader instances and adds 1).
   * Use it to make a loader appear foreground.
   *
   * @returns Returns a higher index from all the existing loader instances.
   */
  public getHigherIndex(): number {
    const index: number[] = this.getOpenedLoaders().map((o: LoaderInstance) => o.loader.layerPosition);
    return Math.max(...index) + 1;
  }

  /**
   * Retrieve all the active loaders. It looks for all loader instances with their `loading` property set to `true`.
   *
   * @returns Returns an array that contains all the active loaders.
   */
  public getActiveLoaders(): LoaderInstance[] {
    return this.loaderStack.filter((loaderInstance: LoaderInstance) => loaderInstance.loader.loading );
  }

  /**
   * Retrieve a loader instance by its identifier.
   * If there's several loaders with same identifier, the first is returned.
   * To retrieve several loaders with same identifiers, please call `getLoaders` method.
   *
   * @param id The loader identifier used at creation time.
   * @return the NgxSmartLoaderComponent matching id or null if it don't exist OR is not created yet
   */
  public getLoader(id: string): NgxSmartLoaderComponent | null {
    const loaderInstance = this.loaderStack.find((loader: any) => loader.id === id);
    if (!loaderInstance) {
      return null;
    }

    return loaderInstance.loader;
  }

  /**
   * Enable loading state to one or several loaders.
   *
   * @param identifier The loader identifier.
   */
  public start(identifier: string | string[]) {
    if (Array.isArray(identifier)) {
      identifier.forEach((i: string) => {
        this.doStart(i);
      });
    } else {
      this.doStart(identifier);
    }
  }

  /**
   * Disable loading state to one or several loaders.
   *
   * @param identifier The loader identifier.
   */
  public stop(identifier: string | string[]) {
    if (Array.isArray(identifier)) {
      identifier.forEach((i: string) => {
        this.doStop(i);
      });
    } else {
      this.doStop(identifier);
    }
  }

  public isLoading(identifier: string | string[]): boolean {
    const me = this;

    if (Array.isArray(identifier)) {
      const tmp: any = [];
      identifier.forEach((i: string) => {
        me.loaderStack.forEach((o: LoaderInstance) => {
          if (o.id === i) {
            tmp.push(o.loader.loading);
          }
        });
      });
      return tmp.indexOf(false) === -1;
    } else {
      const loader = this.getLoader(identifier);
      return !!loader ? loader.loading : false;
    }
  }

  /**
   * Get the loader from the loaderStack and start it
   * If the loader is NOT created yet, we store the start action as a callback to execute it at the loader creation
   *
   * @param identifier The loader identifier.
   * */
  private doStart(identifier: string): void {
    const loader = this.getLoader(identifier);
    // The loader is not created yet, I store the start action to execute it when the loader will be added
    if (!loader) {
      this.addWaitingAction(identifier, 'onStart', this.doStart);
      return;
    }

    loader.start();
  }

  /**
   * Get the loader from the loaderStack and stop it
   * If the loader is NOT created yet, we store the stop action as a callback to execute it at the loader creation
   *
   * @param identifier The loader identifier.
   * */
  private doStop(identifier: string): void {
    const loader = this.getLoader(identifier);
    // The loader is not yet created, I store the stop action to execute it when the loader will be added
    if (!loader) {
      this.addWaitingAction(identifier, 'onStop', this.doStop);
      return;
    }

    loader.stop();
    this.waitingActions.delete(identifier);
  }

  private addWaitingAction(identifier: string, action: keyof ActionsToExecute, callback: (id: string) => void) {
    const actions = this.waitingActions.get(identifier) || {};
    actions[action] = callback.bind(this, identifier);
    this.waitingActions.set(identifier, actions);
  }

  private executeWaitingAction(identifier: string, action: keyof ActionsToExecute): void {
    const actions = this.waitingActions.get(identifier);
    if (actions && actions.hasOwnProperty(action) && undefined !== actions[action]) {
      actions[action]!(identifier);
      delete actions[action];
      this.waitingActions.set(identifier, actions);
    }
  }
}
