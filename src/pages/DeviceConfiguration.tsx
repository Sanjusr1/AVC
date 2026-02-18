import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    ArrowLeft,
    Settings2,
    Zap,
    Waves,
    BrainCircuit,
    Activity,
    Save,
    RotateCcw,
    AudioLines,
    Microscope
} from 'lucide-react';
import { Device } from '@/types/device';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DeviceConfigurationProps {
    device: Device;
    onBack: () => void;
}

export const DeviceConfiguration = ({ device, onBack }: DeviceConfigurationProps) => {
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    // Configuration states
    const [signalTuning, setSignalTuning] = useState(75);
    const [harmonicGain, setHarmonicGain] = useState(40);
    const [neuralSmoothing, setNeuralSmoothing] = useState(true);
    const [adaptiveNoise, setAdaptiveNoise] = useState(true);
    const [vocalClarity, setVocalClarity] = useState(85);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Configuration Saved",
                description: `Settings for ${device.name} have been updated.`,
            });
            onBack();
        }, 1500);
    };

    const handleReset = () => {
        setSignalTuning(75);
        setHarmonicGain(40);
        setNeuralSmoothing(true);
        setAdaptiveNoise(true);
        setVocalClarity(85);
        toast({
            title: "Settings Reset",
            description: "Configuration reverted to factory defaults.",
        });
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pb-20">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px] -z-10" />

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
                            <ArrowLeft size={20} />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <Settings2 size={20} className="text-primary" />
                                Configure <span className="gradient-text">{device.name}</span>
                            </h1>
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                                IP: {device.ipAddress || '192.168.1.100'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
                            <RotateCcw size={16} className="mr-2" />
                            Reset Defaults
                        </Button>
                        <Button variant="glow" size="sm" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? (
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={16} className="mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container max-w-5xl py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Signal & Hardware Tuning */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="glass-card overflow-hidden">
                            <CardHeader className="border-b border-border/40 bg-primary/5">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Zap size={20} />
                                    Signal Optimization
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-base font-medium">Frequency Precision</Label>
                                        <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{signalTuning}%</span>
                                    </div>
                                    <Slider
                                        value={[signalTuning]}
                                        onValueChange={([val]) => setSignalTuning(val)}
                                        max={100}
                                        step={1}
                                        className="py-4"
                                    />
                                    <p className="text-xs text-muted-foreground italic">
                                        Higher precision balances micro-vibrations for artifact-free rendering.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-base font-medium">Harmonic Gain</Label>
                                        <span className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{harmonicGain} dB</span>
                                    </div>
                                    <Slider
                                        value={[harmonicGain]}
                                        onValueChange={([val]) => setHarmonicGain(val)}
                                        max={60}
                                        step={1}
                                        className="py-4"
                                    />
                                    <p className="text-xs text-muted-foreground italic">
                                        Adjusts the resonance intensity of synthesized vocal harmonics.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card">
                            <CardHeader className="border-b border-border/40 bg-primary/5">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <Waves size={20} />
                                    Advanced Synthesis
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30">
                                    <div className="space-y-1">
                                        <Label className="text-base font-medium">Neural Smoothing</Label>
                                        <p className="text-xs text-muted-foreground">Uses AI to remove robotic undertones in real-time speech.</p>
                                    </div>
                                    <Switch checked={neuralSmoothing} onCheckedChange={setNeuralSmoothing} />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30">
                                    <div className="space-y-1">
                                        <Label className="text-base font-medium">Adaptive Airflow Sync</Label>
                                        <p className="text-xs text-muted-foreground">Matches synth timing with user breathing patterns.</p>
                                    </div>
                                    <Switch checked={adaptiveNoise} onCheckedChange={setAdaptiveNoise} />
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-base font-medium">Vocal Clarity Engine</Label>
                                        <span className="text-sm font-mono text-primary">{vocalClarity}%</span>
                                    </div>
                                    <Slider
                                        value={[vocalClarity]}
                                        onValueChange={([val]) => setVocalClarity(val)}
                                        max={100}
                                        step={1}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Side Info & Status */}
                    <div className="space-y-6">
                        <Card className="glass-card bg-primary/5 border-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                    Current Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span>Latency</span>
                                    <span className="text-success">12ms - Optimal</span>
                                </div>
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span>CPU Load</span>
                                    <span className="text-warning">14% - Normal</span>
                                </div>
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span>Sync Status</span>
                                    <span className="text-primary animate-pulse">Established</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass-card">
                            <CardHeader className="pb-2 border-b border-border/40">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Microscope size={16} className="text-primary" />
                                    Live Diagnostics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span>Neural Feedback</span>
                                        <span className="text-primary font-bold">ACTIVE</span>
                                    </div>
                                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary animate-pulse" style={{ width: '85%' }} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-mono mb-1">
                                        <span>Thermal Buffer</span>
                                        <span className="text-success font-bold">34°C</span>
                                    </div>
                                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-success" style={{ width: '42%' }} />
                                    </div>
                                </div>

                                <div className="p-3 bg-secondary/30 rounded-lg flex items-center gap-3">
                                    <Activity size={20} className="text-primary animate-bounce-subtle" />
                                    <div className="text-[10px] leading-tight text-muted-foreground uppercase tracking-wider">
                                        Calibration sequence <br /> recommended in 4h
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-4 rounded-2xl border border-warning/30 bg-warning/5 text-warning flex gap-3">
                            <BrainCircuit size={40} className="shrink-0" />
                            <div>
                                <p className="text-xs font-bold uppercase mb-1">Hardware Warning</p>
                                <p className="text-[10px] leading-relaxed">
                                    High vocal clarity settings may increase battery drain on legacy Beryl X1 units. Use standard presets for extended outdoor usage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
