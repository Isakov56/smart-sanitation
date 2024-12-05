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
  columns: string[] = ['Sala operatoria', 'Data', ];
  data: any[] = [
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
    { 'user-id': '879879', 'delete-icon': "delete-icon",   },
  ];

  public objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);  // Preserves key order
  }
}
