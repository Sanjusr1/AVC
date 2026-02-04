import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  RefreshCw, 
  Zap, 
  Shield, 
  BellRing, 
  Gauge, 
  Wifi,
  Volume2,
  Battery,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Controls = () => {
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [signalBoost, setSignalBoost] = useState(50);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Controls</h1>
        <p className="text-muted-foreground">Manage device settings and optimizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} className="text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Instant device management actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="glow" 
              className="w-full"
              onClick={handleOptimize}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Zap size={18} />
              )}
              {isOptimizing ? 'Optimizing...' : 'Optimize All Devices'}
            </Button>
            <Button variant="outline" className="w-full">
              <RefreshCw size={18} />
              Refresh Connections
            </Button>
            <Button variant="outline" className="w-full">
              <Shield size={18} />
              Run Security Scan
            </Button>
          </CardContent>
        </Card>

        {/* Automation Settings */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge size={20} className="text-primary" />
              Automation
            </CardTitle>
            <CardDescription>Configure automatic behaviors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="auto-optimize">Auto-Optimize</Label>
                  <p className="text-xs text-muted-foreground">Automatically optimize performance</p>
                </div>
              </div>
              <Switch 
                id="auto-optimize" 
                checked={autoOptimize} 
                onCheckedChange={setAutoOptimize}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Battery size={18} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="power-saving">Power Saving</Label>
                  <p className="text-xs text-muted-foreground">Reduce power consumption</p>
                </div>
              </div>
              <Switch 
                id="power-saving" 
                checked={powerSaving} 
                onCheckedChange={setPowerSaving}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw size={18} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="auto-refresh">Auto-Refresh</Label>
                  <p className="text-xs text-muted-foreground">Update device status automatically</p>
                </div>
              </div>
              <Switch 
                id="auto-refresh" 
                checked={autoRefresh} 
                onCheckedChange={setAutoRefresh}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BellRing size={18} className="text-muted-foreground" />
                <div>
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive device alerts</p>
                </div>
              </div>
              <Switch 
                id="notifications" 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Signal Optimization */}
        <Card className="border-border/50 bg-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi size={20} className="text-primary" />
              Signal Optimization
            </CardTitle>
            <CardDescription>Fine-tune connectivity parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Signal Boost Level</Label>
                <span className="text-sm text-muted-foreground">{signalBoost}%</span>
              </div>
              <Slider
                value={[signalBoost]}
                onValueChange={([value]) => setSignalBoost(value)}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Higher levels may improve range but increase power consumption
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass-card p-4 text-center">
                <Wifi className="w-6 h-6 mx-auto mb-2 text-success" />
                <p className="text-lg font-semibold">Strong</p>
                <p className="text-xs text-muted-foreground">5 devices</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Wifi className="w-6 h-6 mx-auto mb-2 text-warning" />
                <p className="text-lg font-semibold">Medium</p>
                <p className="text-xs text-muted-foreground">2 devices</p>
              </div>
              <div className="glass-card p-4 text-center">
                <Wifi className="w-6 h-6 mx-auto mb-2 text-destructive" />
                <p className="text-lg font-semibold">Weak</p>
                <p className="text-xs text-muted-foreground">1 device</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
