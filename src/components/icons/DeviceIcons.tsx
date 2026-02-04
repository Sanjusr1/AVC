import { 
  Bluetooth, 
  Wifi, 
  Smartphone, 
  Speaker, 
  Watch, 
  Keyboard,
  Router,
  Lightbulb,
  Camera,
  LucideIcon
} from 'lucide-react';
import { DeviceCategory } from '@/types/device';

export const deviceIconMap: Record<DeviceCategory, LucideIcon> = {
  bluetooth: Bluetooth,
  wifi: Router,
  iot: Lightbulb,
  mobile: Smartphone,
  peripheral: Keyboard,
  speaker: Speaker,
  wearable: Watch,
};

export const getDeviceIcon = (category: DeviceCategory): LucideIcon => {
  return deviceIconMap[category] || Bluetooth;
};

interface DeviceIconProps {
  category: DeviceCategory;
  className?: string;
  size?: number;
}

export const DeviceIcon = ({ category, className, size = 24 }: DeviceIconProps) => {
  const Icon = getDeviceIcon(category);
  return <Icon className={className} size={size} />;
};
