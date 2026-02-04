import { useState, useMemo } from 'react';
import { Device, Alert, DeviceCategory } from '@/types/device';
import { mockDevices, mockAlerts } from '@/data/mockDevices';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { DeviceGrid } from '@/components/device/DeviceGrid';
import { DeviceDetailModal } from '@/components/device/DeviceDetailModal';
import { AlertsPanel } from '@/components/alerts/AlertsPanel';
import { AddDeviceModal } from '@/components/addDevice/AddDeviceModal';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { StatsOverview } from '@/components/stats/StatsOverview';
import { Controls } from './Controls';
import { Settings } from './Settings';
import { About } from './About';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<DeviceCategory | 'all'>('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [addDeviceOpen, setAddDeviceOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || device.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [devices, searchQuery, categoryFilter]);

  const unreadAlerts = alerts.filter(a => !a.read).length;

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleDisconnect = (deviceId: string) => {
    setDevices(devices.map(d => 
      d.id === deviceId 
        ? { ...d, status: 'disconnected' as const, signalStrength: 0 }
        : d
    ));
    setSelectedDevice(null);
    toast({
      title: 'Device Disconnected',
      description: 'The device has been disconnected successfully.',
    });
  };

  const handleConnect = (deviceId: string) => {
    setDevices(devices.map(d => 
      d.id === deviceId 
        ? { ...d, status: 'connected' as const, signalStrength: 85, lastConnected: new Date() }
        : d
    ));
    toast({
      title: 'Device Connected',
      description: 'The device has been connected successfully.',
    });
  };

  const handleRemove = (deviceId: string) => {
    setDevices(devices.filter(d => d.id !== deviceId));
    setSelectedDevice(null);
    toast({
      title: 'Device Removed',
      description: 'The device has been removed from your list.',
      variant: 'destructive',
    });
  };

  const handleAddDevice = (newDevice: { name: string; category: DeviceCategory; macAddress: string }) => {
    const device: Device = {
      id: `dev-${Date.now()}`,
      name: newDevice.name,
      category: newDevice.category,
      status: 'connected',
      signalStrength: 85,
      sensorAccuracy: 95,
      bandwidth: { upload: 1, download: 5, used: 0, limit: 500 },
      lastConnected: new Date(),
      healthStatus: 'good',
      capabilities: ['Basic'],
      macAddress: newDevice.macAddress,
    };
    setDevices([device, ...devices]);
    toast({
      title: 'Device Added',
      description: `${newDevice.name} has been added successfully.`,
    });
  };

  const handleMarkAlertAsRead = (alertId: string) => {
    setAlerts(alerts.map(a => 
      a.id === alertId ? { ...a, read: true } : a
    ));
  };

  const handleClearAlerts = () => {
    setAlerts([]);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'controls':
        return <Controls />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return (
          <>
            <StatsOverview devices={devices} alertCount={unreadAlerts} />
            <DeviceGrid 
              devices={filteredDevices} 
              onDeviceClick={handleDeviceClick} 
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadAlerts={unreadAlerts}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onAlertsClick={() => setAlertsOpen(true)}
        onSettingsClick={() => setCurrentPage('settings')}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeFilter={categoryFilter}
        onFilterChange={setCategoryFilter}
        onAddDevice={() => setAddDeviceOpen(true)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main className="lg:ml-64 pt-6 pb-24 px-4 lg:px-6">
        {renderContent()}
      </main>

      <DeviceDetailModal
        device={selectedDevice}
        open={!!selectedDevice}
        onOpenChange={(open) => !open && setSelectedDevice(null)}
        onDisconnect={handleDisconnect}
        onConnect={handleConnect}
        onRemove={handleRemove}
      />

      <AlertsPanel
        alerts={alerts}
        open={alertsOpen}
        onOpenChange={setAlertsOpen}
        onMarkAsRead={handleMarkAlertAsRead}
        onClearAll={handleClearAlerts}
      />

      <AddDeviceModal
        open={addDeviceOpen}
        onOpenChange={setAddDeviceOpen}
        onAddDevice={handleAddDevice}
      />

      <AIAssistant />
    </div>
  );
};
