"use client";

import {
  Bell,
  Cog,
  Home,
  List,
  ShieldEllipsis,
  Users,
  HelpCircle,
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "../types";
import { SidebarButton } from "./sidebar-button";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "/", icon: Home },
    { label: "Customers", href: "/customers", icon: Users },
    { label: "Projects", href: "/projects", icon: List },
    {
      href: "/settings",
      icon: Cog,
      label: "Settings",
    },
    {
      href: "/admin",
      icon: ShieldEllipsis,
      label: "Admin",
    },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
    },
    {
      href: "/help",
      icon: HelpCircle,
      label: "Help",
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      {/* <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton> */}
      {/* <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton> */}
    </div>
  ),
};

export function Sidebar() {
  return <SidebarDesktop sidebarItems={sidebarItems} />;
}
