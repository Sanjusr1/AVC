export type DeviceCategory = 
  | 'bluetooth' 
  | 'wifi' 
  | 'iot' 
  | 'mobile' 
  | 'peripheral' 
  | 'speaker'
  | 'wearable';

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor';

export interface Device {
  id: string;
  name: string;
  category: DeviceCategory;
  status: ConnectionStatus;
  signalStrength: number; // 0-100
  sensorAccuracy: number; // 0-100
  bandwidth: {
    upload: number; // Mbps
    download: number; // Mbps
    used: number; // MB
    limit: number; // MB
  };
  lastConnected: Date;
  healthStatus: HealthStatus;
  batteryLevel?: number; // 0-100
  capabilities: string[];
  macAddress: string;
  ipAddress?: string;
  firmwareVersion?: string;
  manufacturer?: string;
  model?: string;
}

export interface ConnectionEvent {
  id: string;
  deviceId: string;
  type: 'connect' | 'disconnect' | 'error' | 'config_change';
  timestamp: Date;
  details?: string;
}

export interface Alert {
  id: string;
  deviceId: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface BandwidthDataPoint {
  timestamp: Date;
  upload: number;
  download: number;
}
