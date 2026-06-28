import RegisterForm from "./RegisterForm";
import { Welcome } from "./Welcome";

function SignUp() {
  return (
    <div className="px-6 py-10 flex justify-center gap-30">
      <title className="text-3xl font-bold">Invitagil | Crear cuenta</title>
      <section className="">
        <Welcome />
      </section>
      <section className="">
        <RegisterForm />
      </section>
    </div>
  );
}
export default SignUp;
