import { Component,  DestroyRef, effect, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnKeys, PeriodicElement } from '../../model/model';
import { UpperCasePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChemicalElementsService } from '../../service/chemical-elements/chemical-elements.service';
import { LoadingService } from '../../service/loading/loading.service';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { debounceTime, distinctUntilChanged, fromEvent, map, of, switchMap } from 'rxjs';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatLabel, MatPaginatorModule, UpperCasePipe, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  providers: [ChemicalElementsService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  protected readonly displayedColumns: ColumnKeys[] = ['position', 'name', 'weight', 'symbol', 'Akcje'];
  protected destroyRef = inject(DestroyRef)
  protected dataSource = new MatTableDataSource<PeriodicElement>([]);
  protected loadingService = inject(LoadingService)
  protected isLoading = this.loadingService.getLoading()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    protected chemicalElementsService: ChemicalElementsService) {
    effect(() => {
      this.isLoading = this.loadingService.getLoading()
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.chemicalElementsService.getListOfChemicalElements()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(req => {
        if (req && req.respons) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(req.respons)
          this.dataSource.paginator = this.paginator;
        }
      })
  }

  openEditDialog(elementToChange: PeriodicElement): void {

    const dialogRef = this.dialog.open(DialogFormComponent, {
      width: '400px',
      data: { elementToChange }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((result) => {
          if (result !== 'cancel') {
            const updatedElement = result;
            const confirmDialogRef = this.dialog.open(DialogConfirmationComponent, {
              width: '400px'
            });

            return confirmDialogRef.afterClosed().pipe(
              map(confirmed => ({ confirmed, updatedElement }))
            );
          } else return of(null);
        })
      )
      .subscribe((result) => {
        if (result && result.confirmed === 'confirmSaving') {
          this.updateElement(result.updatedElement);
        }
      });
  }

  updateElement(updatedElement: PeriodicElement): void {
    const updatedData = this.dataSource.data.map((el) =>
      el.position === updatedElement?.position ? updatedElement : el
    );
    this.dataSource.data = updatedData;
  }

  applyFilter(event: Event) { 
    fromEvent(event.target as HTMLInputElement, 'input').pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      debounceTime(2000),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(value => { 
      value ? this.dataSource.filter = value.trim().toLowerCase(): this.dataSource;
    });
  }
}

