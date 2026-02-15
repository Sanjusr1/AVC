import { User, Mail, Shield, Bell, AppWindow, LogOut, ChevronRight, UserCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface ProfileProps {
    onNavigate?: (page: string) => void;
    onSignOut?: () => void;
}

export const Profile = ({ onNavigate, onSignOut }: ProfileProps) => {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
        if (onNavigate) {
            setTimeout(() => onNavigate('dashboard'), 1000);
        }
    };

    const handleSignOut = () => {
        toast({
            title: "Signing Out",
            description: "You have been logged out successfully.",
        });
        if (onSignOut) {
            setTimeout(() => onSignOut(), 500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences.</p>
                </div>
                <Button onClick={handleSave} className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500">
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <Card className="h-fit bg-card/50 backdrop-blur-xl border-border/50">
                    <CardContent className="p-4 space-y-1">
                        {[
                            { icon: User, label: 'Personal Info', active: true },
                            { icon: Shield, label: 'Security' },
                            { icon: Bell, label: 'Notifications' },
                            { icon: AppWindow, label: 'Connected Apps' },
                        ].map((item) => (
                            <Button
                                key={item.label}
                                variant={item.active ? 'secondary' : 'ghost'}
                                className="w-full justify-start gap-3"
                            >
                                <item.icon size={18} className={item.active ? 'text-primary' : ''} />
                                {item.label}
                                {item.active && <ChevronRight size={14} className="ml-auto" />}
                            </Button>
                        ))}
                        <Separator className="my-4" />
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={handleSignOut}
                        >
                            <LogOut size={18} />
                            Sign Out
                        </Button>
                    </CardContent>
                </Card>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="bg-card/50 backdrop-blur-xl border-border/50 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                    <UserCircle size={48} className="text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Sanju Sridugyala</CardTitle>
                                    <CardDescription>Premium Account Member</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="Sanju Sridugyala" className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" defaultValue="sanju@example.com" className="bg-background/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Input id="bio" placeholder="Tell us about yourself..." className="bg-background/50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-xl border-border/50">
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Customize your experience with the AVC ecosystem.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Auto-pairing</p>
                                    <p className="text-xs text-muted-foreground">Automatically connect to known AVC devices.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Experimental Features</p>
                                    <p className="text-xs text-muted-foreground">Try out the latest Beta features early.</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
