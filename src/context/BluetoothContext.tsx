import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Device, DeviceCategory } from '@/types/device';
import { useToast } from '@/hooks/use-toast';

interface BluetoothContextType {
    isScanning: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    connectedDevice: Device | null;
    scannedDevices: Device[];
    signalStrength: number;
    batteryLevel: number;
    latency: number; // ms
    startScan: () => void;
    stopScan: () => void;
    connectToDevice: (device: Device) => Promise<void>;
    disconnectDevice: () => void;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(undefined);

export const useBluetooth = () => {
    const context = useContext(BluetoothContext);
    if (!context) {
        throw new Error('useBluetooth must be used within a BluetoothProvider');
    }
    return context;
};

// Mock devices for simulation
const MOCK_AVC_DEVICES: Device[] = [
    {
        id: 'avc-beryl-01',
        name: 'AVC Beryl X1',
        category: 'avc-mask',
        status: 'disconnected',
        signalStrength: 88,
        sensorAccuracy: 98,
        bandwidth: { upload: 2, download: 5, used: 120, limit: 1000 },
        lastConnected: new Date(),
        healthStatus: 'excellent',
        capabilities: ['Speech Synthesis', 'Muscle Sensing', 'Airflow Analysis'],
        macAddress: 'AV:C1:BE:RY:L1:01',
        batteryLevel: 92
    },
    {
        id: 'avc-pro-02',
        name: 'AVC Pro Mask',
        category: 'avc-pro',
        status: 'disconnected',
        signalStrength: 76,
        sensorAccuracy: 99,
        bandwidth: { upload: 3, download: 8, used: 450, limit: 2000 },
        lastConnected: new Date(),
        healthStatus: 'good',
        capabilities: ['Speech Synthesis', 'Pro Audio', 'Muscle Sensing', 'Airflow Analysis'],
        macAddress: 'AV:C1:PR:O2:M3:02',
        batteryLevel: 65
    },
    {
        id: 'avc-audio-03',
        name: 'AVC Audio Hub',
        category: 'speaker',
        status: 'disconnected',
        signalStrength: 92,
        sensorAccuracy: 100,
        bandwidth: { upload: 5, download: 12, used: 800, limit: 5000 },
        lastConnected: new Date(),
        healthStatus: 'excellent',
        capabilities: ['Spatial Audio', 'Echo Cancellation', 'Multi-room Sync'],
        macAddress: 'AV:C1:AU:D1:O3:99',
        batteryLevel: 100
    },
    {
        id: 'avc-beryl-02',
        name: 'AVC Beryl X2 (Beta)',
        category: 'avc-mask',
        status: 'disconnected',
        signalStrength: 65,
        sensorAccuracy: 95,
        bandwidth: { upload: 4, download: 10, used: 50, limit: 1500 },
        lastConnected: new Date(),
        healthStatus: 'excellent',
        capabilities: ['Ultra-Low Latency', 'Neural Synthesis', 'Muscle Sensing'],
        macAddress: 'AV:C2:BE:RY:L2:02',
        batteryLevel: 85
    }
];

export const BluetoothProvider = ({ children }: { children: ReactNode }) => {
    const { toast } = useToast();
    const [isScanning, setIsScanning] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
    const [scannedDevices, setScannedDevices] = useState<Device[]>([]);

    // Real-time metrics
    const [signalStrength, setSignalStrength] = useState(0);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [latency, setLatency] = useState(0);

    // Simulation interval ref
    const simulationRef = React.useRef<NodeJS.Timeout | null>(null);

    // Start scanning simulation
    const startScan = () => {
        setIsScanning(true);
        setScannedDevices([]);

        // Simulate finding devices one by one
        MOCK_AVC_DEVICES.forEach((device, index) => {
            setTimeout(() => {
                setScannedDevices(prev => {
                    if (prev.find(d => d.id === device.id)) return prev;
                    return [...prev, device];
                });
            }, (3000 * (index + 1)) + (Math.random() * 2000));
        });

        // Stop scanning automatically after 20 seconds
        setTimeout(() => {
            setIsScanning(false);
        }, 20000);
    };

    const stopScan = () => {
        setIsScanning(false);
    };

    const connectToDevice = async (device: Device) => {
        setIsScanning(false);
        setIsConnecting(true);

        // Simulate connection handshake delay (10 seconds)
        await new Promise(resolve => setTimeout(resolve, 10000));

        setConnectedDevice({ ...device, status: 'connected' });
        setIsConnected(true);
        setIsConnecting(false);

        // Initial values
        setSignalStrength(device.signalStrength || 85);
        setBatteryLevel(device.batteryLevel || 80);
        setLatency(12);

        toast({
            title: "Device Connected",
            description: `Successfully connected to ${device.name}`,
        });

        startMonitoring();
    };

    const disconnectDevice = () => {
        if (connectedDevice) {
            toast({
                title: "Device Disconnected",
                description: `Disconnected from ${connectedDevice.name}`,
                variant: "destructive"
            });
        }

        setConnectedDevice(null);
        setIsConnected(false);
        setSignalStrength(0);
        setBatteryLevel(0);
        setLatency(0);

        if (simulationRef.current) {
            clearInterval(simulationRef.current);
            simulationRef.current = null;
        }
    };

    // Simulate real-time fluctuations when connected
    const startMonitoring = () => {
        if (simulationRef.current) clearInterval(simulationRef.current);

        simulationRef.current = setInterval(() => {
            // Fluctuate signal strength +/- 5
            setSignalStrength(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                return Math.min(100, Math.max(0, prev + change));
            });

            // Slowly drain battery (very slowly)
            setBatteryLevel(prev => {
                if (Math.random() > 0.95) return Math.max(0, prev - 1);
                return prev;
            });

            // Fluctuate latency 5-25ms
            setLatency(10 + Math.floor(Math.random() * 15));
        }, 2000);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (simulationRef.current) clearInterval(simulationRef.current);
        };
    }, []);

    return (
        <BluetoothContext.Provider
            value={{
                isScanning,
                isConnected,
                isConnecting,
                connectedDevice,
                scannedDevices,
                signalStrength,
                batteryLevel,
                latency,
                startScan,
                stopScan,
                connectToDevice,
                disconnectDevice
            }}
        >
            {children}
        </BluetoothContext.Provider>
    );
};
