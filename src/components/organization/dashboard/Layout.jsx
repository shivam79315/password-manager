import { useContext, useState } from "react";
import { toast } from "sonner";
import { SidebarContext } from "~/components/ui/sidebar";
import AppSidebar from "~/components/organization/dashboard/AppSidebar";
import { SidebarTrigger, SidebarProvider } from "~/components/ui/sidebar";
import UsersTable from "./UsersTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModalForm } from "@/components/common/ModalForm";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addOrgUser } from "@/features/organization/organizationSlice";

function LayoutContent({ children }) {
  const dispatch = useDispatch();
  const { state } = useContext(SidebarContext);
  const isCollapsed = state === "collapsed";
  const [modal, setModal] = useState(false);

  const isMobile = useIsMobile();
  const openForm = () => {
    setModal(true);
  };
  const closeForm = () => setModal(false);

  const orgData = useSelector((state) => state.organization.orgData);

  const handleAddUser = async (data) => {
    const orgId = orgData.orgId;
    try {
      await dispatch(addOrgUser({ orgId, userData: data })).unwrap();
      toast.success("User added successfully 🚀");
    } catch (err) {
      toast.error("Failed to add user ❌");
      console.log(err)
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div
        className={`transition-[width] duration-300 flex-shrink-0 ${
          isMobile ? "hidden" : isCollapsed ? "w-0" : "w-64"
        }`}
      >
        <AppSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 h-screen p-4 transition-all duration-300 w-full">
        <header className="mb-4 flex items-center justify-between">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <Button
            variant="outline"
            onClick={() => openForm()}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add User
          </Button>
        </header>

        {/* Users Table */}
        <UsersTable />

        {modal && (
          <ModalForm
            title="Add User"
            fields={[
              {
                label: "Name",
                type: "text",
                id: "name",
                placeholder: "Enter your name here",
              },
              {
                label: "Email",
                type: "email",
                id: "email",
                placeholder: "Enter your email here",
              },
              {
                label: "Role",
                type: "select",
                id: "role",
                options: [
                  { value: "viewer", label: "Viewer" },
                  { value: "editor", label: "Editor" },
                ],
              },
              {
                label: "Password",
                type: "password",
                id: "password",
                placeholder: "Enter your password here",
              },
            ]}
            isOpen={modal}
            onClose={closeForm}
            onSubmit={async (data) => {
              await handleAddUser(data);
              closeForm();
            }}
          />
        )}

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
