import { Device, Alert, ConnectionEvent, BandwidthDataPoint } from '@/types/device';

export const mockDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'AVC Pro Mask v2',
    category: 'avc-pro',
    status: 'connected',
    signalStrength: 92,
    sensorAccuracy: 98,
    bandwidth: { upload: 0.5, download: 1.2, used: 45, limit: 500 },
    lastConnected: new Date(),
    healthStatus: 'excellent',
    batteryLevel: 78,
    capabilities: ['Real-time Audio', 'Biometric Sync', 'Noise Cancellation', 'Neural Engine'],
    macAddress: 'AA:BB:CC:DD:EE:01',
    ipAddress: '192.168.1.101',
    manufacturer: 'AVC Technologies',
    model: 'AVC-PRO-02',
    firmwareVersion: '2.1.0',
  },
  {
    id: 'dev-005',
    name: 'AVC Studio Speaker',
    category: 'speaker',
    status: 'connected',
    signalStrength: 85,
    sensorAccuracy: 94,
    bandwidth: { upload: 2, download: 8, used: 512, limit: 2000 },
    lastConnected: new Date(),
    healthStatus: 'good',
    capabilities: ['Lossless Audio', 'Multi-room Sync', 'Voice Control'],
    macAddress: 'AA:BB:CC:DD:EE:05',
    ipAddress: '192.168.1.103',
    manufacturer: 'AVC Technologies',
    model: 'AVC-SPK-MINI',
    firmwareVersion: '1.2.4',
  },
  {
    id: 'dev-006',
    name: 'AVC Lite Mask',
    category: 'avc-lite',
    status: 'disconnected',
    signalStrength: 0,
    sensorAccuracy: 96,
    bandwidth: { upload: 0, download: 0, used: 0, limit: 500 },
    lastConnected: new Date(Date.now() - 3600000 * 2),
    healthStatus: 'fair',
    batteryLevel: 23,
    capabilities: ['Audio Synthesis', 'Basic Biometrics', 'Sleep Mode'],
    macAddress: 'AA:BB:CC:DD:EE:06',
    ipAddress: '192.168.1.105',
    manufacturer: 'AVC Technologies',
    model: 'AVC-LITE-01',
    firmwareVersion: '1.0.5',
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
