import { Injectable, Signal, signal } from '@angular/core';
import { PeriodicElement } from '../../model/model';
/**
 * ChemicalElements Main Interface
 */
export abstract class ChemicalElementsAbstract {
  /**
   * Method to fetch data from currentChemicalElements
    */
  abstract getCurrentChemicalElements(): Signal<PeriodicElement[]>;
  /**
   * Method for writing data to signal currentChemicalElements
   * @param objectPeriodicElement changed values ​​for chemical element object
   */
  abstract updateCurrentChemicalElements(objectPeriodicElement: PeriodicElement): void;
}

@Injectable({
  providedIn: 'root'
})
export class ChemicalElementsSignalsService extends ChemicalElementsAbstract {
  currentChemicalElements = signal<PeriodicElement[]>([]);
  constructor() { super() }

  getCurrentChemicalElements(): Signal<PeriodicElement[]> {
    return this.currentChemicalElements.asReadonly();
  }
  updateCurrentChemicalElements(periodicElement: PeriodicElement) {
    this.currentChemicalElements.update(chemicalElements => {
      for (let i in chemicalElements) {
        if (chemicalElements[i].position == periodicElement.position)
          chemicalElements[i] = periodicElement
      }
      return chemicalElements;
    })
  }
  setCurrentChemicalElements(periodicElement: PeriodicElement[]){
    this.currentChemicalElements.set(periodicElement)
  }
}
