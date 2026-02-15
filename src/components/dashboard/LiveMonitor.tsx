import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Wind, Mic2, Waves } from 'lucide-react';
import { Device } from '@/types/device';

interface LiveMonitorProps {
    device: Device;
}

export const LiveMonitor = ({ device }: LiveMonitorProps) => {
    const [dataPoints, setDataPoints] = useState<number[]>(new Array(20).fill(0));
    const [muscleLevel, setMuscleLevel] = useState(0);
    const [airflowLevel, setAirflowLevel] = useState(0);

    // Simulate measurement updates
    useEffect(() => {
        if (device.status !== 'connected') {
            setDataPoints(new Array(20).fill(0));
            setMuscleLevel(0);
            setAirflowLevel(0);
            return;
        }

        const interval = setInterval(() => {
            // Random data simulation
            const newMuscle = Math.random() * 100;
            const newAirflow = Math.random() * 100;

            setMuscleLevel(prev => prev + (newMuscle - prev) * 0.15); // Smooth transition
            setAirflowLevel(prev => prev + (newAirflow - prev) * 0.15);

            setDataPoints(prev => {
                const next = [...prev.slice(1), newMuscle];
                return next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [device.status]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Voice Visualizer */}
            <Card className="col-span-1 lg:col-span-2 glass-card border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <Mic2 size={20} />
                        Voice Output Simulation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-end justify-center gap-1">
                        {dataPoints.map((value, i) => (
                            <div
                                key={i}
                                className="bg-gradient-to-t from-primary/20 to-primary rounded-t-sm transition-all ease-out min-w-[2px]"
                                style={{
                                    height: `${Math.max(10, value)}%`,
                                    opacity: 0.4 + (i / 20) * 0.6,
                                    width: `${3 + Math.sin(i * 0.5) * 1.5}px`,
                                    transitionDuration: `${250 + Math.random() * 100}ms`
                                }}
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-muted-foreground font-mono">
                        <span>Lat: {12 + Math.floor(Math.random() * 5)}ms</span>
                        <span>Hz: 44.1k</span>
                        <span>AI: Active</span>
                    </div>
                </CardContent>
            </Card>

            {/* Sensor Stats */}
            <div className="space-y-6">
                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Activity size={16} />
                            Muscle Sensor
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{Math.round(muscleLevel)}</span>
                            <span className="text-xs text-muted-foreground">% activity</span>
                        </div>
                        <div className="h-2 mt-3 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-100"
                                style={{ width: `${muscleLevel}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Wind size={16} />
                            Airflow Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{Math.round(airflowLevel)}</span>
                            <span className="text-xs text-muted-foreground">L/min</span>
                        </div>
                        <div className="h-2 mt-3 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cyan-500 transition-all duration-100"
                                style={{ width: `${airflowLevel}%` }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card bg-secondary/30">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Waves className="text-primary" />
                                <div className="space-y-1">
                                    <p className="font-medium text-sm">AI Model</p>
                                    <p className="text-xs text-muted-foreground">Dual-Layer Neural Net</p>
                                </div>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
