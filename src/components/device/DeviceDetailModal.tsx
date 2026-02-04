import { Device } from '@/types/device';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DeviceIcon } from '@/components/icons/DeviceIcons';
import { StatusIndicator } from './StatusIndicator';
import { SignalStrength } from './SignalStrength';
import { 
  Battery, 
  Activity, 
  Wifi, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Settings,
  Power,
  Trash2,
  RefreshCw,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface DeviceDetailModalProps {
  device: Device | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDisconnect: (deviceId: string) => void;
  onConnect: (deviceId: string) => void;
  onRemove: (deviceId: string) => void;
}

export const DeviceDetailModal = ({ 
  device, 
  open, 
  onOpenChange,
  onDisconnect,
  onConnect,
  onRemove
}: DeviceDetailModalProps) => {
  if (!device) return null;

  const isConnected = device.status === 'connected';
  const bandwidthPercent = (device.bandwidth.used / device.bandwidth.limit) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className={cn(
              'p-3 rounded-xl',
              isConnected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}>
              <DeviceIcon category={device.category} size={28} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{device.name}</DialogTitle>
              <div className="flex items-center gap-3 mt-1">
                <StatusIndicator status={device.status} showLabel size="sm" />
                {isConnected && (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">•</span>
                    <SignalStrength strength={device.signalStrength} />
                    <span className="text-xs text-muted-foreground">{device.signalStrength}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {device.batteryLevel !== undefined && (
                <div className="glass-card p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Battery size={16} />
                    <span className="text-sm">Battery</span>
                  </div>
                  <p className={cn(
                    'text-2xl font-semibold',
                    device.batteryLevel < 20 ? 'text-destructive' : 'text-foreground'
                  )}>
                    {device.batteryLevel}%
                  </p>
                  <Progress value={device.batteryLevel} className="mt-2 h-1.5" />
                </div>
              )}

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Activity size={16} />
                  <span className="text-sm">Sensor Accuracy</span>
                </div>
                <p className="text-2xl font-semibold text-foreground">
                  {device.sensorAccuracy}%
                </p>
                <Progress value={device.sensorAccuracy} className="mt-2 h-1.5" />
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {device.capabilities.map((cap) => (
                  <span 
                    key={cap}
                    className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bandwidth" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <ArrowUpCircle size={16} className="text-primary" />
                  <span className="text-sm">Upload</span>
                </div>
                <p className="text-2xl font-semibold text-foreground">
                  {device.bandwidth.upload} <span className="text-sm text-muted-foreground">Mbps</span>
                </p>
              </div>

              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <ArrowDownCircle size={16} className="text-success" />
                  <span className="text-sm">Download</span>
                </div>
                <p className="text-2xl font-semibold text-foreground">
                  {device.bandwidth.download} <span className="text-sm text-muted-foreground">Mbps</span>
                </p>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Bandwidth Usage</span>
                <span className="text-sm font-medium">
                  {device.bandwidth.used} / {device.bandwidth.limit} MB
                </span>
              </div>
              <Progress 
                value={bandwidthPercent} 
                className={cn(
                  "h-2",
                  bandwidthPercent > 80 && "[&>div]:bg-warning",
                  bandwidthPercent > 95 && "[&>div]:bg-destructive"
                )} 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {(100 - bandwidthPercent).toFixed(1)}% remaining this period
              </p>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="glass-card p-4 space-y-3">
              <DetailRow label="MAC Address" value={device.macAddress} />
              {device.ipAddress && <DetailRow label="IP Address" value={device.ipAddress} />}
              {device.manufacturer && <DetailRow label="Manufacturer" value={device.manufacturer} />}
              {device.model && <DetailRow label="Model" value={device.model} />}
              {device.firmwareVersion && <DetailRow label="Firmware" value={device.firmwareVersion} />}
              <DetailRow 
                label="Last Connected" 
                value={format(device.lastConnected, 'PPpp')} 
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          {isConnected ? (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onDisconnect(device.id)}
            >
              <Power size={16} />
              Disconnect
            </Button>
          ) : (
            <Button 
              variant="glow" 
              className="flex-1"
              onClick={() => onConnect(device.id)}
            >
              <Wifi size={16} />
              Connect
            </Button>
          )}
          <Button variant="secondary">
            <Settings size={16} />
            Configure
          </Button>
          <Button 
            variant="ghost" 
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onRemove(device.id)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-mono text-foreground">{value}</span>
  </div>
);
