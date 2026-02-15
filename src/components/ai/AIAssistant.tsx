import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Bot, Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Device, Alert } from '@/types/device';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  devices: Device[];
  alerts: Alert[];
}

export const AIAssistant = ({ devices, alerts }: AIAssistantProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AVC Assistant. I can help you manage your connected devices, troubleshoot issues, and optimize your connectivity. How can I help you today?',
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Generate context-aware response
    setTimeout(() => {
      const activeDevices = devices.filter(d => d.status === 'connected');
      const unreadAlerts = alerts.filter(a => !a.read);

      let response = "I'm analyzing your current network state... ";

      if (input.toLowerCase().includes('device') || input.toLowerCase().includes('status')) {
        if (activeDevices.length > 0) {
          response = `You currently have ${activeDevices.length} active device(s): ${activeDevices.map(d => d.name).join(', ')}. Everything looks stable.`;
        } else {
          response = "No devices are currently connected. Would you like me to guide you through the pairing process?";
        }
      } else if (input.toLowerCase().includes('alert') || input.toLowerCase().includes('problem')) {
        if (unreadAlerts.length > 0) {
          response = `I see ${unreadAlerts.length} unread alert(s). The most critical one is: "${unreadAlerts[0].title}". Should I help you resolve this?`;
        } else {
          response = "All systems are nominal. No active alerts or issues detected at this time.";
        }
      } else {
        const responses = [
          `I'm monitoring your ${activeDevices.length} devices. Do you need help with anything specific?`,
          "I can help you optimize your connectivity or troubleshoot signal issues. What's on your mind?",
          "Your current bandwidth usage is stable. Is there a specific device you're concerned about?",
          "I'm here to help you get the most out of your AVC ecosystem. Feel free to ask me anything."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <>
      <Button
        variant="glow"
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 animate-float"
        onClick={() => setOpen(true)}
      >
        <Sparkles size={24} />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
          <SheetHeader className="pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot size={18} className="text-primary" />
              </div>
              AVC Assistant
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary text-secondary-foreground rounded-bl-md'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant={isListening ? 'destructive' : 'outline'}
                size="icon"
                onClick={toggleListening}
                className={cn(isListening && 'animate-pulse')}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send size={18} />
              </Button>
            </div>
            {isListening && (
              <p className="text-xs text-center text-muted-foreground mt-2 animate-pulse">
                Listening...
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
