import { Component, OnInit } from '@angular/core';
import { CardComponent } from 'xmaint-shared-lib';
import { CommonModule } from '@angular/common';
import { TableComponent } from 'xmaint-shared-lib'
import { FiltersComponent } from 'xmaint-shared-lib'
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'lib-monitoring',
  standalone: true,
  imports: [ CommonModule, TableComponent, MatInputModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatFormFieldModule, FiltersComponent],
  templateUrl: './monitring.component.html',
  styleUrl: './monitring.component.scss'
})
export class MonitoringComponent implements OnInit{

  myControl = new FormControl('');
    options: string[] = ['Pie', 'Bar', 'Line'];
    filteredOptions: Observable<string[]> | undefined;
    
  cards: any[] = [];

  generateCards(count: number): void {
    this.cards = Array.from({ length: count }, () => ({  }));
  }

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
  
    this.generateCards(4);
  }

  columns = ['Data', 'Infrastruttura', 'Asset', 'Sensore', 'Tipo di manutenzione'];
  data: any[] = [
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura', 'Asset': 'assets', 'Sensore': 'sensore', 'Tipo di manutenzione': 'straordinario' },
   
  ];
}
