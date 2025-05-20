export interface IoTDevice {
  id: number;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  ipAddress: string;
  firmwareVersion: string;
}
