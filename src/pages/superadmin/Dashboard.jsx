import { useState, useEffect } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrganizations,
  deleteOrganization,
} from "~/features/superadmin/orgSlice";

import AlertDialogComp from "~/components/superadmin/AlertDialogComp";
import OrganizationsList from "~/components/superadmin/OrganizationsList";
import AddOrganizationModal from "~/components/superadmin/AddOrganizationModal";

export default function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const {
    items: organizations,
    loading,
    error,
  } = useSelector((state) => state.organizations);

  useEffect(() => {
    dispatch(fetchOrganizations());
  }, [dispatch]);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-between flex-col h-full">
        <div className="w-full flex justify-between p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Super Admin Dashboard
          </h1>
          {/* Plus Button */}
          <Button
            size="icon"
            className="rounded-full cursor-pointer"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <main className="flex-1">
          <OrganizationsList
            organizations={organizations}
            loading={loading}
            error={error}
            onDelete={(id) => dispatch(deleteOrganization(id))}
          />
        </main>
      </div>

      {/* Modal */}
      <AddOrganizationModal
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        onSuccess={() => {
          dispatch(fetchOrganizations());
          setShowSuccessDialog(true);
        }}
      />

      <AlertDialogComp
        showSuccessDialog={showSuccessDialog}
        setShowSuccessDialog={setShowSuccessDialog}
      />
    </>
  );
}
