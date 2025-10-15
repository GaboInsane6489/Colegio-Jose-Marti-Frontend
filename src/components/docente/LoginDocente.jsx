import { useState } from "react";
import { loginDocente } from "@/services/authService";

const LoginDocente = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginDocente(correo, password);
      localStorage.setItem("token", res.data.token);
      // Redirige al dashboard docente
      window.location.href = "/dashboard/docente";
    } catch (err) {
      setError(err.response?.data?.message || "Error en el login");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Login Docente</h2>
      <input
        type="email"
        placeholder="Correo institucional"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="input"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input mt-2"
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button type="submit" className="btn mt-4">
        Ingresar
      </button>
    </form>
  );
};

export default LoginDocente;
