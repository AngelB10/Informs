import { useState, useEffect } from "react";
import { fetchInforms, searchInforms, addInform,  deleteInform, updateInform, dateInforms, monthInforms} from "../services/Api";

export const useStoreInformes = () => {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(false);


  // Obtener informes (GET)
  const AllInformes = async () => {
    setLoading(true);
    try {
      const data = await fetchInforms();
      setInformes(data);
    } catch (error) {
      console.error("Error al obtener informes", error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar informe (POST)
  const addNewInforme = async (newInform) => {
    try {
      await addInform(newInform); 
      await AllInformes(); // Hacer un nuevo GET para actualizar la lista
    } catch (error) {
      console.error("Error al agregar informe", error);
    }
  };

  // Editar informe (PUT)
  const updateExistingInforme = async (id, dataUpdate) => {
    try {
       await updateInform(id, dataUpdate);
       await AllInformes()
    } catch (error) {
      console.error("Error al actualizar informe", error);
    }
  };

  // Eliminar informe (DELETE)
  const deleteExistingInforme = async (id) => {
    try {
      await deleteInform(id);
      await AllInformes();
    } catch (error) {
      console.error("Error al eliminar informe", error);
    }
  };

  // Obtener informes busqueda(GET)
  const fetchInformesSearch = async (searchQuery) => {
    try {
      const data = await searchInforms(searchQuery); 
      setInformes(data); 
    } catch (error) {
      console.error("Error al obtener los informes de búsqueda:", error);
    }
  };

  // Obtener informes por fecha(GET)
  const fetchInformesDate = async (searchQuery) => {
    try {
      const data = await dateInforms(searchQuery); 
      setInformes(data); 
    } catch (error) {
      console.error("Error al obtener los informes de búsqueda:", error);
    }
  };

    // Obtener informes por fecha(GET)
    const fetchInformesMonth = async (searchQuery) => {
      try {
        const data = await monthInforms(searchQuery); 
        setInformes(data); 
      } catch (error) {
        console.error("Error al obtener los informes de búsqueda:", error);
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
    fetchInformesSearch,
    fetchInformesDate,
    fetchInformesMonth
  };
};
