import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 opacity-75" />
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-xl shadow-primary/25">
          <Image
            src="/logo/PhotoshopExtension_Image.png"
            alt="HanTech Logo"
            width={48}
            height={48}
            className="object-contain p-2"
            priority
          />
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-lg font-semibold">HanTech</span>
        </div>
        <p className="text-sm text-muted-foreground">Yükleniyor...</p>
      </div>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/60"
            style={{
              animation: "bounce 1s infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </div>
  );
}
