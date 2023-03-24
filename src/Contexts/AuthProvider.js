import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const allAuthContext = useAuth();

  return (
    <AuthContext.Provider value={allAuthContext}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
