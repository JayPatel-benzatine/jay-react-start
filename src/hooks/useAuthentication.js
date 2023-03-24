import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useAuthentication = () => {
  const authentication = useContext(AuthContext);
  return authentication;
};

export default useAuthentication;
