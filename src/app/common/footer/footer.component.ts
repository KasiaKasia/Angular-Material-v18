import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  interpolation: ['(', ')'],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly description = '©2024 Copyright: Katarzyna Bulicka';
}
