"use client";

// Create Sidebar component
export const Sidebar = () => {
  return (
    <aside className="fixed top-20 left-0 w-64 h-full bg-primary-foreground shadow-md hidden lg:block border border-gray-300">
      <div className="p-4 flex flex-col w-full">
        <h1 className="text-xl font-bold text-primary-background">Sidebar</h1>
      </div>
    </aside>
  );
};
