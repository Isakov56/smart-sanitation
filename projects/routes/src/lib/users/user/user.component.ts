import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'core';
import { UserModel } from 'shared';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData: UserModel | null = null; // Store the user data here
  userRoles: string[] = []; // Store the user roles here

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  // Map role codes to user-friendly names
  getRoleName(roleCode: string): string {
    const roleMapping: { [key: string]: string } = {
      'COD_01': 'Admin', // Example mappings
      'COD_02': 'User',
      'COD_03': 'Guest',
    };

    return roleMapping[roleCode] || 'Unknown Role'; // Default to 'Unknown Role' if no match
  }

  ngOnInit(): void {
    const rawUserData = this.authService.getUser();
  if (rawUserData) {
    this.userData = {
      ...rawUserData.response,
      role: this.getRoleName(rawUserData.response.role[0].code) // Transform the role if needed
    } as UserModel;

    this.userRoles = rawUserData.response.role.map((role: { code: string }) => this.getRoleName(role.code));
  }
  }
}

