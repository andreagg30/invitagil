import type { MaterialSymbol } from "material-symbols";
import { Link } from "react-router-dom";
import { Icon } from "../../components";

const cards: {
  icon: MaterialSymbol;
  label: string;
  description: string;
  buttonLabel: string;
  path: string;
}[] = [
  {
    icon: "calendar_add_on",
    label: "Crear nuevo evento",
    description:
      "Comienza un evento desde cero y personaliza todos sus detalles.",
    buttonLabel: "Crear evento",
    path: "/new-event",
  },
  {
    icon: "event",
    label: "Mis eventos",
    description:
      "Consulta y administra los eventos que has creado en Invitagil.",
    buttonLabel: "Ver eventos",
    path: "/new-event",
  },
  {
    icon: "mark_as_unread",
    label: "Mis invitaciones",
    description:
      "Diseña, edita y comparte las invitaciones digitales de tus eventos.",
    buttonLabel: "Ver invitaciones",
    path: "/new-event",
  },
  {
    icon: "groups_2",
    label: "Mis invitados",
    description:
      "Organiza tu lista de invitados y da seguimiento a sus confirmaciones.",
    buttonLabel: "Ver invitados",
    path: "/new-event",
  },
  {
    icon: "table_bar",
    label: "Mis mesas",
    description:
      "Distribuye a tus invitados por mesa y mantén tu evento bien organizado.",
    buttonLabel: "Organizar mesas",
    path: "/new-event",
  },
];

function MyBoard() {
  return (
    <div className="grid mt-14 grid-cols-[repeat(auto-fit,275px)] justify-center gap-4">
      {cards.map((option, i) => (
        <Link
          to={option.path}
          key={i}
          className="group flex flex-col text-dark-text gap-3 relative overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(178,58,125,0.16)]"
        >
          <div className="rounded-full shadow h-15 w-15 flex justify-center items-center bg-bg-soft">
            <Icon className="text-flower text-4xl" icon={option.icon}></Icon>
          </div>
          <span className="font-title  font-semibold text-2xl mt-3">
            {option.label}
          </span>
          <p className="text-sm mt-2">{option.description}</p>

          <div className="flex-1 flex items-end">
            <div className="flex items-center gap-2 mt-3">
              <span className="text-flower">{option.buttonLabel}</span>
              <Icon icon="arrow_forward" className="text-flower text-base" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyBoard;
