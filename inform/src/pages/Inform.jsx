import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "react-bootstrap";
import DataTable from "../components/table";
import ModalForm from "../components/Form";
import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import { sweetDelete } from "../services/notify"; 

const Inform = () => {
  const [show, setShow] = useState(false);
  const { informes, addNewInforme, deleteExistingInforme, updateExistingInforme, fetchInformesSearch } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [rows, setRows] = useState([]); // Inicializar rows vacío
  const [dataInform, setDataInform] = useState();
  const [actionType, setActionType] = useState();
  const [idEdit, setIdEdit] = useState();
  const [typeFunc, setTypeFunc] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  // Maneja el cambio del input de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    fetchInformesSearch(e.target.value); 
  };

  useEffect(() => {
    const formattedRows = informes.map((informe) => ({
      ...informe,
      date: informe.date ? informe.date.split("T")[0] : "",
    }));
    setRows(formattedRows);
    console.log(formattedRows);
    
  }, [informes]);

  const handleShow = () => setShow(true);

  const deleteClient = async (data) => {
    const itemId = data._id;
    const textDele = "el informe de esta fecha";
    const dataName = data.date;

    sweetDelete(textDele, dataName, async () => {
      try {
        await deleteExistingInforme(itemId);
      } catch (error) {
        console.error("Error al eliminar el informe:", error);
      }
    });
  };

  const goInfo = (client) => {
    console.log(client);
    
    setTypeFunc(2);
    setDataInform(client);
    setIdEdit(client._id);
    setActionType(() => updateExistingInforme); 
    handleShow();
  };

  const createInform = () => {
    setTypeFunc(1);
    setDataInform(null);
    setActionType(() => addNewInforme); 
    handleShow();
  };

  const showProductClient = (client) => {
    const val = client;
    val;
  };

  const optionsTwelveLeaders = leaders.filter((leader) => leader.mainLeader).map((leader) => ({
    value: leader._id,
    name: leader.name,
  }));

  const columns = [
    { name: "theme", label: "TEMA"},
    { name: "mainLeader", label: "LIDER DE 12" },
    { name: "leader", label: "LIDER DE CELULA" },
    { name: "numberAttendees", label: "CANTIDAD" },
    { name: "date", label: "FECHA" },
    { name: "offering", label: "OFRENDA" },
  ];

  const visibleColumns = ["theme", "mainLeader", "leader", "numberAttendees", "date", "offering"];

  const fields = [
    { name: "theme", label: "Tema", type: "text", placeholder: "Escribe el tema", defaultValue: "" },
    { name: "mainLeader", label: "Lider de 12", type: "select", options: optionsTwelveLeaders, placeholder: "Escoge el nombre", defaultValue: "" },
    { name: "leader", label: "Lider", type: "select", options: leaders, placeholder: "Escoge el nombre", defaultValue: "" },
    { name: "numberAttendees", label: "Cantidad de asistentes", type: "text", placeholder: "Escribe la Cantidad", defaultValue: "" },
    { name: "date", label: "Fecha", type: "date", defaultValue: "", addProduct: true },
    { name: "offering", label: "Ofrenda", type: "number", placeholder: "Escribe la cantidad", defaultValue: "" },
  ];

  return (
    <div>
      <h3 className="text-black">Informes</h3>
      <p>Pagina para agregar y eliminar informes</p>
      <div className="d-flex justify-content-between mt-9">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-[40%] border-[1px] border-[#cbcbcb] rounded-[6px] p-2"
          value={searchQuery}
          onChange={handleSearchChange} // Llama a la función de búsqueda
        />

        <Button
          className="d-flex align-items-center w-30 bg-blue-500"
          onClick={createInform} // Abre el modal
        >
          <Plus size={20} className="me-2 text-blue-950" />
          <strong className="text-blue-950">Agregar</strong> 
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
      <ModalForm show={show} handleClose={() => setShow(false)} fields={fields} id={idEdit} creaEdit={typeFunc} onSubmit={actionType} initialData={dataInform} />
    </div>
  );
};

export default Inform;
