import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav-right',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-nav-right.component.html',
  styleUrl: './side-nav-right.component.scss'
})
export class SideNavRightComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
  }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  isExcludedRoute(): boolean {
    const excludedRoutes = ['reports', 'add-device']; 
    return excludedRoutes.some(route => this.router.url.includes(route));
  }

  routePath: string = ""
  isCrea: boolean = false
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.routePath = this.router.url;
      console.log(this.routePath.includes('add-user'))
      this.isCrea = this.routePath.includes('add-user')
      this.cdr.detectChanges();
      console.log(this.routePath, 'alskdjf;laskjdf;laskdjf;laskdjf;laksdjf;laksdf')
    })
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  
}
