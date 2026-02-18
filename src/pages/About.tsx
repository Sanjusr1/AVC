import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Smartphone,
  Lightbulb,
  Watch,
  Activity,
  Zap,
  Shield,
  Cpu
} from 'lucide-react';
import { useWifi } from '@/context/WifiContext';

export const About = () => {
  const { isConnected, connectedDevice } = useWifi();

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl pb-10">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Restoring the Power of Voice
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ayu Vani Chakra (AVC) bridges the gap between silence and speech using advanced AI and biosignal processing.
        </p>
      </div>

      {/* Specifications - Two Column Layout (Moved to Top) */}
      {isConnected && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg">
                {connectedDevice ? 'Connected Device' : 'Device Information'}
              </CardTitle>
              <CardDescription>
                {connectedDevice
                  ? `Your ${connectedDevice.name} Details`
                  : 'AVC Beryl X1 Mask Details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Device Name</span>
                  <span className="font-mono">{connectedDevice ? connectedDevice.name : 'AVC Beryl X1'}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Model Number</span>
                  <span className="font-mono">AVC-BX1-2024</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Connectivity</span>
                  <span className="font-mono">WiFi 6 (802.11ax)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-mono text-green-500">Connected</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Firmware Version</span>
                  <span className="font-mono">v2.4.1</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-mono">185g</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg">Technical Specifications</CardTitle>
              <CardDescription>Performance & Hardware Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Battery Life</span>
                  <span className="font-mono">12 Hours (Active)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Charging Time</span>
                  <span className="font-mono">2.5 Hours (USB-C)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Speech Latency</span>
                  <span className="font-mono">&lt; 15ms</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Sensor Type</span>
                  <span className="font-mono">EMG + Airflow</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">AI Model</span>
                  <span className="font-mono">Dual-Layer Neural Net</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Water Resistance</span>
                  <span className="font-mono">IPX4 (Splash-proof)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mission + Technology Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mission Card */}
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="text-primary" size={24} />
              </div>
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">
              We believe that communication is a fundamental human right. For individuals affected by vocal cord paralysis,
              laryngectomy, or other speech impairments, the AVC Beryl mask offers a new lease on life.
            </p>
            <p className="text-muted-foreground text-sm">
              By interpreting subtle muscle movements and airflow patterns, our technology translates intent into
              natural-sounding speech in real-time, allowing you to speak freely once again.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 rounded-lg bg-accent/10">
                <Zap className="text-accent" size={24} />
              </div>
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Activity size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Real-Time Processing</p>
                  <p className="text-xs text-muted-foreground">&lt; 15ms latency</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">AI-Powered</p>
                  <p className="text-xs text-muted-foreground">Adaptive learning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Medical Grade</p>
                  <p className="text-xs text-muted-foreground">IPX4 certified</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Watch size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">12hr Battery</p>
                  <p className="text-xs text-muted-foreground">All-day use</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Smartphone size={20} className="text-cyan-400" />
              Silent Speech
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Proprietary EMG sensors detect sub-vocal muscle activity to synthesize speech without sound.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb size={20} className="text-yellow-400" />
              Adaptive AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our neural engine learns your unique speech patterns over time to improve accuracy and tone.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Watch size={20} className="text-green-400" />
              Health Monitor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Continuous monitoring of respiratory rate and vital signs integrated directly into the mask.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 text-muted-foreground text-sm border-t border-border/50">
        <p className="mb-2">© 2024 Ayu Vani Chakra. Empowering Voices Everywhere.</p>
        <div className="flex justify-center gap-6">
          <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Privacy Policy</Button>
          <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Terms of Service</Button>
          <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">Support</Button>
        </div>
      </div>
    </div>
  );
};
