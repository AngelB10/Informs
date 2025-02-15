import axios from "axios";

const API_URL = "http://localhost:4500/api";

// Obtener informes (GET)
export const fetchInformes = async () => {
  const response = await axios.get(`${API_URL}/informs`);
  return response.data;
};

// Agregar informe (POST)
export const addInforme = async (nuevoInforme) => {
  const response = await axios.post(`${API_URL}/informs`, nuevoInforme);
  return response.data;
};

// Editar informe (PUT)
export const updateInforme = async (id, datosActualizados) => {
  const response = await axios.put(`${API_URL}/informs/${id}`, datosActualizados);
  return response.data;
};

// Eliminar informe (DELETE)
export const deleteInforme = async (id) => {
  await axios.delete(`${API_URL}/informs/${id}`);
};