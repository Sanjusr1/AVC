import { Device, Alert, ConnectionEvent, BandwidthDataPoint } from '@/types/device';

export const mockDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'AirPods Pro',
    category: 'bluetooth',
    status: 'connected',
    signalStrength: 92,
    sensorAccuracy: 98,
    bandwidth: { upload: 0.5, download: 1.2, used: 45, limit: 500 },
    lastConnected: new Date(),
    healthStatus: 'excellent',
    batteryLevel: 78,
    capabilities: ['Audio', 'Spatial Audio', 'Noise Cancellation', 'Transparency Mode'],
    macAddress: 'AA:BB:CC:DD:EE:01',
    manufacturer: 'Apple',
    model: 'AirPods Pro 2nd Gen',
    firmwareVersion: '6.0.1',
  },
  {
    id: 'dev-005',
    name: 'HomePod Mini',
    category: 'speaker',
    status: 'connected',
    signalStrength: 85,
    sensorAccuracy: 94,
    bandwidth: { upload: 2, download: 8, used: 512, limit: 2000 },
    lastConnected: new Date(),
    healthStatus: 'good',
    capabilities: ['Siri', 'HomeKit Hub', 'Intercom', 'Multi-room Audio'],
    macAddress: 'AA:BB:CC:DD:EE:05',
    ipAddress: '192.168.1.103',
    manufacturer: 'Apple',
    model: 'HomePod Mini',
    firmwareVersion: '17.3.1',
  },
  {
    id: 'dev-006',
    name: 'Smart Watch',
    category: 'wearable',
    status: 'disconnected',
    signalStrength: 0,
    sensorAccuracy: 96,
    bandwidth: { upload: 0, download: 0, used: 0, limit: 500 },
    lastConnected: new Date(Date.now() - 3600000 * 2),
    healthStatus: 'fair',
    batteryLevel: 23,
    capabilities: ['Heart Rate', 'GPS', 'ECG', 'Blood Oxygen', 'Sleep Tracking'],
    macAddress: 'AA:BB:CC:DD:EE:06',
    manufacturer: 'Apple',
    model: 'Apple Watch Ultra 2',
    firmwareVersion: 'watchOS 10.4',
  },
];

export const mockAlerts: Alert[] = [];

export const mockConnectionEvents: ConnectionEvent[] = [
  {
    id: 'event-001',
    deviceId: 'dev-001',
    type: 'connect',
    timestamp: new Date(),
    details: 'Device connected successfully',
  },
  {
    id: 'event-002',
    deviceId: 'dev-006',
    type: 'disconnect',
    timestamp: new Date(Date.now() - 3600000 * 2),
    details: 'Device went out of range',
  },
];

export const generateBandwidthHistory = (hours: number = 24): BandwidthDataPoint[] => {
  const data: BandwidthDataPoint[] = [];
  const now = Date.now();

  for (let i = hours; i >= 0; i--) {
    data.push({
      timestamp: new Date(now - i * 3600000),
      upload: Math.random() * 50 + 10,
      download: Math.random() * 150 + 50,
    });
  }

  return data;
};
