import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TableComponent } from 'shared'

@Component({
  selector: 'lib-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, TableComponent, ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  columns = ['ID', 'Puo Leggere', 'Puo Scrivere', 'Amministratore'];
  data: any[] = [
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
   
  ];

  public objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);  // Preserves key order
  }
}
