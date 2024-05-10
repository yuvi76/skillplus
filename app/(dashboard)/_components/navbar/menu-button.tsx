import { Menu } from "lucide-react";
import React from "react";

export const MenuButton = () => {
  return (
    <button className="lg:hidden">
      <Menu className="h-5 w-5" />
    </button>
  );
};
