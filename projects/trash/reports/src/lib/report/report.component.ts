import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TableComponent } from 'shared'

@Component({
  selector: 'lib-report',
  standalone: true,
  imports: [CommonModule, MatIcon, TableComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  rowData: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rowDataString = params['rowData']; // Get the rowData query parameter

      // If rowData exists, parse it into an object
      if (rowDataString) {
        try {
          this.rowData = JSON.parse(rowDataString); // Parse the JSON string to an object
        } catch (e) {
          console.error('Error parsing rowData:', e);
        }
      }
    });
  }

  columns = ['Tipo', 'Valore', 'Unita di misura',];
  data: any[] = [
    { 'Tipo': 'Temperatura', 'Valore': 'Null 1', 'Unita di misura': 'C',  },
    { 'Tipo': 'Pressione', 'Valore': 'Null 1', 'Unita di misura': 'atm',  },
    { 'Tipo': 'Umidita', 'Valore': 'Null 1', 'Unita di misura': '%',  },
  ];

}
