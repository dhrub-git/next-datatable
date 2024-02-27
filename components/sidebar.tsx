"use client";

import React from 'react'
import { Nav } from './ui/nav';
import {
    AlertCircle,
    Archive,
    ArchiveX,
    File,
    Inbox,
    MessagesSquare,
    PenBox,
    Search,
    Send,
    ShoppingCart,
    Trash2,
    Users2,
    GanttChart,
    Users,
    Cog,
    ShieldEllipsis,
    BellRing,
    HelpCircle
  } from "lucide-react"
  
type Props = {}

export default function sidebar({}: Props) {
  return (
    <div>
        <Nav
            isCollapsed={false}
            links={[
              {
                title: "Customers",
                label: "",
                icon: Users,
                variant: "default",
              },
              {
                title: "Projects",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Settings",
                label: "",
                icon: Cog,
                variant: "ghost",
              },
              {
                title: "Admin",
                label: "",
                icon: ShieldEllipsis,
                variant: "ghost",
              },
              {
                title: "Notifications",
                label: "",
                icon: BellRing,
                variant: "ghost",
              },
              {
                title: "Help",
                label: "",
                icon: HelpCircle,
                variant: "ghost",
              },
            ]}
          />
    </div>
  )
}
