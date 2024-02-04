import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { loggedIn, user, checkingStatus } = useAuthStatus();

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        checkingStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
