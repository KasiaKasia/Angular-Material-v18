import { NgModule } from '@angular/core';
import { ModulesRoutingModule } from './modules-routing.module';
import { TableComponent } from './components/table/table.component';


@NgModule({
  imports: [ 
    ModulesRoutingModule,
    TableComponent, 
  ] 
})
export class ModulesModule { }
