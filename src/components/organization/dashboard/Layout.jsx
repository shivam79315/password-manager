import { useContext } from "react";
import { SidebarContext } from "~/components/ui/sidebar";
import AppSidebar from "~/components/organization/dashboard/AppSidebar";
import { SidebarTrigger, SidebarProvider } from "~/components/ui/sidebar";
import UsersTable from "./UsersTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function LayoutContent({ children }) {
  const { state } = useContext(SidebarContext);
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-0" : "w-64"
        } flex-shrink-0`}
      >
        <AppSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 transition-all duration-300">
        <header className="mb-4 flex items-center justify-between">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button><Plus /> Add User</Button>
        </header>

        {/* Users Table */}
        <UsersTable />

        {/* Additional children passed to Layout */}
        {children}
      </main>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
