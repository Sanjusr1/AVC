import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Radar, Bluetooth, Check, Smartphone, Loader2, RefreshCw } from 'lucide-react';
import { DeviceCategory } from '@/types/device';
import { cn } from '@/lib/utils';
import { useBluetooth } from '@/context/BluetoothContext';

interface AddDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDevice: (device: { name: string; category: DeviceCategory; macAddress: string }) => void;
}

export const AddDeviceModal = ({ open, onOpenChange, onAddDevice }: AddDeviceModalProps) => {
  const {
    startScan,
    stopScan,
    isScanning,
    scannedDevices,
    connectToDevice,
    disconnectDevice,
    isConnecting,
    isConnected,
    connectedDevice
  } = useBluetooth();

  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle modal close
  const handleClose = () => {
    if (isScanning) stopScan();
    onOpenChange(false);
    setShowSuccess(false);
  };

  // Handle success state transition
  useEffect(() => {
    if (isConnected && connectedDevice) {
      onAddDevice({
        name: connectedDevice.name,
        category: connectedDevice.category,
        macAddress: connectedDevice.macAddress
      });
      setShowSuccess(true);
    }
  }, [isConnected, connectedDevice]);

  const handleConnect = async () => {
    const device = scannedDevices.find(d => d.id === selectedDeviceId);
    if (device) {
      await connectToDevice(device);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-card border-border backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Connect AVC Mask</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center space-y-6 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center border-2 border-success/30">
                <Check size={40} className="text-success" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-success">Connected Successfully!</h3>
                <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
                  Your {connectedDevice?.name} is ready. You can now monitor it from the dashboard.
                </p>
              </div>
              <div className="flex flex-col w-full gap-2 pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-success/80 to-emerald-600 hover:from-success hover:to-emerald-700"
                  onClick={handleClose}
                >
                  Manage Device
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                  onClick={() => {
                    setShowSuccess(false);
                    startScan();
                  }}
                >
                  <RefreshCw size={14} />
                  Add More Devices
                </Button>
              </div>
            </div>
          ) : isConnecting ? (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center animate-spin">
                  <Loader2 size={40} className="text-primary" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-medium">Pairing...</h3>
                <p className="text-sm text-muted-foreground">Setting up secure connection</p>
              </div>
            </div>
          ) : isScanning ? (
            <div className="space-y-6">
              {/* Radar Animation */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
                <div className="absolute inset-4 rounded-full border-2 border-primary/40 animate-ping delay-300" />
                <div className="absolute inset-8 rounded-full border-2 border-primary/60 animate-ping delay-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Radar size={48} className="text-primary animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-medium">Searching for devices...</h3>
                <p className="text-sm text-muted-foreground">Keep your mask nearby and powered on</p>
              </div>

              {/* Results List */}
              <div className="space-y-2 mt-4 max-h-[200px] overflow-y-auto pr-2">
                {connectedDevice && (
                  <div className="mb-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">Currently Connected</p>
                    <div className="p-3 rounded-lg border border-primary bg-primary/5 flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-background border border-primary/20">
                          <Bluetooth size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{connectedDevice.name}</p>
                          <p className="text-xs text-success">Connected</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          disconnectDevice();
                        }}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                )}

                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">Devices in Range</p>
                {scannedDevices.length === 0 ? (
                  <p className="text-center text-xs text-muted-foreground py-4">
                    No new devices found yet...
                  </p>
                ) : (
                  scannedDevices
                    .filter(d => d.id !== connectedDevice?.id)
                    .map((device) => (
                      <div
                        key={device.id}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between group",
                          selectedDeviceId === device.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        )}
                        onClick={() => setSelectedDeviceId(device.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-background border border-border">
                            <Bluetooth size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{device.name}</p>
                            <p className="text-xs text-muted-foreground">Signal: {device.signalStrength}%</p>
                          </div>
                        </div>
                        {selectedDeviceId === device.id && (
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    ))
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={stopScan}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  disabled={!selectedDeviceId}
                  onClick={handleConnect}
                >
                  Connect
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-secondary flex items-center justify-center">
                  <Smartphone size={32} className="text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Let's set up your device</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>1. Turn on your AVC Mask</p>
                    <p>2. Hold the power button for 3 seconds</p>
                    <p>3. Wait for the blue LED to blink</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                size="lg"
                onClick={startScan}
              >
                <Bluetooth className="mr-2 h-4 w-4" />
                Start Pairing
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
