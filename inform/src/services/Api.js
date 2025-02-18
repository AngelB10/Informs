import axios from "axios";

const API_URL = "http://localhost:4500/api";

// links para informes

// Obtener informes (GET)
export const fetchInforms = async () => {
  const response = await axios.get(`${API_URL}/informs`);
  return response.data;
};

// Obtener informes busqueda(GET)
export const searchInforms = async (searchQuery) => {
  const response = await axios.get(`${API_URL}/informs/search`, {
    params: { searchQuery }  // Enviar como parámetro de consulta (query parameter)
  });
  return response.data;
};

// Agregar informe (POST)
export const addInform = async (newInform) => {
  const response = await axios.post(`${API_URL}/informs`, newInform);
  return response.data;
};

// Editar informe (PUT)
export const updateInform = async (id, dataUpdate) => {
  const response = await axios.put(`${API_URL}/informs/${id}`, dataUpdate);
  return response.data;
};

// Eliminar informe (DELETE)
export const deleteInform = async (id) => {
  await axios.delete(`${API_URL}/informs/${id}`);
};





// links para lideres 

// Obtener informes (GET)
export const fetchLeaders = async () => {
  const response = await axios.get(`${API_URL}/leader`);
  return response.data;
};

// Obtener informes busqueda(GET)
export const searchLeader = async (searchQuery) => {
  const response = await axios.get(`${API_URL}/leader/search`, {
    params: { searchQuery }  
  });
  return response.data;
};

// Agregar informe (POST)
export const addLeaders = async (newLeader) => {
  const response = await axios.post(`${API_URL}/leader`, newLeader);
  return response.data;
};

// Editar informe (PUT)
export const updateLeaders = async (id, dataUpdate) => {
  const response = await axios.put(`${API_URL}/leader/${id}`, dataUpdate);
  return response.data;
};

// Eliminar informe (DELETE)
export const deleteLeaders = async (id) => {
  await axios.delete(`${API_URL}/leader/${id}`);
};