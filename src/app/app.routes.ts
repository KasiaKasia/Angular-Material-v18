import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { HomeComponent } from './common/home/home.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },{
    path: 'module',
    loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
},
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },];

