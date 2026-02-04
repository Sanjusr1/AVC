import { Device } from '@/types/device';
import { Wifi, WifiOff, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsOverviewProps {
  devices: Device[];
  alertCount: number;
}

export const StatsOverview = ({ devices, alertCount }: StatsOverviewProps) => {
  const connectedCount = devices.filter(d => d.status === 'connected').length;
  const disconnectedCount = devices.filter(d => d.status === 'disconnected').length;
  const avgAccuracy = devices.length > 0 
    ? Math.round(devices.reduce((acc, d) => acc + d.sensorAccuracy, 0) / devices.length)
    : 0;

  const stats = [
    {
      label: 'Connected',
      value: connectedCount,
      icon: Wifi,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Disconnected',
      value: disconnectedCount,
      icon: WifiOff,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
    },
    {
      label: 'Avg Accuracy',
      value: `${avgAccuracy}%`,
      icon: Activity,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Alerts',
      value: alertCount,
      icon: AlertTriangle,
      color: alertCount > 0 ? 'text-warning' : 'text-muted-foreground',
      bgColor: alertCount > 0 ? 'bg-warning/10' : 'bg-muted',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div 
          key={stat.label} 
          className="glass-card p-4 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', stat.bgColor)}>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
