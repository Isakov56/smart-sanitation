import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TableComponent } from 'shared'

@Component({
  selector: 'lib-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, TableComponent, ],
  templateUrl: './add-user.component.html',
  styles: ``
})
export class AddUserComponent {
  columns: string[] = ['Sala operatoria', 'Data', ];
  data: any[] = [
    { 'Sala operatoria': '876598743', Data: 30,  },
    { 'Sala operatoria': '876598743', Data: 30,  },
    { 'Sala operatoria': '876598743', Data: 30,  },
    { 'Sala operatoria': '876598743', Data: 30,  },
    { 'Sala operatoria': '876598743', Data: 30,  },
    { 'Sala operatoria': '876598743', Data: 30,  },
    
   
  ];
}
