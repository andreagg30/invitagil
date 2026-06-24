import EmailForm from "./EmailForm";

function ForgotPassword() {
    return <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-md">
        <title className="text-3xl font-bold">Invitagil | Recuperar Contraseña</title>
        <EmailForm />
      </section>
    </main>
}

export default ForgotPassword;