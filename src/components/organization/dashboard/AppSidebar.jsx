import * as React from "react";
import { ChevronRight } from "lucide-react";
import { VersionSwitcher } from "./version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";

// Sample data
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        { title: "Installation", url: "#" },
        { title: "Project Structure", url: "#" },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [{ title: "Contribution Guide", url: "#" }],
    },
  ],
};

export default function AppSidebar({ isMobile = false, ...props }) {
  return (
    <Sidebar {...props} className="w-64">
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>

      <SidebarContent className={isMobile ? "gap-0 block" : "gap-0 block md:block"}>
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight
                    className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}