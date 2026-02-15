import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useBluetooth } from '@/context/BluetoothContext';
import {
    Activity,
    Heart,
    Wind,
    Thermometer,
    TrendingUp,
    TrendingDown,
    Minus,
    AlertCircle,
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface HealthProps {
    onBack?: () => void;
}

export const Health = ({ onBack }: HealthProps) => {
    const { isConnected, connectedDevice } = useBluetooth();

    // Simulated health metrics
    const [heartRate, setHeartRate] = useState(72);
    const [respiratoryRate, setRespiratoryRate] = useState(16);
    const [oxygenLevel, setOxygenLevel] = useState(98);
    const [skinTemperature, setSkinTemperature] = useState(36.5);
    const [muscleActivity, setMuscleActivity] = useState(45);
    const [airflowRate, setAirflowRate] = useState(18);

    // Simulate real-time health data
    useEffect(() => {
        if (!isConnected) return;

        const interval = setInterval(() => {
            setHeartRate(prev => Math.max(60, Math.min(90, prev + (Math.random() - 0.5) * 3)));
            setRespiratoryRate(prev => Math.max(12, Math.min(20, prev + (Math.random() - 0.5) * 1)));
            setOxygenLevel(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
            setSkinTemperature(prev => Math.max(35.5, Math.min(37.5, prev + (Math.random() - 0.5) * 0.2)));
            setMuscleActivity(prev => Math.max(20, Math.min(80, prev + (Math.random() - 0.5) * 8)));
            setAirflowRate(prev => Math.max(10, Math.min(30, prev + (Math.random() - 0.5) * 3)));
        }, 2000);

        return () => clearInterval(interval);
    }, [isConnected]);

    const getTrend = (value: number, baseline: number) => {
        if (value > baseline + 2) return <TrendingUp className="text-orange-500" size={16} />;
        if (value < baseline - 2) return <TrendingDown className="text-blue-500" size={16} />;
        return <Minus className="text-muted-foreground" size={16} />;
    };

    const getStatus = (metric: string, value: number) => {
        const ranges: Record<string, { min: number; max: number }> = {
            heartRate: { min: 60, max: 100 },
            respiratoryRate: { min: 12, max: 20 },
            oxygenLevel: { min: 95, max: 100 },
            skinTemperature: { min: 35.5, max: 37.5 },
        };

        const range = ranges[metric];
        if (!range) return 'normal';

        if (value >= range.min && value <= range.max) return 'normal';
        return 'warning';
    };

    if (!isConnected) {
        return (
            <div className="space-y-6 animate-fade-in">
                {onBack && (
                    <Button variant="ghost" onClick={onBack} className="gap-2">
                        <ArrowLeft size={18} />
                        Back
                    </Button>
                )}

                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <AlertCircle size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Device Connected</h3>
                    <p className="text-muted-foreground max-w-sm">
                        Connect your AVC mask to view real-time health monitoring data.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            {onBack && (
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Button>
            )}

            <div>
                <h1 className="text-3xl font-bold tracking-tight">Health Monitoring</h1>
                <p className="text-muted-foreground">Real-time vital signs and sensor data from your {connectedDevice?.name}</p>
            </div>

            {/* Status Overview */}
            <Card className="glass-card border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="text-green-500" size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold">All Systems Normal</h3>
                            <p className="text-sm text-muted-foreground">Your vital signs are within healthy ranges</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Vital Signs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Heart Rate */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Heart size={16} className="text-red-500" />
                            Heart Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{Math.round(heartRate)}</span>
                            <span className="text-sm text-muted-foreground">bpm</span>
                            {getTrend(heartRate, 72)}
                        </div>
                        <Progress value={(heartRate / 100) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Normal: 60-100 bpm</p>
                    </CardContent>
                </Card>

                {/* Respiratory Rate */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Wind size={16} className="text-cyan-500" />
                            Respiratory Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{Math.round(respiratoryRate)}</span>
                            <span className="text-sm text-muted-foreground">breaths/min</span>
                            {getTrend(respiratoryRate, 16)}
                        </div>
                        <Progress value={(respiratoryRate / 20) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Normal: 12-20 breaths/min</p>
                    </CardContent>
                </Card>

                {/* Oxygen Level */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Activity size={16} className="text-blue-500" />
                            Blood Oxygen (SpO2)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{Math.round(oxygenLevel)}</span>
                            <span className="text-sm text-muted-foreground">%</span>
                            {getTrend(oxygenLevel, 98)}
                        </div>
                        <Progress value={oxygenLevel} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Normal: 95-100%</p>
                    </CardContent>
                </Card>

                {/* Skin Temperature */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Thermometer size={16} className="text-orange-500" />
                            Skin Temperature
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{skinTemperature.toFixed(1)}</span>
                            <span className="text-sm text-muted-foreground">°C</span>
                            {getTrend(skinTemperature, 36.5)}
                        </div>
                        <Progress value={((skinTemperature - 35) / 3) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Normal: 35.5-37.5°C</p>
                    </CardContent>
                </Card>

                {/* Muscle Activity */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Activity size={16} className="text-purple-500" />
                            Muscle Activity (EMG)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{Math.round(muscleActivity)}</span>
                            <span className="text-sm text-muted-foreground">% active</span>
                        </div>
                        <Progress value={muscleActivity} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Facial muscle engagement</p>
                    </CardContent>
                </Card>

                {/* Airflow Rate */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                            <Wind size={16} className="text-green-500" />
                            Airflow Rate
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-3xl font-bold">{Math.round(airflowRate)}</span>
                            <span className="text-sm text-muted-foreground">L/min</span>
                        </div>
                        <Progress value={(airflowRate / 30) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Breathing airflow volume</p>
                    </CardContent>
                </Card>
            </div>

            {/* Sensor Status */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Sensor Status</CardTitle>
                    <CardDescription>Real-time sensor performance and accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-medium">EMG Sensors</span>
                            </div>
                            <span className="text-sm text-muted-foreground">98% accuracy</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-medium">Airflow Sensors</span>
                            </div>
                            <span className="text-sm text-muted-foreground">99% accuracy</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-medium">Temperature Sensors</span>
                            </div>
                            <span className="text-sm text-muted-foreground">100% accuracy</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Health Impact Assessment */}
            <Card className="glass-card border-blue-500/20 bg-blue-500/5">
                <CardHeader>
                    <CardTitle>Mask Impact Assessment</CardTitle>
                    <CardDescription>How the AVC mask is affecting your health metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium">Breathing Comfort</p>
                            <p className="text-sm text-muted-foreground">Airflow sensors indicate normal breathing patterns with no obstruction</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium">Cardiovascular Response</p>
                            <p className="text-sm text-muted-foreground">Heart rate remains stable, indicating good mask tolerance</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium">Skin Contact</p>
                            <p className="text-sm text-muted-foreground">Temperature readings show no signs of irritation or discomfort</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-green-500 mt-0.5" size={20} />
                        <div>
                            <p className="font-medium">Muscle Fatigue</p>
                            <p className="text-sm text-muted-foreground">EMG readings within normal range - no excessive muscle strain detected</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
