import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

export default function SuperAdminDashboard() {
  const [orgName, setOrgName] = useState("");
  const [orgDomain, setOrgDomain] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddOrganization = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orgId = uuidv4();

    try {
      await addDoc(collection(db, "organizations"), {
        orgId,
        orgName,
        orgDomain,
        logoUrl: logoUrl || null,
        createdAt: serverTimestamp(),
        isActive: "active",
        createdBy: currentUser || "unknown",
      });

      // Reset form fields
      setOrgName("");
      setOrgDomain("");
      setLogoUrl("");
      setCurrentUser("");

      setIsDialogOpen(false); 
      setShowSuccessDialog(true); 

      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("Error adding organization:", error);
      alert("Failed to create organization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-muted flex flex-col">
        <header className="p-4 bg-white">
          <h1 className="text-2xl my-4 text-center font-bold">
            Super Admin Dashboard
          </h1>
        </header>

        <main className="flex-1 p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ORG CARD */}
            <Card>
              <CardHeader>
                <CardTitle>Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View, add, or manage organizations here.</p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="mt-4">Add Organization</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Organization</DialogTitle>
                      <DialogDescription>
                        Enter details of the new organization.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddOrganization} className="space-y-4">
                      <div>
                        <Label htmlFor="org-name">Organization Name</Label>
                        <Input
                          id="org-name"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="org-domain">Organization Domain</Label>
                        <Input
                          id="org-domain"
                          value={orgDomain}
                          onChange={(e) => setOrgDomain(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="user-name">User Name</Label>
                        <Input
                          id="user-name"
                          value={currentUser}
                          onChange={(e) => setCurrentUser(e.target.value)}
                          required
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="logo-url">Logo URL (optional)</Label>
                        <Input
                          id="logo-url"
                          value={logoUrl}
                          onChange={(e) => setLogoUrl(e.target.value)}
                          placeholder="https://example.com/logo.png"
                          disabled={loading}
                        />
                      </div>
                      <DialogFooter>
                        <Button type="submit" disabled={loading}>
                          {loading ? "Saving..." : "Save"}
                        </Button>
                        <DialogClose asChild>
                          <Button variant="outline" type="button" disabled={loading}>
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* ADMINS CARD */}
            <Card>
              <CardHeader>
                <CardTitle>Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage organization admins here.</p>
                <Button className="mt-4">View Admins</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Organization Added</AlertDialogTitle>
            <AlertDialogDescription>
              Your new organization has been successfully created.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
