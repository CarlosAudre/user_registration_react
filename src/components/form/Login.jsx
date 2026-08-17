import { TextField } from "../TextField";
import { Mail, Lock } from "lucide-react";
import { SubmitButton } from "./SubmitButton";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        return toast.error(error.message ?? "Erro ao fazer login.");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
      return;
    } catch (err) {
      console.log(err);
      toast.error("Erro ao fazer login.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-5 bg-[#1A222F] rounded-2xl gap-5">
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-indigo-400 text-2xl">Entrar</h2>
        <p className="text-gray-400">Informe suas credenciais para continuar</p>
      </div>

      <div className="flex flex-col gap-3">
        <TextField
          title="E-mail"
          type="mail"
          placeholder="seu@email.com"
          icon1={Mail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          title="Senha"
          type="password"
          placeholder="**********"
          icon1={Lock}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <SubmitButton title="Entrar"/>

      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-400">Ainda não tem uma conta?</p>
        <a className="text-indigo-500" href="/register">
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
