import { useState, useEffect } from "react";
import { fetchLeaders, addLeaders,  updateLeaders, deleteLeaders, searchLeader, filterTypeLeader, filterTypeGrid} from "../services/Api";

export const useStoreLeaders = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener informes (GET)
  const AllLeaders = async () => {
    setLoading(true);
    try {
      const data = await fetchLeaders();
      setLeaders(data);
    } catch (error) {
      console.error("Error al obtener informacion de lideres", error);
    } finally {
      setLoading(false);
    }
  };


  // Agregar informacion lider (POST)
  const addNewLeader = async (newLeader) => {
    try {
      await addLeaders(newLeader); 
      await AllLeaders(); // Hacer un nuevo GET para actualizar la lista
    } catch (error) {
      console.error("Error al agregar informacion de lideres", error);
    }
  };

  // Editar informacion (PUT)
  const updateExistingLeader = async (id, dataUpdate) => {
    try {
       await updateLeaders(id, dataUpdate);
       await AllLeaders()
    } catch (error) {
      console.error("Error al actualizar informacion de lideres", error);
    }
  };

  // Eliminar informacion (DELETE)
  const deleteExistingLeader = async (id) => {
    try {
      await deleteLeaders(id);
      await AllLeaders();
    } catch (error) {
      console.error("Error al eliminar informacion de lideres", error);
    }
  };


   // Obtener informacion busqueda(GET)
   const fetchLeaderSearch = async (searchQuery) => {
    try {
      const data = await searchLeader(searchQuery); 
      setLeaders(data); 
    } catch (error) {
      console.error("Error al obtener informacion de búsqueda:", error);
    }
  };

  // filtrar por tipo de lider
  const filterLeadersByType = async (mainLeaderFilter) => {
    try {
      const data = await filterTypeLeader(mainLeaderFilter); // Llamada a la API con el filtro
      setLeaders(data);
    } catch (error) {
      console.error("Error al filtrar líderes:", error);
    }
  };filterTypeGrid
  
    // filtrar por tipo de red
    const filterByTypeGrid = async (typeGrid) => {
      try {
        const data = await filterTypeGrid(typeGrid); // Llamada a la API con el filtro
        setLeaders(data);
      } catch (error) {
        console.error("Error al filtrar líderes:", error);
      }
    };

  // Cargar informes al inicio
  useEffect(() => {
    AllLeaders();
  }, []);

  return {
    leaders,
    loading,
    AllLeaders,
    addNewLeader,
    updateExistingLeader,
    deleteExistingLeader,
    fetchLeaderSearch,
    filterLeadersByType,
    filterByTypeGrid
  };
};
