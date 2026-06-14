import useGetProfile from "../../api/useGetProfile";
import OtpVerifyForm from "./OtpValidationForm";

function OtpVerify() {
  const { data: user } = useGetProfile();

  if (!user) return <></>;

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-md">
        <title className="text-3xl font-bold">
          Invitagil | Verifica tu correo electrónico
        </title>
        <OtpVerifyForm />
      </section>
    </main>
  );
}
export default OtpVerify;
