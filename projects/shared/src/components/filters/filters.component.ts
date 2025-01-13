import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'lib-filters',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent implements OnInit {

  myControl = new FormControl('');
      options: string[] = ['Pie', 'Bar', 'Line'];
      filteredOptions: Observable<string[]> | undefined;
      

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

 ngOnInit(): void {
 
     this.filteredOptions = this.myControl.valueChanges.pipe(
           startWith(''),
           map(value => this._filter(value || ''))
         );
   }
}
