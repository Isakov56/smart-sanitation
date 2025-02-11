import { Component } from '@angular/core';
import { TableComponent } from 'xmaint-shared-lib'


@Component({
  selector: 'lib-details',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  columns = ['Data', 'Infrastruttura', ];
  data: any[] = [
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
  ];
}
