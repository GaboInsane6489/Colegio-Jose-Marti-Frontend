import { useState } from "react";
import { register } from "../../services/authService";
import InputField from "../shared/InputField";

const RegisterForm = ({ onRegistroExitoso }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    try {
      await register(nombre, email, password);
      alert("✅ Registro exitoso. Espera validación del administrador.");
      onRegistroExitoso(); // Vuelve al login
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      alert("Hubo un problema al registrar. Verifica los datos.");
    }
  };

  return (
    <form
      onSubmit={handleRegistro}
      className="w-full max-w-sm bg-white p-4 shadow-md rounded space-y-4 mt-6"
    >
      <InputField
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <InputField
        type="email"
        placeholder="Correo institucional"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
