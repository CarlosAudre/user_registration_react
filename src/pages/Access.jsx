import { Users } from "lucide-react";
import { Login } from "../components/form/Login";
import { useLocation } from "react-router-dom";
import { Register } from "../components/form/Register";
export function Access() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex flex-col mx-auto justify-center md:w-2xl p-5 gap-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <Users className="text-indigo-400 w-15 h-15" />
        <h1 className="font-semibold text-2xl">Sistema de Usuários</h1>
        <p className="text-gray-400">
          Gerencie usuários de forma simples e eficiente
        </p>
      </div>
      {path === "/register" ? <Register/> : <Login/>}
    </div>
  );
}
