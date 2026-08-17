import { useState } from "react";
import { TextField } from "../TextField";
import { SubmitButton } from "./SubmitButton";
import { Mail, Lock, User, Phone, Calendar, FileText } from "lucide-react";

export function UpdateUserForm({ form, setForm, handleSubmit }) {
  return (
    <form
      className="flex flex-col p-5 bg-[#1A222F] rounded-2xl gap-5 w-full md:w-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center text-center">
        <h2 className="text-indigo-400 text-2xl">Atualizar usuário</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <TextField
            title="Nome"
            type="text"
            placeholder="Seu nome"
            icon1={User}
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <TextField
            title="Telefone"
            type="tel"
            placeholder="(99) 00000-0000"
            icon1={Phone}
            value={form.phone}
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
            value={form.birthDate}
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
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <SubmitButton title="Atualizar dados" />
    </form>
  );
}
