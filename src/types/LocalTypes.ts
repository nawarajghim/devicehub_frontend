import { Admin } from "./DBTypes";

export type Values = Pick<Admin, "username" | "password">;
export type AuthContextType = {
  role: string | null;
  handleLogin: (values: Values) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
  isLoggedIn: string | null;
};
