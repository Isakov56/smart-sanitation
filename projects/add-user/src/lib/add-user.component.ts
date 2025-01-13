import { Component, TemplateRef } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from 'shared'
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, TableComponent, MatSlideToggle],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  columns = ['ID', 'Puo Leggere', 'Puo Scrivere', 'Amministratore'];
  data: any[] = [
    { 'ID': '275397', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '908374', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '986743', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '435786', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '967435', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '798609', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
    { 'ID': '216490', 'Puo Leggere': 'Si', 'Puo Scrivere': 'No', 'Amministratore': 'No' },
   
  ];
  modalRef: any;

  public objectEntries(obj: any): [string, any][] {
    return Object.entries(obj);  // Preserves key order
    
  }
  name: string = 'User';

  constructor(private modalService: NgbModal) {}

  openModal(content: TemplateRef<any>) {
      // Store the reference of the opened modal
      this.modalRef = this.modalService.open(content, { centered: true });
    }
}
