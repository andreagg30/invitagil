import { Icon } from "../../components";
import { Divider } from "../../components/Divider";

export function Welcome() {
  return (
    <div className="p-0 px-10 relative overflow-hidden mt-20 flex-col flex gap-2 flex-1 max-w-140 w-[calc(100vw-24px)">
      <h2 className="text-flower mb-2 uppercase text-sm font-semibold ">
        Bienvenido a Invitagil
      </h2>
      <div className="flex items-end gap-2">
        <h1 className="text-2x whitespace-nowrap  md:text-4xl text-dark-text font-title font-semibold">
          Tu plataforma de gestión de
        </h1>
        <h1 className="text-2x whitespace-nowrap  md:text-4xl text-flower font-title font-semibold">
          eventos
        </h1>
      </div>
      <p className="text-xl text-dark-text">comienza a diseñar momentos </p>
      <span className="text-4xl text-flower font-script">más especiales</span>
      <div className="flex gap-2 items-center">
        <Divider />
        <Icon icon="favorite" className="text-flower" />
        <Divider />
      </div>
      <p className="text-dark-text mt-3">
        Únete a Invitagil y gestiona tus eventos de forma fácil, digital y
        única.{" "}
      </p>

      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 pr-3">
          <Icon icon="favorite" className="text-flower mt-3" />
          <div className="flex-1">
            <p className="text-dark-text mt-3 text-xs">
              DISEÑOS <br /> PERSONALIZADOS
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Icon icon="mobile_2" className="text-flower mt-3" />
          <div className="flex-1">
            <p className="text-dark-text mt-3 text-xs">
              LISTOS PARA <br /> COMPARTIR
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3">
          <Icon icon="calendar_month" className="text-flower mt-3" />
          <div className="flex-1">
            <p className="text-dark-text mt-3 text-xs">
              FUNCIONES <br /> INTERACTIVAS
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start">
        <img src="/A.png" alt="devices" className="h-70" />
      </div>
    </div>
  );
}
