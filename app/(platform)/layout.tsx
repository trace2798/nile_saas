import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Toaster />

      {children}
    </main>
  );
};

export default PlatformLayout;
