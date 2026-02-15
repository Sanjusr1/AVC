import {
  Bluetooth,
  Speaker,
  Watch,
  LucideIcon
} from 'lucide-react';
import { DeviceCategory } from '@/types/device';

export const deviceIconMap: Record<DeviceCategory, LucideIcon> = {
  bluetooth: Bluetooth,
  speaker: Speaker,
  wearable: Watch,
  'avc-mask': Bluetooth, // Fallback or specific icon if available
  'avc-pro': Bluetooth,
  'avc-lite': Bluetooth,
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
