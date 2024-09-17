import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  currentLoadingStatus: WritableSignal<boolean> = signal<boolean>(false);

  updateLoading(valueUpdate: boolean) {
    this.currentLoadingStatus.set(valueUpdate)
  }

  getLoading() {
    return this.currentLoadingStatus()
  }
}
