import { Device } from '@/types/device';
import { DeviceIcon } from '@/components/icons/DeviceIcons';
import { StatusIndicator } from './StatusIndicator';
import { SignalStrength } from './SignalStrength';
import { Battery, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
  className?: string;
  index?: number;
}

export const DeviceCard = ({ device, onClick, className, index = 0 }: DeviceCardProps) => {
  const isConnected = device.status === 'connected';
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card device-card cursor-pointer p-4 animate-slide-up',
        isConnected && 'ring-1 ring-primary/20',
        className
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'p-2.5 rounded-xl transition-all duration-300',
          isConnected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
        )}>
          <DeviceIcon category={device.category} size={22} />
        </div>
        <StatusIndicator status={device.status} size="sm" />
      </div>
      
      <h3 className="font-semibold text-foreground mb-1 truncate">{device.name}</h3>
      <p className="text-xs text-muted-foreground mb-3 capitalize">{device.category}</p>
      
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-3">
          {isConnected && (
            <SignalStrength strength={device.signalStrength} />
          )}
          {device.batteryLevel !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Battery size={14} className={cn(
                device.batteryLevel < 20 && 'text-destructive'
              )} />
              <span>{device.batteryLevel}%</span>
            </div>
          )}
        </div>
        
        {isConnected && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Activity size={12} className="text-success" />
            <span>{device.sensorAccuracy}%</span>
          </div>
        )}
      </div>
      
      {!isConnected && (
        <p className="text-xs text-muted-foreground mt-2">
          Last seen {formatDistanceToNow(device.lastConnected, { addSuffix: true })}
        </p>
      )}
    </div>
  );
};
