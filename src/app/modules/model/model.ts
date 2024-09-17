
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export type nameColumns = 'Akcje'
export type ColumnKeys = keyof PeriodicElement | nameColumns;

export interface Response {
  readonly success?: boolean,
  readonly message?: string,
  readonly respons?: any[]
}