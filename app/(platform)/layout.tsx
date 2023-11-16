import { Toaster } from "@/components/ui/toaster";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Toaster />

      {children}
    </main>
  );
};

export default PlatformLayout;
