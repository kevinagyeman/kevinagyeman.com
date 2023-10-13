import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/firebase";
import { AdminData } from "@/types/admin-schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [admin, setUser] = useState<AdminData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, admin.email, admin.password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex  w-full flex-col items-center justify-center align-middle">
        <div className="w-80  rounded-lg border p-6">
          <h3 className="mb-3 scroll-m-20 text-2xl font-semibold tracking-tight">
            Login
          </h3>
          <form onSubmit={(e) => signIn(e)}>
            <div className="mb-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Email"
                name="Email"
                onChange={(e) => {
                  setUser({ ...admin, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-2">
              <Label>password</Label>
              <Input
                type="text"
                placeholder="Password"
                name="Password"
                onChange={(e) => {
                  setUser({ ...admin, password: e.target.value });
                }}
              />
            </div>
            <Button
              type="submit"
              className="mt-3 w-full"
              disabled={!admin.email || !admin.password}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
