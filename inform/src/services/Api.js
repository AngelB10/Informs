import axios from "axios";

// const API_URL = "http://localhost:4500/api";
const API_URL = "https://informsbackend.onrender.com";


// links para informes

// Obtener informes (GET)
export const fetchInforms = async () => {
  const response = await axios.get(`${API_URL}/informs`);
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

// Obtener informes busqueda(GET)
export const searchInforms = async (searchQuery) => {
  const response = await axios.get(`${API_URL}/informs/search`, {
    params: { searchQuery }  // Enviar como parámetro de consulta (query parameter)
  });
  return response.data;
};

// Obtener informes por fecha(GET)
export const dateInforms = async (date) => {
  const response = await axios.get(`${API_URL}/informs/date`, {
    params: { date }  // Enviar como parámetro de consulta (query parameter)
  });
  return response.data;
};

// Obtener informes por mes(GET)
export const monthInforms = async (month) => {
  console.log(month);
  
  const response = await axios.get(`${API_URL}/informs/month`, {
    params: { month }  // Enviar como parámetro de consulta (query parameter)
  });
  return response.data;
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

// filtrar tipo de lider
export const filterTypeLeader = async (searchQuery) => {
  const response = await axios.get(`${API_URL}/leader/searchQuery`, {
    params: { searchQuery }  
  });
  return response.data;
};

// filtrar tipo de red
export const filterTypeGrid = async (searchQueryGrid) => {
  const response = await axios.get(`${API_URL}/leader/searchQueryGrid`,{
    params: { searchQueryGrid }  
  });
  return response.data;
};


// filtrar tipo de ministerio
export const filterTypeMinistry = async (searchQueryMinistry) => {
  const response = await axios.get(`${API_URL}/leader/searchQueryMinistry`,{
    params: { searchQueryMinistry }  
  });
  return response.data;
};
