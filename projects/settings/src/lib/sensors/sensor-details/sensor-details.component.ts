import { Component } from '@angular/core';
import { TableComponent } from 'shared';

@Component({
  selector: 'lib-sensor-details',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.css'
})
export class SensorDetailsComponent {
  columns = ['Data', 'Infrastruttura', ];
  data: any[] = [
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
  ];
}
