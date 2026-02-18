import { Bell, Search, Settings, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useWifi } from '@/context/WifiContext';
import { AVCLogo } from '@/components/ui/avc-logo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  unreadAlerts: number;
  onMenuClick: () => void;
  onAlertsClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export const Header = ({
  searchQuery,
  onSearchChange,
  unreadAlerts,
  onMenuClick,
  onAlertsClick,
  onSettingsClick,
  onProfileClick,
}: HeaderProps) => {
  const { isConnected, batteryLevel } = useWifi();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </Button>

        <div className="flex items-center gap-3">
          <AVCLogo className="w-9 h-9" />
          <span className="font-bold text-lg hidden sm:block gradient-text">AVC</span>
        </div>

        <div className="flex-1 max-w-md mx-auto flex items-center gap-4">
          {isConnected && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full animate-pulse bg-success" />
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                {`Connected • ${batteryLevel}%`}
              </span>
            </div>
          )}

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-secondary/50 border-border/50 focus:bg-secondary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onAlertsClick}
          >
            <Bell size={20} />
            {unreadAlerts > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
              >
                {unreadAlerts > 9 ? '9+' : unreadAlerts}
              </Badge>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
          >
            <Settings size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onProfileClick}
          >
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
