import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedLayoutComponent } from 'shared-layout';
import { SanitationLayoutComponent } from 'sanitation-layout';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { routeConfig } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'smart-sanitation';
  isLogedIn: boolean = true;

  public routes = routeConfig;

  ngOnInit(): void {
    document.body.classList.add('theme-light');
  }
}
