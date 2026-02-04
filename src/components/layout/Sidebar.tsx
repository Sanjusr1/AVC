import { 
  LayoutDashboard, 
  Bluetooth, 
  Wifi, 
  Smartphone, 
  Speaker, 
  Watch,
  Settings,
  Sliders,
  Info,
  Plus,
  Keyboard,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DeviceCategory } from '@/types/device';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: DeviceCategory | 'all';
  onFilterChange: (filter: DeviceCategory | 'all') => void;
  onAddDevice: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const categoryFilters: { id: DeviceCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All Devices', icon: LayoutDashboard },
  { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'iot', label: 'IoT', icon: Lightbulb },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
  { id: 'peripheral', label: 'Peripheral', icon: Keyboard },
  { id: 'speaker', label: 'Speaker', icon: Speaker },
  { id: 'wearable', label: 'Wearable', icon: Watch },
];

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'controls', label: 'Controls', icon: Sliders },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'about', label: 'About', icon: Info },
];

export const Sidebar = ({ 
  isOpen, 
  onClose, 
  activeFilter, 
  onFilterChange,
  onAddDevice,
  onNavigate,
  currentPage
}: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        'fixed left-0 top-16 bottom-0 z-40 w-64 border-r border-border/50 bg-sidebar p-4 transition-transform duration-300 lg:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Button 
          variant="glow" 
          className="w-full mb-6"
          onClick={onAddDevice}
        >
          <Plus size={18} />
          Add Device
        </Button>

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                currentPage === item.id && 'bg-secondary'
              )}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon size={18} />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Filter by Category
          </h3>
          <nav className="space-y-1">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 text-sm',
                  activeFilter === filter.id && 'bg-secondary'
                )}
                onClick={() => {
                  onFilterChange(filter.id);
                  onNavigate('dashboard');
                }}
              >
                <filter.icon size={16} />
                {filter.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
