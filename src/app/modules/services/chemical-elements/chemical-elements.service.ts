import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, share, tap, throwError } from 'rxjs';
import { Settings } from '../../../../config/settings';
import { Response } from '../../model/model';
 
@Injectable({
  providedIn: 'root'
})
export class ChemicalElementsService {
  constructor(public httpClient: HttpClient) {}
 
  public getListOfChemicalElements(): Observable<Response> {
 
    return this.httpClient.get<Response>(Settings.API_LIST_CHEMICAL_ELEMENTS).pipe(

      tap(listOfChemicalElements => console.info('The list of chemical elements has been retrieved' + listOfChemicalElements)),
      share(),
      catchError((Error: any) => {
        return throwError(() => new Error('An issue occurred. Please try again later.'));
      })
    );
  }
}
