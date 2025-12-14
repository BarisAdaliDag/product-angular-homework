import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './components/category-component/category-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CategoryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('product-angular-homework');
}
