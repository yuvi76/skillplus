"use client";
import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";
import { MenuButton } from "./menu-button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-49 px-2 lg:px-4 flex items-center justify-between shadow-md">
      <MenuButton />
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
