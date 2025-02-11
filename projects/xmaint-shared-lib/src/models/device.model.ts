import { Sensor } from "./sensor.model";

export interface Device {
    id: string;          // Unique identifier for the device
    name: string;        // Device name
    location?: string;   // Optional: Device location
    status?: string;     // Optional: Device status (e.g., online/offline)
    sensors?: Sensor[];  // Associated sensors (populated after binding)
  }
  