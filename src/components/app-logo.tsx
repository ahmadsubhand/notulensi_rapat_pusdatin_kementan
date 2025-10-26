import AppLogoIcon from './app-logo-icon';

export default function AppLogo({ fullText=false } : { fullText?:boolean }) {
    return (
        <>
            <div className="flex size-9 rounded-md">
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {fullText ? 'Pusat Data dan Sistem Informasi Pertanian' : 'Pusdatin'}
                </span>
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Kementerian Pertanian
                </span>
            </div>
        </>
    );
}
