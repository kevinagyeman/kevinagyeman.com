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

  const signOut = async () => {
    await auth.signOut();
  };

  if (user) {
    return (
      <>
        <h1>SEI LOGGATO</h1>
        <button onClick={() => signOut()}>logout</button>
      </>
    );
  } else {
    return (
      <>
        <h1>NON SEI LOGGATO</h1>
        <button onClick={() => signIn()}>Login</button>
      </>
    );
  }
};

export default Authentication;
