import { useEffect, useState } from 'react';

export const AVCLogo = ({ className = "w-9 h-9" }: { className?: string }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Check initial theme - App defaults to dark mode (no class)
        // Light mode is only active if 'light' class is present
        const isLight = document.documentElement.classList.contains('light');
        setTheme(isLight ? 'light' : 'dark');

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isLight = document.documentElement.classList.contains('light');
                    setTheme(isLight ? 'light' : 'dark');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    return (
        <img
            src={theme === 'dark' ? '/logo_white.jpeg' : '/logo_black.jpeg'}
            alt="AVC Logo"
            className={`rounded-xl shadow-md border border-white/10 hover:shadow-lg transition-all duration-300 ${className}`}
            onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
                console.error("Logo image not found. Expected '/logo_white.jpeg' or '/logo_black.jpeg' in public folder.");
            }}
        />
    );
};
