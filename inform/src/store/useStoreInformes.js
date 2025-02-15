import { useState, useEffect } from "react";
import { fetchInformes, addInforme, updateInforme, deleteInforme } from "../services/Api";

export const useStoreInformes = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener informes (GET)
  const AllInformes = async () => {
    setLoading(true);
    try {
      const data = await fetchInformes();
      setInformes(data);
      console.log(data);
      
    } catch (error) {
      console.error("Error al obtener informes", error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar informe (POST)
  const addNewInforme = async (nuevoInforme) => {
    try {
      await addInforme(nuevoInforme); 
      await AllInformes(); // Hacer un nuevo GET para actualizar la lista
    } catch (error) {
      console.error("Error al agregar informe", error);
    }
  };

  // Editar informe (PUT)
  const updateExistingInforme = async (id, datosActualizados) => {
    try {
      const updatedInforme = await updateInforme(id, datosActualizados);
      setInformes((prevInformes) =>
        prevInformes.map((informe) => (informe.id === id ? updatedInforme : informe))
      );
    } catch (error) {
      console.error("Error al actualizar informe", error);
    }
  };

  // Eliminar informe (DELETE)
  const deleteExistingInforme = async (id) => {
    try {
      await deleteInforme(id);
      await AllInformes();
    } catch (error) {
      console.error("Error al eliminar informe", error);
    }
  };

  // Cargar informes al inicio
  useEffect(() => {
    AllInformes();
  }, []);

  return {
    informes,
    loading,
    AllInformes,
    addNewInforme,
    updateExistingInforme,
    deleteExistingInforme,
  };
};
