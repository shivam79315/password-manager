import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/ui/app-sidebar";
import UsersTable from "./UsersTable";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main class="w-full px-6">
        <SidebarTrigger />
        <UsersTable />
      </main>
    </SidebarProvider>
  );
}
