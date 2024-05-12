import { Suspense } from "react";
import { Navbar } from "./_components/navbar";
// import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full">
        <Navbar />
        {/* <Suspense fallback={<SidebarSkeleton />}> */}
        <Sidebar />
        {/* </Suspense> */}
        <main className="md:pl-64 pt-10 h-full">{children}</main>
      </div>
    </>
  );
};

export default BrowseLayout;
