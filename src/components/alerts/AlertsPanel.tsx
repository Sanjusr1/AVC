import { Alert } from '@/types/device';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface AlertsPanelProps {
  alerts: Alert[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAsRead: (alertId: string) => void;
  onClearAll: () => void;
}

const alertIcons = {
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const alertColors = {
  warning: 'text-warning bg-warning/10',
  error: 'text-destructive bg-destructive/10',
  info: 'text-primary bg-primary/10',
};

export const AlertsPanel = ({ 
  alerts, 
  open, 
  onOpenChange,
  onMarkAsRead,
  onClearAll
}: AlertsPanelProps) => {
  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell size={20} />
              Alerts
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                  {unreadCount} new
                </span>
              )}
            </SheetTitle>
            {alerts.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll}>
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No alerts</p>
              <p className="text-sm text-muted-foreground/70">All systems operational</p>
            </div>
          ) : (
            alerts.map((alert) => {
              const Icon = alertIcons[alert.type];
              return (
                <div
                  key={alert.id}
                  className={cn(
                    'p-4 rounded-lg border border-border/50 transition-all',
                    !alert.read && 'bg-secondary/50'
                  )}
                  onClick={() => onMarkAsRead(alert.id)}
                >
                  <div className="flex gap-3">
                    <div className={cn('p-2 rounded-lg', alertColors[alert.type])}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
