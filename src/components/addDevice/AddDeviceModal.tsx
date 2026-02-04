import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Radar, Keyboard, Wifi, Bluetooth, Check } from 'lucide-react';
import { DeviceCategory } from '@/types/device';
import { cn } from '@/lib/utils';

interface AddDeviceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDevice: (device: { name: string; category: DeviceCategory; macAddress: string }) => void;
}

const mockScanResults = [
  { id: 'scan-1', name: 'Unknown Speaker', category: 'speaker' as DeviceCategory, signal: 85 },
  { id: 'scan-2', name: 'Smart Bulb', category: 'iot' as DeviceCategory, signal: 72 },
  { id: 'scan-3', name: 'Wireless Mouse', category: 'peripheral' as DeviceCategory, signal: 95 },
];

export const AddDeviceModal = ({ open, onOpenChange, onAddDevice }: AddDeviceModalProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedScanDevice, setSelectedScanDevice] = useState<string | null>(null);
  const [manualForm, setManualForm] = useState({
    name: '',
    category: '' as DeviceCategory | '',
    macAddress: '',
  });

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setSelectedScanDevice(null);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const handleManualSubmit = () => {
    if (manualForm.name && manualForm.category && manualForm.macAddress) {
      onAddDevice({
        name: manualForm.name,
        category: manualForm.category as DeviceCategory,
        macAddress: manualForm.macAddress,
      });
      onOpenChange(false);
      setManualForm({ name: '', category: '', macAddress: '' });
    }
  };

  const handleScanDeviceAdd = () => {
    const device = mockScanResults.find(d => d.id === selectedScanDevice);
    if (device) {
      onAddDevice({
        name: device.name,
        category: device.category,
        macAddress: `AA:BB:CC:DD:${Math.random().toString(16).substr(2, 2).toUpperCase()}:${Math.random().toString(16).substr(2, 2).toUpperCase()}`,
      });
      onOpenChange(false);
      setScanComplete(false);
      setSelectedScanDevice(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle>Add New Device</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="scan" className="mt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="scan" className="gap-2">
              <Radar size={16} />
              Scan
            </TabsTrigger>
            <TabsTrigger value="manual" className="gap-2">
              <Keyboard size={16} />
              Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-4 space-y-4">
            {!scanComplete ? (
              <div className="text-center py-8">
                {isScanning ? (
                  <>
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                      <div className="absolute inset-2 rounded-full border-2 border-primary/50 animate-ping delay-150" />
                      <div className="absolute inset-4 rounded-full border-2 border-primary/70 animate-ping delay-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Radar size={32} className="text-primary animate-pulse" />
                      </div>
                    </div>
                    <p className="text-muted-foreground">Scanning for nearby devices...</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                      <Wifi size={28} className="text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Scan for nearby Bluetooth, Wi-Fi, and IoT devices
                    </p>
                    <Button onClick={handleScan} variant="glow">
                      <Radar size={18} />
                      Start Scanning
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Found {mockScanResults.length} devices nearby
                </p>
                {mockScanResults.map((device) => (
                  <div
                    key={device.id}
                    className={cn(
                      'p-4 rounded-lg border cursor-pointer transition-all',
                      selectedScanDevice === device.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-border/80'
                    )}
                    onClick={() => setSelectedScanDevice(device.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center',
                          selectedScanDevice === device.id ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
                        )}>
                          <Bluetooth size={20} />
                        </div>
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{device.category}</p>
                        </div>
                      </div>
                      {selectedScanDevice === device.id && (
                        <Check size={20} className="text-primary" />
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={handleScan}>
                    Scan Again
                  </Button>
                  <Button 
                    variant="glow" 
                    className="flex-1" 
                    disabled={!selectedScanDevice}
                    onClick={handleScanDeviceAdd}
                  >
                    Add Device
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                placeholder="e.g., Living Room Speaker"
                value={manualForm.name}
                onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={manualForm.category}
                onValueChange={(value) => setManualForm({ ...manualForm, category: value as DeviceCategory })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bluetooth">Bluetooth</SelectItem>
                  <SelectItem value="wifi">Wi-Fi</SelectItem>
                  <SelectItem value="iot">IoT</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="peripheral">Peripheral</SelectItem>
                  <SelectItem value="speaker">Speaker</SelectItem>
                  <SelectItem value="wearable">Wearable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mac">MAC Address</Label>
              <Input
                id="mac"
                placeholder="AA:BB:CC:DD:EE:FF"
                value={manualForm.macAddress}
                onChange={(e) => setManualForm({ ...manualForm, macAddress: e.target.value.toUpperCase() })}
              />
            </div>

            <Button 
              variant="glow" 
              className="w-full mt-4"
              disabled={!manualForm.name || !manualForm.category || !manualForm.macAddress}
              onClick={handleManualSubmit}
            >
              Add Device
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
