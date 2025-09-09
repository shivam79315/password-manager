import { useState } from "react";
import Login from "../../../../src/components/organization/auth/Login";
import Register from "../../../../src/components/organization/auth/Register";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? "Organization Admin Login" : "Organization Admin Register"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Conditional rendering */}
          {isLogin ? <Login /> : <Register />}

          <div className="mt-4 text-center">
            {isLogin ? (
              <p className="text-sm">
                Don’t have an account?{" "}
                <Button
                  variant="link"
                  className="p-2 text-dark"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </Button>
              </p>
            ) : (
              <p className="text-sm">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-2 text-dark"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </Button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
  );
}