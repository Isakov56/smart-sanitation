export interface DataState {
  // State for devices
  loadingDevices: boolean; // Whether devices are being loaded
  deviceIds: string[]; // Array of device IDs
  deviceEntities: { [id: string]: any }; // Map of devices by ID
  deviceError: string | null; // Error message for devices, if any

  // State for sensors
  loadingSensors: boolean; // Whether sensors are being loaded
  sensorIds: string[]; // Array of sensor IDs
  sensorEntities: { [id: string]: any }; // Map of sensors by ID
  sensorError: string | null; // Error message for sensors, if any
}

// Initial state for the DataState
export const initialDataState: DataState = {
  // Initial state for devices
  loadingDevices: false,
  deviceIds: [],
  deviceEntities: {},
  deviceError: null,

  // Initial state for sensors
  loadingSensors: false,
  sensorIds: [],
  sensorEntities: {},
  sensorError: null,
};
