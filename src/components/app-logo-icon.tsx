export default function AppLogoIcon({ className }: { className?: string }) {
    return (
        <img src='/logo.svg' className={`w-full h-full object-contain object-center ${className}`} />
    );
}
