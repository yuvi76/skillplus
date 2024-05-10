import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
// import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="h-full">
        {/* <Suspense fallback={<SidebarSkeleton />}> */}
        <Sidebar />
        {/* </Suspense> */}
      </div>
    </>
  );
};

export default BrowseLayout;
