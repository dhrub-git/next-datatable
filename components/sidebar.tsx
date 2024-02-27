"use client";

import React from 'react'
import { Nav } from './ui/nav';
import {
    File,
    Users,
    Cog,
    ShieldEllipsis,
    BellRing,
    HelpCircle,
    ChevronRight,
    LayoutDashboard
  } from "lucide-react"
import { Separator } from './ui/separator';
import { Button } from './ui/button';

import {
  useWindowWidth
} from '@react-hook/window-size'
  
type Props = {}

export default function sidebar({}: Props) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const onlyWidth = useWindowWidth();
  const isMobile = onlyWidth < 768;
 

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

    
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      {!isMobile && (
        <div className='absolute right-[-20px] top-7]'>
          <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar}>
            <ChevronRight />
          </Button>
        </div>
      )}

        <Separator />
        <Nav
            isCollapsed={isMobile ? true : isCollapsed}
            links={[
              {
                title: "Dashboard",
                label: "",
                icon: LayoutDashboard,
                variant: "ghost",
                href: "/",
              },
              {
                title: "Customers",
                label: "",
                icon: Users,
                variant: "ghost",
                href: "/customers",
              },
              {
                title: "Projects",
                label: "9",
                icon: File,
                variant: "default",
                href: "/projects",
              },
              {
                title: "Settings",
                label: "",
                icon: Cog,
                variant: "ghost",
                href: "/settings",
              },
              {
                title: "Admin",
                label: "",
                icon: ShieldEllipsis,
                variant: "ghost",
                href: "/admin",
              },
              {
                title: "Notifications",
                label: "",
                icon: BellRing,
                variant: "ghost",
                href: "/notifications",
              },
              {
                title: "Help",
                label: "",
                icon: HelpCircle,
                variant: "ghost",
                href: "/help",
              },
            ]}
          />
          <Separator />
    </div>
  )
}
