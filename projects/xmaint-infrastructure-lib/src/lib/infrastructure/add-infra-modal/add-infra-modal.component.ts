import { Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { MatRadioGroup } from '@angular/material/radio';
import { MatRadioButton } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-add-infra-modal',
  standalone: true,
  imports: [MatFormField, MatAutocompleteModule, MatInputModule, CommonModule, MatRadioGroup, MatRadioButton, MatCheckbox, MatSlideToggle],
  templateUrl: './add-infra-modal.component.html',
  styleUrl: './add-infra-modal.component.css'
})
export class AddInfraModalComponent implements OnInit{
  constructor(private modalService: NgbModal) {} 
  ngOnInit(): void {
    
  }
  close() {
    this.modalService.dismissAll();  // Close modal
  }
}
