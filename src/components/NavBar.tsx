import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="relative flex w-full flex-wrap items-center justify-between py-2 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700  lg:py-4 mb-6">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <Link className="ml-2 text-xl text-emerald hover:text-darkEmerald active:text-darkEmerald" href="/">
          Unizen
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
