import { useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [desc, setDesc] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const orgId = uuidv4();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(collection(db, "organizations"), where("email", "==", email));
      const existing = await getDocs(q);
      if (!existing.empty) {
        setError("Email already registered. Please log in.");
        setLoading(false);
        return;
      }

      const hashedPassword = CryptoJS.SHA256(password).toString();

      await addDoc(collection(db, "organizations"), {
        orgId,
        email,
        password: hashedPassword,
        orgName,
        desc,
        logoUrl,
        createdBy,
        isActive: "active",
        createdAt: new Date(),
      });

      navigate("/org/dashboard"); 
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Organization Admin Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="url"
              placeholder="Logo URL"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="text"
              placeholder="Created By"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}