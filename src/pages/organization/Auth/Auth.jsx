import { useState } from "react";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebase/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState(""); // For registration
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const orgId = uuidv4();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        // ✅ Registration logic
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Optional: check if email already exists
        const q = query(
          collection(db, "organizations"),
          where("email", "==", email)
        );
        const existing = await getDocs(q);
        if (!existing.empty) {
          setError("Email already registered. Please log in.");
          setLoading(false);
          return;
        }

        await addDoc(collection(db, "organizations"), {
          orgId,
          email,
          password: hashedPassword,
          orgName,
          createdAt: new Date(),
        });

        navigate("/dashboard"); // redirect after register
      } else {
        // ✅ Login logic
        const q = query(
          collection(db, "organizations"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Account not found. Please register.");
        } else {
          const docData = querySnapshot.docs[0].data();
          const hashedPassword = CryptoJS.SHA256(password).toString();

          if (docData.password === hashedPassword) {
            navigate("/dashboard"); // success login
            alert('logged in')
          } else {
            setError("Invalid password.");
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-muted">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>
            {isRegister
              ? "Organization Admin Register"
              : "Organization Admin Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <Input
                type="text"
                placeholder="Organization Name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                disabled={loading}
              />
            )}
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
              {loading
                ? isRegister
                  ? "Registering..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
