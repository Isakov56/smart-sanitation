import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-add-device',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.scss'
})
export class AddDeviceComponent implements OnInit {
  
  sensors: { nome: string; unita: string }[] = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    const savedSensors = localStorage.getItem('sensors');
    if (savedSensors) {
      this.sensors = JSON.parse(savedSensors);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addSensor() {
    this.sensors.push({ nome: '', unita: '' });
    this.saveSensors();
  }

  // removeSensor(index: number) {
  //   this.sensors.splice(index, 1);
  //   this.saveSensors();
  // }
  removeSensor() {
    this.saveSensors();
  }

  saveSensors() {
    localStorage.setItem('sensors', JSON.stringify(this.sensors));
  }

  
}
