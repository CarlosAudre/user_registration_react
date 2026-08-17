export function SubmitButton({
  title,
  icon: Icon,
  bg,
  hoverBgColor,
  borderColor,
  hoverText,
  onClick,
  type = "submit",
  rounded = "rounded-md"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex justify-center items-center ${bg ? bg : "bg-[#4C57C2]"} rounded-xl  w-full gap-2 p-2 cursor-pointer
       ${hoverBgColor ? hoverBgColor : "hover:bg-[#4150d1]"} text-white`}
    >
      <span
        className={`font-semibold text-lg `}
      >
        {title}
      </span>

      {Icon && <Icon size={18} />}
    </button>
  );
}
