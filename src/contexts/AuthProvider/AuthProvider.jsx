import useAuthStatus from "@/hooks/useAuthStatus/useAuthStatus";
import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { loggedIn, user, checkingStatus, fetchUserData } = useAuthStatus();

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        user,
        checkingStatus,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
