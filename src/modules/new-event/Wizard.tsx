import { Card, Stepper } from "../../components";
import { useStepper } from "../../contexts/StepperContext/useStepper";
const steps = [
  {
    label: "Información básica",
  },
  {
    label: "Detalles",
  },
  {
    label: "Diseño",
  },
  {
    label: "Confirmación",
  },
];
function Wizard() {
  const { activeStep } = useStepper();
  return (
    <div className="flex flex-col px-10 pt-14">
      <h1 className="text-dark-text font-title font-medium text-4xl">
        Crear Nuevo Evento
      </h1>
      <p className="text-text-soft pb-6 pt-2">
        Sigue estos pasos para configurar tu evento.
      </p>
      <Stepper activeStep={activeStep} steps={steps} />
      <Card variant="soft" className="mt-4">
        <h2 className="text-dark-text font-title font-medium text-2xl">
          Información básica
        </h2>
      </Card>
    </div>
  );
}

export default Wizard;
