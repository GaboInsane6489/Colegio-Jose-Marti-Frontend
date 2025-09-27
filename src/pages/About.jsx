import React from "react";

// Secciones institucionales
import About from "../components/Nosotros";
import HistoriaInicio from "../components/HistoriaInicio";
import HistoriaTransformacion from "../components/HistoriaTransformacion";
import HistoriaLegado from "../components/HistoriaLegado";
import MisionVisionValores from "../components/MisionVisionValores";
import LineaTiempoInstitucional from "../components/LineaTiempoInstitucional";
import ModeloPedagogico from "../components/ModeloPedagogico";
import CompromisoComunidad from "../components/CompromisoComunidad";
import PerfilEgresado from "../components/PerfilEgresado";

// Académico
import MateriasSection from "../components/MateriasSection";

const Nosotros = () => {
  return (
    <>
      {/* Presentación institucional */}
      <About />

      {/* Historia en tres etapas */}
      <HistoriaInicio />
      <HistoriaTransformacion />
      <HistoriaLegado />

      {/* Identidad institucional */}
      <MisionVisionValores />
      <LineaTiempoInstitucional />
      <ModeloPedagogico />
      <CompromisoComunidad />
      <PerfilEgresado />

      {/* Estructura académica */}
      <MateriasSection />
    </>
  );
};

export default Nosotros;
