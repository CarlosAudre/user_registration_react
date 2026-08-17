import { Search, Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { AlertMessage } from "../components/AlertMessage";
import { UpdateUserForm } from "../components/form/UpdateUserForm";
import toast from "react-hot-toast";
export function Home() {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [deleteUserAlertVisibility, setDeleteUserAlertVisibility] =
    useState(false);

  const [updateUserFormVisibility, setUpdateUserFormVisibility] =
    useState(false);

  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  useEffect(() => {
    async function getAllUsers() {
      const token = localStorage.getItem("token");

      const response = await fetch(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUsers(data);
    }

    getAllUsers();
  }, []);

  console.log(users);

  async function updateUser(id) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${url}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        return null;
      }

      const data = await response.json();

      toast.success("Usuário atualizado com sucesso!");
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async function handleOnSubmit(id) {
    console.log("ID recebido no submit:", id);
    const data = await updateUser(id);

    if (!data) return;

    setUsers((users) =>
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              name: data.name,
              email: data.email,
              phone: data.phone,
              birthDate: data.birthDate,
            }
          : user,
      ),
    );

    setUpdateUserFormVisibility(false);
  }

  async function deleteUser(id) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${url}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
        return false;
      }

      toast.success("Usuário excluído com sucesso!");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async function handleOnDelete(id) {
    const response = await deleteUser(id);

    if (!response) return;

    setUsers((users) => users.filter((user) => user.id !== id));
  }

  return (
    <div className="flex flex-col p-5 gap-10">
      <header className="flex flex-col gap-3 justify-center">
        <h1 className="text-3xl">Gerenciamento de Usuário</h1>
        <p className="text-gray-400">
          Visualize, edite e exclua usuários do sistema
        </p>
      </header>

      <main className="flex flex-col bg-[#0F1A2B] p-3 rounded-2xl mx-auto w-full gap-5 ">
        <div className="flex flex-col md:w-xl gap-3 items-start">
          <h2 className="text-xl ">Usuários cadastrados</h2>
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-6" />

            <input
              type="text"
              placeholder="Buscar por nome ou CPF"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300/30 rounded-lg"
            />
          </div>
        </div>

        {updateUserFormVisibility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <UpdateUserForm
              form={form}
              setForm={setForm}
              handleSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit(userId);
              }}
            />
          </div>
        )}

        {deleteUserAlertVisibility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <AlertMessage
              title="Deseja deletar esse usuário"
              handleOnCancel={() =>
                setDeleteUserAlertVisibility((prev) => !prev)
              }
              handleOnSubmit={() => {
                handleOnDelete(userId);
                setDeleteUserAlertVisibility((prev) => !prev);
              }}
            />
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="bg-[#172238] text-gray-200">
              <tr>
                <th className="px-5 py-4">Nome</th>
                <th className="px-5 py-4">E-mail</th>
                <th className="px-5 py-4">CPF</th>
                <th className="px-5 py-4">Telefone</th>
                <th className="px-5 py-4">Data de Cadastro</th>
                <th className="px-5 py-4">Data de Nascimento</th>
                <th className="px-5 py-4 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {users
                .filter(
                  (user) =>
                    user.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase()) ||
                    user.cpf.includes(search),
                )
                .map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-700 hover:bg-slate-800/50"
                  >
                    <td className="px-5 py-4">{user.name}</td>
                    <td className="px-5 py-4">{user.email}</td>
                    <td className="px-5 py-4">{user.cpf}</td>
                    <td className="px-5 py-4">{user.phone}</td>
                    <td className="px-5 py-4">{user.createDate}</td>
                    <td className="px-5 py-4">{user.birthDate}</td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          className="border border-indigo-500 text-indigo-400 p-2 rounded cursor-pointer
                       hover:bg-indigo-500/30"
                          onClick={() => {
                            console.log("ID do usuário:", user.id);
                            setUserId(user.id);
                            setForm({
                              name: user.name,
                              email: user.email,
                              phone: user.phone,
                              birthDate: user.birthDate,
                            });
                            setUpdateUserFormVisibility((prev) => !prev);
                          }}
                        >
                          <Pencil />
                        </button>

                        <button
                          className="border border-red-500 text-red-400 p-2 rounded cursor-pointer
                      hover:bg-red-500/30 "
                          onClick={() => {
                            setUserId(user.id);
                            setDeleteUserAlertVisibility((prev) => !prev);
                          }}
                        >
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
