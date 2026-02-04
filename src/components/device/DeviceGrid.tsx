import { Device } from '@/types/device';
import { DeviceCard } from './DeviceCard';
import { cn } from '@/lib/utils';

interface DeviceGridProps {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
  className?: string;
}

export const DeviceGrid = ({ devices, onDeviceClick, className }: DeviceGridProps) => {
  if (devices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <span className="text-2xl">📡</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No devices found</h3>
        <p className="text-muted-foreground max-w-sm">
          Try adjusting your search or filters, or scan for nearby devices to connect.
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
      className
    )}>
      {devices.map((device, index) => (
        <DeviceCard
          key={device.id}
          device={device}
          onClick={() => onDeviceClick(device)}
          index={index}
        />
      ))}
    </div>
  );
};
