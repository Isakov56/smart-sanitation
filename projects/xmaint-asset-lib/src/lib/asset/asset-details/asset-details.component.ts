import { Component } from '@angular/core';
import { TableComponent } from 'shared';

@Component({
  selector: 'lib-asset-details',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './asset-details.component.html',
  styleUrl: './asset-details.component.css'
})
export class AssetDetailsComponent {
  columns = ['Data', 'Infrastruttura', ];
  data: any[] = [
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
    { 'Data': '10/11/2024', "Infrastruttura": 'infrastruttura',  },
  ];
}
