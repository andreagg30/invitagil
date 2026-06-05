export const formErrors = {
  required: "Campo requerido",
  noSpecialChars: {
    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/,
    message: "No se permiten caracteres especiales",
  },
  invalidEmail: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Correo electrónico inválido",
  },
};
