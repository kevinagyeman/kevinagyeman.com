import { auth } from "@/firebase";
import { User } from "firebase/auth";
import { ReactElement, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
