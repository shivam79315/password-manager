import * as React from "react"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = uuidv4();

    try {
      await addDoc(collection(db, "users"), {
        userId,
        email,
        name,
        createdAt: serverTimestamp(),
      });

      // reset form
      setEmail("");
      setName("");

      setIsOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Label htmlFor="org-email">Organization Email</Label>
            <Input
              id="org-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div>
            <Label htmlFor="org-desc">Organization Description</Label>
            <Input
              id="org-desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
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
    </>
  );
}