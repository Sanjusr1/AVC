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
  Info,
  Speaker,
  Smartphone,
  Heart,
  User,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BrainCircuit } from 'lucide-react';

interface DeviceDetailModalProps {
  device: Device | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDisconnect: (deviceId: string) => void;
  onConnect: (deviceId: string) => void;
  onRemove: (deviceId: string) => void;
  onConfigure: (device: Device) => void;
}

export const DeviceDetailModal = ({
  device,
  open,
  onOpenChange,
  onDisconnect,
  onConnect,
  onRemove,
  onConfigure
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
          <TabsList className="w-full grid grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="bandwidth">Data</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
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

          <TabsContent value="config" className="space-y-6 mt-4">
            <div className="glass-card p-4 space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <BrainCircuit size={18} className="text-primary" />
                AI Model Configuration
              </h4>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ai-model" className="text-base">High-Fidelity Synthesis</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable advanced neural rendering for more natural voice output.
                    <br /><span className="text-yellow-500/80">Uses more battery.</span>
                  </p>
                </div>
                <Switch id="ai-model" />
              </div>

              <div className="pt-2 border-t border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm">Voice Preset</Label>
                  <span className="text-xs text-muted-foreground">Custom-01</span>
                </div>
                <div className="flex gap-2">
                  {['Natural', 'Professional', 'Soft'].map((preset) => (
                    <Button key={preset} variant="outline" size="sm" className="flex-1 text-xs h-8">
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-4 space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                Sensor Calibration
              </h4>
              <p className="text-xs text-muted-foreground">
                Recalibrate muscle sensors for optimal accuracy. Recommended after putting on the mask.
              </p>

              <Button className="w-full" variant="secondary">
                <RefreshCw size={16} className="mr-2" />
                Start Calibration Sequence
              </Button>

              <div className="flex justify-between text-xs text-muted-foreground pt-2">
                <span>Last calibrated: 2 hours ago</span>
                <span className="text-success">Status: Optimal</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4 mt-4">
            <div className="glass-card p-4">
              <h4 className="font-medium flex items-center gap-2 mb-4">
                <Speaker size={18} className="text-primary" />
                Sound Output Controls
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col gap-3 border-primary bg-primary/10 hover:bg-primary/20 transition-all"
                >
                  <Smartphone size={32} className="text-primary" />
                  <div className="text-center">
                    <span className="block font-medium">Mobile</span>
                    <span className="text-xs text-primary/80">Active Output</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col gap-3 hover:bg-muted transition-all"
                >
                  <Speaker size={32} className="text-muted-foreground" />
                  <div className="text-center">
                    <span className="block font-medium text-muted-foreground">Bluetooth Speaker</span>
                    <span className="text-xs text-muted-foreground">Tap to connect</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="glass-card p-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Volume Enhancer</h4>
              <div className="flex items-center gap-4">
                <Speaker size={16} className="text-muted-foreground" />
                <Progress value={75} className="h-2" />
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-4">
            <div className="glass-card p-4">
              <h4 className="font-medium flex items-center gap-2 mb-6">
                <Heart size={18} className="text-primary" />
                Health Tracking
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-secondary/20 border border-border/50 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-rose-500/10 rounded-full text-rose-500 mb-1">
                    <Heart size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">78</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">BPM</div>
                  </div>
                </div>
                <div className="bg-secondary/20 border border-border/50 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-full text-orange-500 mb-1">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Low</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Stress</div>
                  </div>
                </div>
                <div className="bg-secondary/20 border border-border/50 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-full text-blue-500 mb-1">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Energy</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-border/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall User Status</span>
                  <span className="text-sm text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
                </div>
                <Progress value={92} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Biometrics indicate user is in good condition for extended device usage.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="glass-card p-4 space-y-3">
              <DetailRow label="MAC Address" value={device.macAddress} />
              <DetailRow label="Serial Number" value="AVC-X1-88239-L" />
              {device.ipAddress && <DetailRow label="IP Address" value={device.ipAddress} />}
              {device.manufacturer && <DetailRow label="Manufacturer" value={device.manufacturer} />}
              {device.model && <DetailRow label="Model" value={device.model} />}
              {device.firmwareVersion && <DetailRow label="Firmware" value={device.firmwareVersion} />}
              <DetailRow
                label="Last Connected"
                value={format(device.lastConnected, 'PPpp')}
              />
              <DetailRow label="Uptime" value="14h 23m" />
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
          <Button variant="secondary" onClick={() => onConfigure(device)}>
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
