// data.model.ts

export interface DevicesItem {
    id: string;       // Unique identifier for the item
    name: string;     // Name of the item
    description?: string;  // Optional field for additional details
    createdAt: Date;  // Date when the item was created
    updatedAt?: Date; // Optional field for last updated time
  }

export interface SensorsItem {
    id: string;       // Unique identifier for the item
    name: string;     // Name of the item
    description?: string;  // Optional field for additional details
    createdAt: Date;  // Date when the item was created
    updatedAt?: Date; // Optional field for last updated time
  }
  