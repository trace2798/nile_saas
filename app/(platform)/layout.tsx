import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Toaster />
      <ModalProvider/>
      {children}
    </main>
  );
};

export default PlatformLayout;
