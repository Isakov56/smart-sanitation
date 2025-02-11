import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'shared';
import { AddAssetModalComponent } from './add-asset-modal/add-asset-modal.component';

@Component({
  selector: 'lib-asset',
  standalone: true,
  imports: [
    MatIcon,
    NgbDropdownModule,
    MatFormField,
    MatInputModule,
    MatAutocompleteModule,
    CommonModule,
    MatRadioModule,
    CardComponent,
    MatSlideToggle,
    RouterModule,
    
  ],
  templateUrl: './asset.component.html',
  styleUrl: './asset.component.css',
})
export class AssetComponent implements OnInit{
  dropdownOpen = false;
    cards: any[] = [];
  
    constructor(private modalService: NgbModal) {}
  
    // Open the modal when the button is clicked
    openModal() {
      const modalRef = this.modalService.open(AddAssetModalComponent, { size: 'lg' });
      modalRef.result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed ${reason}`);
        }
      );
    }
  
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }

      filterToggle(event: Event){
        event.stopPropagation(); // Prevent the click event from propagating immediately
      this.dropdownOpen = !this.dropdownOpen;
    
      // Delay the outside click listener to ensure the dropdown toggle is processed first
      setTimeout(() => {
        document.addEventListener('click', this.onClickOutside.bind(this));
      });
      }
    
      // Detect clicks anywhere on the document
      @HostListener('document:click', ['$event'])
      onClickOutside(event: Event) {
        const dropdownElement = document.getElementById('myDropdown');
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        this.dropdownOpen = false;
        document.removeEventListener('click', this.onClickOutside.bind(this)); // Remove listener when dropdown is closed
      }
      }
  
    ngOnInit(): void {
      this.generateCards(9)
    }
    generateCards(count: number): void {
      const sampleCard = {
        title: 'Shiba Inu',
        subtitle: 'Dog Breed',
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        alt: 'Photo of a Shiba Inu',
        content: '',
      };
  
      this.cards = Array.from({ length: count }, () => ({ ...sampleCard }));
    }
}
