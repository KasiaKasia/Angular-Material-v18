import { Injectable, signal, WritableSignal } from '@angular/core';
/**
 * Main interface of the Loading class
 */
export abstract class LoadingServiceAbstract {
  /**
   * Method to fetch data from currentLoadingStatus
  */
  abstract getLoading(): boolean;
  /**
   * Method for writing data to signal currentLoadingStatus
   * @param valueUpdate changed values ​​for chemical element object
   */
  abstract updateLoading(valueUpdate: boolean): void;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService extends LoadingServiceAbstract {

  currentLoadingStatus: WritableSignal<boolean> = signal<boolean>(false);

  updateLoading(valueUpdate: boolean) {
    this.currentLoadingStatus.set(valueUpdate)
  }

  getLoading() {
    return this.currentLoadingStatus()
  }
}
