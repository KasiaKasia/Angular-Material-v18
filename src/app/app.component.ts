import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModules } from './common/common.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
