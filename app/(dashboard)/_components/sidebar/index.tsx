"use client";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="fixed top-20 left-0 w-64 h-full bg-primary-foreground shadow-md hidden lg:block border border-gray-300">
      <div className="h-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
