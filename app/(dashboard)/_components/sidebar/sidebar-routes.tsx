"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instructor/course",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isInstructorPage = pathname?.includes("/instructor");
  console.log(isInstructorPage);
  const routes = isInstructorPage ? instructorRoutes : guestRoutes;

  return (
    <div className="p-4 flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
