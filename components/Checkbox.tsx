import Icon from "./Icon";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function Checkbox({ checked, onChange, label, id }: CheckboxProps) {
  return (
    <div className="flex gap-3">
      {label && <span className="text-black">{label}</span>}
      <button id={id} className="h-6 w-6 transition-all active:scale-125" onClick={() => onChange(!checked)}>
        <Icon
          icon={checked ? "check_box" : "check_box_outline_blank"}
          className="text-cyan-950 select-none cursor-pointer text-2xl"
        />
      </button>
    </div>
  );
}
