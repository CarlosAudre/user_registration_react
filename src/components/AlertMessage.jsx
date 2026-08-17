import { SubmitButton } from "./form/SubmitButton";

export function AlertMessage({ title, handleOnCancel, handleOnSubmit }) {
  return (
    <form
      className="flex bg-black flex-col gap-3 p-8"
      onSubmit={handleOnSubmit}
    >
      <div className="flex items-center justify-center">
          <h1 className="text-2xl text-red-300">Aviso!</h1>
      </div>
      <p className="text-lg">{title}</p>
      <div className="flex gap-3">
        <SubmitButton
          title="Cancelar"
          bg="#111111"
          textColor="text-white"
          hoverBgColor="hover:bg-gray-700"
          borderColor="border-gray-700"
          onClick={handleOnCancel}
        />

        <SubmitButton title="Aceitar" />
      </div>
    </form>
  );
}
