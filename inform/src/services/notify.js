import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Notificaciones tipo Toast (reemplazo de Quasar Notify)
export const notifyError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

// Confirmación de eliminación (SweetAlert2)
export const sweetDelete = (textDele, dataNames, onDelete) => {
  Swal.fire({
    title: `¿Seguro que quieres eliminar ${textDele} ${dataNames}?`,
    text: "¡Esta acción no se puede deshacer!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, ¡eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete();
      Swal.fire("Eliminado!", "Tu archivo ha sido eliminado.", "success");
    }
  });
};
