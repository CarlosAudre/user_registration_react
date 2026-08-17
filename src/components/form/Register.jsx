import { Mail, Lock, User, Phone, Calendar, FileText, Eye, EyeClosed } from "lucide-react";
import { TextField } from "../TextField";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Register() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    phone: "",
    birthDate: "",
  });

  //handleSubmit()---------------------------------------------------------------------------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();

    if (
      form.name.trim() === "" ||
      form.email.trim() === "" ||
      form.password.trim() === "" ||
      form.birthDate.trim() === "" ||
      form.cpf.trim() === "" ||
      form.phone.trim() === ""
    ) {
      return toast.error("Preencha todos os campos");
    }

    const nameRegex = /^[A-Za-zÀ-ÿ\s]{4,}$/;
    if (!nameRegex.test(form.name.trim())) {
      return toast.error(
        "Nome deve ter pelo menos 4 letras e conter apenas letras",
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return toast.error("Email inválido");
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return toast.info(
        "Senha deve ter 8 caracteres, letra, número e especial",
      );
    }

    const phoneRegex = /^(?:\(?\d{2}\)?[\s-]?)?(?:9\d{4}|\d{4})-?\d{4}$/;
    if (!phoneRegex.test(form.phone)) {
      return toast.error("Telefone inválido");
    }

    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.message);
        return toast.error(error.message ?? "Erro ao fazer cadastro.");
      }

      toast.success("Cadastro realizado com sucesso");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-5 bg-[#1A222F] rounded-2xl gap-5"
    >
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-indigo-400 text-2xl">Cadastre-se</h2>
        <p className="text-gray-400">Informe suas credenciais para continuar</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <TextField
            title="Nome"
            type="text"
            placeholder="Seu nome"
            icon1={User}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <TextField
            title="CPF"
            type="text"
            placeholder="000.000.000-00"
            icon1={FileText}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                cpf: e.target.value,
              }))
            }
          />

          <TextField
            title="Telefone"
            type="tel"
            placeholder="(99) 00000-0000"
            icon1={Phone}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
          />

          <TextField
            title="Data de nascimento"
            type="date"
            icon1={Calendar}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                birthDate: e.target.value,
              }))
            }
          />

          <TextField
            title="E-mail"
            type="email"
            placeholder="seu@email.com"
            icon1={Mail}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <TextField
            title="Senha"
            type="password"
            placeholder="**********"
            icon1={Lock}
            icon2={EyeClosed}
            icon3={Eye}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <SubmitButton title="Criar conta" />

      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-400">Já possui uma conta?</p>
        <a className="text-indigo-500" href="/login">
          Faça Login
        </a>
      </div>
    </form>
  );
}
