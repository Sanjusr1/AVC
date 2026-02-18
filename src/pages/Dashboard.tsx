import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Profile } from './Profile';
import { Health } from './Health';
import { DeviceConfiguration } from './DeviceConfiguration';
import { ConnectHero } from '@/components/dashboard/ConnectHero';
import { LiveMonitor } from '@/components/dashboard/LiveMonitor';
import { HealthMonitor } from '@/components/dashboard/HealthMonitor';
import { useWifi } from '@/context/WifiContext';
import { useToast } from '@/hooks/use-toast';
import { Activity } from 'lucide-react';

interface DashboardProps {
  onLogout?: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<DeviceCategory | 'all'>('all');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
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
    setDetailModalOpen(true);
  };

  const { isConnected, connectedDevice, disconnectDevice, connectToDevice: ctxConnect } = useWifi();

  const handleDisconnect = (deviceId: string) => {
    disconnectDevice();
    setDevices(devices.filter(d => d.id !== deviceId));
    setSelectedDevice(null);
    setDetailModalOpen(false);
  };

  const handleConnect = async (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      await ctxConnect(device);
    }
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

  const handleAddDevice = (newDevice: { name: string; category: DeviceCategory; ipAddress: string }) => {
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
      ipAddress: newDevice.ipAddress,
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
      case 'health':
        return <Health onBack={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} onSignOut={onLogout} />;
      case 'configuration':
        return selectedDevice ? (
          <DeviceConfiguration
            device={selectedDevice}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : null;
      default:
        if (!isConnected) {
          return (
            <ConnectHero onConnect={() => setAddDeviceOpen(true)} />
          );
        }

        return (
          <div className="space-y-6">
            <LiveMonitor device={connectedDevice!} />
            <StatsOverview devices={devices} alertCount={unreadAlerts} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              {/* Device Management Section */}
              <div>
                <h3 className="text-lg font-medium mb-3">Device Management</h3>
                <DeviceGrid
                  devices={filteredDevices}
                  onDeviceClick={handleDeviceClick}
                />
              </div>

              {/* Health Manager Section */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <Activity size={20} className="text-primary" />
                  Health Monitoring
                </h3>
                <HealthMonitor />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        unreadAlerts={unreadAlerts}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onAlertsClick={() => setAlertsOpen(true)}
        onSettingsClick={() => setCurrentPage('settings')}
        onProfileClick={() => setCurrentPage('profile')}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
          onAddDevice={() => setAddDeviceOpen(true)}
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />

        <main className="flex-1 pt-6 pb-24 px-4 lg:px-6">
          {renderContent()}
        </main>
      </div>

      <DeviceDetailModal
        device={selectedDevice}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onDisconnect={handleDisconnect}
        onConnect={handleConnect}
        onRemove={handleRemove}
        onConfigure={(device) => {
          setSelectedDevice(device);
          setDetailModalOpen(false);
          setCurrentPage('configuration');
        }}
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

      <AIAssistant devices={devices} alerts={alerts} />
    </div>
  );
};
