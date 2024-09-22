import { DestroyRef, Injectable, inject } from '@angular/core';
import { RxState } from '@rx-angular/state';
 import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChemicalElementsService } from '../services/chemical-elements/chemical-elements.service';
import { LoadingService } from '../services/loading/loading-signal.service';
import { TableState } from '../model/model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateElementsService {

  private chemicalElementsService = inject(ChemicalElementsService);
  private destroyRef = inject(DestroyRef);
  private loadingService = inject(LoadingService);
  private state = new RxState<TableState>();

  constructor() { 
    this.state.connect('isLoading', of(this.loadingService.getLoading()));
 
    this.state.connect(
      'elements',
      this.chemicalElementsService.getListOfChemicalElements().pipe(
        takeUntilDestroyed(this.destroyRef),
        map(req => req.respons || [])
      )
    );
  }
 
  readonly state$ = this.state.select();
  readonly elements$ = this.state.select('elements');
  readonly isLoading$ = this.state.select('isLoading');
}
