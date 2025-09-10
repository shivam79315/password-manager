import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { db } from "../../firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function SuperAdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const docRef = doc(db, "superAdmins", email);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        setError("Super admin not found.");
        setLoading(false);
        return;
      }
      const data = docSnap.data();
      const hashedInput = CryptoJS.MD5(password).toString();
      if (hashedInput === data.password) {
        // Successful login: redirect to dashboard
        localStorage.setItem("isSuperAdmin", "true");
        navigate("/sa/dashboard", { replace: true });
      } else {
        setError("Incorrect password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Super Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
