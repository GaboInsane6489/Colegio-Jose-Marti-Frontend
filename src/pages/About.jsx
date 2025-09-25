import React from "react";
import About from "../components/Nosotros";
import HistoriaInicio from "../components/HistoriaInicio";
import HistoriaTransformacion from "../components/HistoriaTransformacion";
import HistoriaLegado from "../components/HistoriaLegado";
import MateriasSection from "../components/MateriasSection";

const Nosotros = () => {
  return (
    <>
      <About />
      <HistoriaInicio />
      <HistoriaTransformacion />
      <HistoriaLegado />
      <MateriasSection />
    </>
  );
};

export default Nosotros;
