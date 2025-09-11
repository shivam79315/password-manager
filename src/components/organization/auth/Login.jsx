import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { db } from "../../../firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

import { saveOrganization } from "@/features/organization/organizationSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "organizations"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Account not found. Please register.");
        console.log('Account not found')
      } else {
        const docData = querySnapshot.docs[0].data();
        const hashedPassword = CryptoJS.SHA256(password).toString();
        console.log(docData)
        if (docData.password === hashedPassword) {
          dispatch(saveOrganization({
            orgId : docData.orgId,
            orgEmail : docData.email
          }));
          console.log("Password matched")
          navigate("/org/dashboard");
        } else {
          setError("Invalid password.");
          console.log('Password not matched')
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Organization Admin Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
