import { useContext } from "react";
import { userContext } from "./UserContext";

export const useUser = () => useContext(userContext)