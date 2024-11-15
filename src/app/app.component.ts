import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedLayoutComponent } from 'shared-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smart-sanitation';
}
