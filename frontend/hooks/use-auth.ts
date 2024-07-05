import { AuthContextType } from "@/lib/types";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useDebugValue } from "react";

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  useDebugValue(context?.auth, (auth) => (auth?.email ? "Logged In" : "Logged Out"));
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
};

export default useAuth;
