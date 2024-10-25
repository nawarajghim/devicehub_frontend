import { Admin } from "./DBTypes";

export type Values = Pick<Admin, "username" | "password">;
export type AuthContextType = {
  role: string | null;
  handleLogin: (values: Values) => void;
  handleLogout: () => void;
  isLoggedIn: string | null;
  handleChangePassword: (password: string) => void;
};
