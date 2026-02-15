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
  Lightbulb,
  Home, // Added for new navigationItems
  X, // Added, though not used in the provided snippet, keeping for consistency with the diff
  Layers // Added for new categoryFilters
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DeviceCategory } from '@/types/device';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AVCLogo } from '@/components/ui/avc-logo'; // Added AVCLogo import

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
  { id: 'all', label: 'All Devices', icon: LayoutDashboard }, // Original icon
  { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
  { id: 'speaker', label: 'Speaker', icon: Speaker },
  { id: 'wearable', label: 'Wearable', icon: Watch },
];

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home }, // Changed from LayoutDashboard to Home
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
  const [filterEnabled, setFilterEnabled] = useState(false);
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
        'w-64 border-r border-border/50 bg-sidebar p-4 transition-transform duration-300 overflow-y-auto',
        'lg:block',
        'fixed left-0 top-16 bottom-0 z-40 lg:relative lg:top-0 lg:left-0',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo Section - Only visible on mobile when sidebar is open */}
        <div className="flex items-center gap-3 mb-6 lg:hidden">
          <AVCLogo className="w-8 h-8" />
          <span className="font-bold text-lg gradient-text">AVC</span>
        </div>

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
          <button
            onClick={() => setFilterEnabled(!filterEnabled)}
            className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3 hover:text-foreground transition-colors"
          >
            <span>Filter by Category</span>
            {filterEnabled ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {filterEnabled && (
            <nav className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
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
          )}
        </div>
      </aside>
    </>
  );
};
