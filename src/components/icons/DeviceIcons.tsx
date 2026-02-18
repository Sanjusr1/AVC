import {
  Wifi,
  Speaker,
  Watch,
  LucideIcon,
  Network
} from 'lucide-react';
import { DeviceCategory } from '@/types/device';

export const deviceIconMap: Record<DeviceCategory, LucideIcon> = {
  wifi: Wifi,
  speaker: Speaker,
  wearable: Watch,
  'avc-mask': Network, // More appropriate for intelligent web app
  'avc-pro': Network,
  'avc-lite': Network,
};

export const getDeviceIcon = (category: DeviceCategory): LucideIcon => {
  return deviceIconMap[category] || Wifi;
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
