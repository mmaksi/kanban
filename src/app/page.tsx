"use client";

import { Navbar } from "@/components/Navbar.component";
import { Sidebar } from "@/components/Sidebar.component";
import Image from "next/image";

import LogoDark from "../../public/logo-light.svg";

export default function Home() {
  return (
    <div>
      <div className="sidebar__logo">
        <Image src={LogoDark} alt="logo" width={152.528} height={25.224} />
      </div>
      <Navbar />
      <Sidebar />
    </div>
  );
}
