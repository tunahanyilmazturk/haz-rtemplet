import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-xl transition-opacity hover:opacity-80">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                <Image
                  src="/logo/PhotoshopExtension_Image.png"
                  alt="HanTech Logo"
                  width={32}
                  height={32}
                  className="object-contain p-0.5"
                />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                HanTech
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block lg:w-[1fr]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-md text-center px-8">
            <h2 className="text-3xl font-bold tracking-tight">
              İşinizi HanTech ile büyütün
            </h2>
            <p className="mt-4 text-muted-foreground">
              Güçlü analitik araçları ve otomasyon özellikleri ile işinizi bir sonraki seviyeye taşıyın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
