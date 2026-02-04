import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Info, 
  FileText, 
  Github, 
  Bluetooth, 
  Wifi, 
  Smartphone, 
  Speaker, 
  Watch,
  Lightbulb,
  Keyboard,
  ExternalLink,
  Heart
} from 'lucide-react';

const supportedDevices = [
  { icon: Bluetooth, name: 'Bluetooth Devices', description: 'Headphones, speakers, keyboards, mice' },
  { icon: Wifi, name: 'Wi-Fi Devices', description: 'Routers, access points, repeaters' },
  { icon: Lightbulb, name: 'IoT Devices', description: 'Smart lights, thermostats, cameras' },
  { icon: Smartphone, name: 'Mobile Devices', description: 'Phones, tablets, hotspots' },
  { icon: Keyboard, name: 'Peripherals', description: 'Keyboards, mice, game controllers' },
  { icon: Speaker, name: 'Speakers', description: 'Smart speakers, soundbars' },
  { icon: Watch, name: 'Wearables', description: 'Smartwatches, fitness trackers' },
];

export const About = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">About AVC</h1>
        <p className="text-muted-foreground">Adaptive Virtual Connectivity Platform</p>
      </div>

      {/* App Info */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-bold gradient-text">A</span>
            </div>
            <div>
              <CardTitle className="text-xl">AVC Manager</CardTitle>
              <CardDescription>Version 1.0.0</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            AVC is an intelligent device management platform designed to help you monitor, 
            control, and optimize all your connected devices in real-time. Built with security, 
            scalability, and user experience in mind.
          </p>
        </CardContent>
      </Card>

      {/* Supported Devices */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={20} className="text-primary" />
            Supported Devices
          </CardTitle>
          <CardDescription>Device categories compatible with AVC</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supportedDevices.map((device) => (
              <div 
                key={device.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <device.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} className="text-primary" />
            Legal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="terms">
              <AccordionTrigger>User Agreement</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                <p className="mb-4">
                  By using AVC, you agree to our terms of service. This application is provided 
                  "as is" without warranty of any kind. We are committed to protecting your privacy 
                  and handling your data responsibly.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Read Full Terms <ExternalLink size={14} className="ml-1" />
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger>Data Processing Agreement</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                <p className="mb-4">
                  AVC processes device data locally on your device. Connection analytics may be 
                  collected anonymously to improve service quality. You can opt out of data 
                  collection in Settings.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  View Privacy Policy <ExternalLink size={14} className="ml-1" />
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="licenses">
              <AccordionTrigger>Open Source Licenses</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                <p className="mb-4">
                  AVC is built using open-source software. We thank the developers of React, 
                  Tailwind CSS, Radix UI, and many other projects that make this application possible.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  View All Licenses <ExternalLink size={14} className="ml-1" />
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-6 text-muted-foreground text-sm">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-destructive" /> by the AVC Team
        </p>
        <p className="mt-2">© 2024 Adaptive Virtual Connectivity. All rights reserved.</p>
      </div>
    </div>
  );
};
