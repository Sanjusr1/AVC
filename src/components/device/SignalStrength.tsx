import { cn } from '@/lib/utils';

interface SignalStrengthProps {
  strength: number;
  className?: string;
}

export const SignalStrength = ({ strength, className }: SignalStrengthProps) => {
  const bars = 4;
  const activeBar = Math.ceil((strength / 100) * bars);
  
  const getBarColor = (barIndex: number) => {
    if (barIndex > activeBar) return 'bg-muted';
    if (strength >= 75) return 'bg-success';
    if (strength >= 50) return 'bg-warning';
    if (strength >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className={cn('flex items-end gap-0.5', className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1 rounded-full transition-all duration-300',
            getBarColor(i + 1)
          )}
          style={{ height: `${(i + 1) * 4 + 4}px` }}
        />
      ))}
    </div>
  );
};
