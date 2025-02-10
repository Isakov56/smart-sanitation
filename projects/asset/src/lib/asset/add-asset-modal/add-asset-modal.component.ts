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
  selector: 'lib-add-asset-modal',
  standalone: true,
  imports: [MatFormField, MatAutocompleteModule, MatInputModule, CommonModule, MatRadioGroup, MatRadioButton, MatCheckbox, MatSlideToggle],
  templateUrl: './add-asset-modal.component.html',
  styleUrl: './add-asset-modal.component.css'
})
export class AddAssetModalComponent implements OnInit{
  constructor(private modalService: NgbModal) {} 
  ngOnInit(): void {
    
  }
  close() {
    this.modalService.dismissAll();  // Close modal
  }
}
