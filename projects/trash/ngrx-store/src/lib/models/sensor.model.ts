export interface Sensor {
    id: string;          // Unique identifier for the sensor
    name: string;        // Sensor name
    deviceId: string;    // The ID of the associated device
    type: string;        // Type of sensor (e.g., temperature, humidity)
    value: any;          // Current sensor value
    unit?: string;       // Unit of measurement (e.g., °C, %, etc.)
  }