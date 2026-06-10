import OtpValidationForm from "./OtpValidationForm";

function OtpValidation() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-md">
        <title className="text-3xl font-bold">
          Invitagil | Verifica tu correo electrónico
        </title>
        <OtpValidationForm />
      </section>
    </main>
  );
}
export default OtpValidation;
