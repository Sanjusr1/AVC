import { Button } from '@/components/ui/button';
import { Bluetooth, Mic } from 'lucide-react';

interface ConnectHeroProps {
    onConnect: () => void;
}

export const ConnectHero = ({ onConnect }: ConnectHeroProps) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-fade-in">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-card to-background border border-border flex items-center justify-center shadow-2xl">
                    <Mic size={48} className="text-primary" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-3 -right-5 w-12 h-12 rounded-xl bg-secondary/80 backdrop-blur-md flex items-center justify-center border border-border/50 animate-float delay-100">
                    <Bluetooth size={20} className="text-blue-400" />
                </div>
            </div>

            <div className="max-w-md space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">
                    <span className="gradient-text">Connect Your Voice</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Pair your Ayu Vani Chakra mask to start speaking naturally with AI-powered speech restoration.
                </p>
            </div>

            <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                onClick={onConnect}
            >
                <Bluetooth className="mr-2" />
                Connect AVC Mask
            </Button>
        </div>
    );
};
