import { cn } from '@/lib/utils';
import { ConnectionStatus } from '@/types/device';

interface StatusIndicatorProps {
  status: ConnectionStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<ConnectionStatus, { color: string; label: string; glow: string }> = {
  connected: { 
    color: 'bg-success', 
    label: 'Connected',
    glow: 'shadow-[0_0_8px_hsl(var(--success)/0.6)]'
  },
  disconnected: { 
    color: 'bg-muted-foreground', 
    label: 'Disconnected',
    glow: ''
  },
  connecting: { 
    color: 'bg-warning', 
    label: 'Connecting',
    glow: 'shadow-[0_0_8px_hsl(var(--warning)/0.6)]'
  },
  error: { 
    color: 'bg-destructive', 
    label: 'Error',
    glow: 'shadow-[0_0_8px_hsl(var(--destructive)/0.6)]'
  },
};

const sizeConfig = {
  sm: 'h-2 w-2',
  md: 'h-3 w-3',
  lg: 'h-4 w-4',
};

export const StatusIndicator = ({ 
  status, 
  size = 'md', 
  showLabel = false,
  className 
}: StatusIndicatorProps) => {
  const config = statusConfig[status];
  
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div 
          className={cn(
            'rounded-full',
            sizeConfig[size],
            config.color,
            config.glow,
            status === 'connecting' && 'animate-pulse'
          )}
        />
        {status === 'connected' && (
          <div 
            className={cn(
              'absolute inset-0 rounded-full animate-ping',
              config.color,
              'opacity-40'
            )}
          />
        )}
      </div>
      {showLabel && (
        <span className="text-sm text-muted-foreground">{config.label}</span>
      )}
    </div>
  );
};
