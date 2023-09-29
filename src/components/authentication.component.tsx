import { AuthContext } from "@/context/auth-context";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";

const Authentication = () => {
  const user = useContext(AuthContext);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "kevinagyemann@gmail.com",
        "f$S{7D,-C4'2ke",
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>NON SEI LOGGATO</h1>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export default Authentication;
