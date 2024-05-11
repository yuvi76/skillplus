"use client";
import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "../sidebar";

export const MenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
