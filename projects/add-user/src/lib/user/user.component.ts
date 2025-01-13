import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [CommonModule, MatFormField, MatInputModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
rowData: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const rowDataString = params['rowData'];

      if (rowDataString) {
        // Parse the JSON string back into an object
        this.rowData = JSON.parse(rowDataString);
        console.log(this.rowData); // The parsed object is now available
      }
    });
  }
}
