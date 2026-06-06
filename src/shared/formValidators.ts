export const formValidators = {
  required: "Campo requerido",
  noSpecialChars: {
    value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$/,
    message: "No se permiten caracteres especiales",
  },
  email: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Correo electrónico inválido",
  },
  password: {
    minLength: {
      value: 8,
      message: "La contraseña debe tener al menos 8 caracteres",
    },
    maxLength: {
      value: 100,
      message: "La contraseña debe tener entre 8 y 100 caracteres",
    },
    validate: {
      hasUppercase: (value: string) =>
        /[A-Z]/.test(value) ||
        "La contraseña debe incluir al menos una mayúscula",

      hasLowercase: (value: string) =>
        /[a-z]/.test(value) ||
        "La contraseña debe incluir al menos una minúscula",

      hasNumber: (value: string) =>
        /[0-9]/.test(value) || "La contraseña debe incluir al menos un número",
    },
  },
};
