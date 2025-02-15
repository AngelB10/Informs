import { useState, useEffect  } from "react";
import { Plus } from "lucide-react";
import { Button } from "react-bootstrap";
import DataTable from "../components/table";
import ModalForm from "../components/Form";
import { useStoreInformes } from "../store/useStoreInformes";

const Inform = () => {
  const [show, setShow] = useState(false);
  const {informes, addNewInforme, deleteExistingInforme, updateExistingInforme } = useStoreInformes();
  const [rows, setRows] = useState([]); // Inicializar rows vacío
  const [dataInform, setDataInform] = useState()
  const [actionType, setActionType] = useState()

  useEffect(() => {
    const formattedRows = informes.map((informe) => ({
      ...informe,
      date: informe.date ? informe.date.split("T")[0] : "",
    }));
    setRows(formattedRows);
  }, [informes]);


 const handleShow = () => setShow(true);

  
 const deleteClient = (client) => {
  deleteExistingInforme(client._id)
};

const goInfo = (client) => {
  setDataInform(client)
  setActionType(updateExistingInforme)
  handleShow()
};

const createInform = () => {
  setActionType(addNewInforme)
  handleShow()
}


const showProductClient = (client) => {
  console.log("Ver productos de:", client);
};


  const columns = [
    { name: "theme", label: "TEMA"},
    { name: "mainLeader", label: "LIDER DE 12", },
    { name: "leader", label: "LIDER DE CELULA"},
    { name: "numberAttendees", label: "CANTIDAD"},
    { name: "date", label: "FECHA"},
    { name: "offering", label: "OFRENDA",},

  ];


  const visibleColumns = ["theme","mainLeader","leader","numberAttendees","date","offering"];

  const leaderOptions = [
    { value: "leader1", label: "Líder 1" },
    { value: "leader2", label: "Líder 2" },
    { value: "leader3", label: "Líder 3" }
  ];

  const fields = [
    { name: "theme", label: "Tema", type: "text", placeholder: "Escribe el tema", defaultValue: "" },
    { name: "mainLeader", label: "Lider de 12", type: "select", options: leaderOptions, placeholder: "Escoge el nombre del lider principal", defaultValue: "" },
    { name: "leader", label: "Lider", type: "select", options: leaderOptions, placeholder: "Escoge el nombre del lider de celula", defaultValue: "" },
    { name: "numberAttendees", label: "Cantidad de asistentes", type: "text", placeholder: "Cantidad de asistentes", defaultValue: "" },
    { name: "date", label: "Fecha", type: "date",  defaultValue: "", addProduct: true },
    { name: "offering", label: "Ofrenda", type: "number", placeholder: "Escribe la cantidad de ofrenda", defaultValue: "" },

  ];

  return (
    <div>
      <h1 className="text-white">Informes</h1>
      <hr className="text-white" />

      <div className="d-flex justify-content-between align-items-center mt-30">
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control w-50"
        />

        <Button
          variant="success"
          className="d-flex align-items-center w-30"
          onClick={createInform} // Abre el modal
        >
          <Plus size={20} className="me-2" />
          Agregar
        </Button>
      </div>

      <div className="mt-3">
        <DataTable
          rows={rows}
          columns={columns}
          visibleColumns={visibleColumns}
          nameTable="Tabla de Informes"
          onDelete={deleteClient}
          onGoInfo={goInfo}
          onProductClients={showProductClient}
        />
      </div>

      {/* Modal con formulario */}
      <ModalForm show={show}  handleClose={() => setShow(false)} fields={fields}  onSubmit={actionType} initialData={dataInform} />
    </div>
  );
};

export default Inform;
