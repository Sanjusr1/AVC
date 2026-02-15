import { useBluetooth } from '@/context/BluetoothContext';
import {
    Activity,
    Heart,
    Wind,
    Thermometer,
    TrendingUp,
    TrendingDown,
    Minus
} from 'lucide-react';
import { useState, useEffect } from 'react';

export const HealthMonitor = () => {
    const { isConnected } = useBluetooth();

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

    if (!isConnected) {
        return null;
    }

    const MetricItem = ({ icon: Icon, label, value, unit, colorClass }: { icon: any, label: string, value: string | number, unit: string, colorClass: string }) => (
        <div className="glass-card p-3 flex flex-col items-center justify-center text-center group hover:bg-primary/10 transition-all duration-300">
            <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10 mb-2 transition-transform group-hover:scale-110`}>
                <Icon size={20} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold font-mono text-foreground">{value}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{unit}</span>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            <MetricItem
                icon={Heart}
                label="Heart Rate"
                value={Math.round(heartRate)}
                unit="bpm"
                colorClass="bg-red-500 text-red-500"
            />
            <MetricItem
                icon={Wind}
                label="Breath Rate"
                value={Math.round(respiratoryRate)}
                unit="br/min"
                colorClass="bg-cyan-500 text-cyan-500"
            />
            <MetricItem
                icon={Activity}
                label="Oxygen"
                value={Math.round(oxygenLevel)}
                unit="%"
                colorClass="bg-blue-500 text-blue-500"
            />
            <MetricItem
                icon={Thermometer}
                label="Skin Temp"
                value={skinTemperature.toFixed(1)}
                unit="°C"
                colorClass="bg-orange-500 text-orange-500"
            />
            <MetricItem
                icon={Activity}
                label="Muscle"
                value={Math.round(muscleActivity)}
                unit="%"
                colorClass="bg-purple-500 text-purple-500"
            />
            <MetricItem
                icon={Wind}
                label="Airflow"
                value={Math.round(airflowRate)}
                unit="L/min"
                colorClass="bg-green-500 text-green-500"
            />
        </div>
    );
};
