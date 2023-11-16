import { Navbar } from "./_components/navbar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
    <div className="mt-24"> {children}</div> 
    </div>
  );
};

export default OrganizationLayout;
