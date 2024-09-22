import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [],
  imports: [  
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent
  ],
  exports: [
    NavbarComponent, 
    HomeComponent, 
    NotFoundComponent,
    FooterComponent
  ]
})
export class CommonModules {}
