import { useState, useEffect  } from "react";
import { Plus } from "lucide-react";
import { Button  } from "react-bootstrap";
import DataTable from "../components/table";
import ModalForm from "../components/Form";
import { useStoreLeaders } from "../store/useStoreLeader";
import { sweetDelete } from "../services/notify"; 


const Leaders = () => {
  const [show, setShow] = useState(false);
  const {leaders, addNewLeader, deleteExistingLeader, updateExistingLeader, fetchLeaderSearch } = useStoreLeaders();
  const [rows, setRows] = useState([]); // Inicializar rows vacío
  const [dataLeader, setDataLeader] = useState()
  const [actionType, setActionType] = useState()
  const [idEdit, setIdEdit] = useState()
  const [typeFunc, setTypeFunc] = useState()
  const [searchQuery, setSearchQuery] = useState(""); // Estado para 


  // Maneja el cambio del input de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    fetchLeaderSearch(e.target.value); 
  };

  useEffect(() => {
    const formattedRows = leaders.map((leader) => ({
      ...leader,  
      mainLeader: leader.mainLeader ? "Líder de 12" : "Líder de 144",
    }));
    setRows(formattedRows);
  }, [leaders]);


 const handleShow = () => setShow(true);

  
const deleteClient = async (data) => {
  const itemId = data._id; 
  const textDele = "el lider";
  const dataName = data.name; 

  sweetDelete(textDele, dataName, async () => {
    try {
      await deleteExistingLeader(itemId);
    } catch (error) {
      console.error("Error al eliminar el lider:", error);
    }
  });
};


const goInfo = (client) => {
  setTypeFunc(2)
  setDataLeader(client);
  setIdEdit(client._id)
  setActionType(() => updateExistingLeader); 
  handleShow();
};


const createLeader = () => {
  setTypeFunc(1)
  setDataLeader(null); 
  setActionType(() => addNewLeader); 
  handleShow();
};



const showProductClient = () => {
  
};


  const columns = [
    { name: "Name", label: "Nombre"},
    { name: "mainLeader", label: "LIDER DE 12", }
  ];


  const visibleColumns = ["name","mainLeader"];

  const leaderOptions = [
    { value: true, name: "Líder de 12" },
    { value: false, name: "Líder 144" },
  ];

  const fields = [
    { name: "name", label: "Nombre", type: "text", placeholder: "Escribe el nombre", defaultValue: "" },
    { name: "mainLeader", label: "Lider de 12", type: "select", options: leaderOptions, placeholder: "Escoge tipo de lider", defaultValue: "" },
  ];

  return (
    <div>
      <h3 className="text-black">Lideres</h3>
      <p>Pagina para agregar y eliminar los lideres</p>
      <div className="d-flex justify-content-between align-items-center mt-10">
      <input
          type="text"
          placeholder="Buscar..."
          className="w-[40%] border-[1px] border-[#cbcbcb] rounded-[6px] p-2"
          value={searchQuery}
          onChange={handleSearchChange} // Llama a la función de búsqueda
        />

        <Button
          className="d-flex align-items-center w-30 bg-blue-500 "
          onClick={createLeader} // Abre el modal
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
          nameTable="Tabla de lideres"
          onDelete={deleteClient}
          onGoInfo={goInfo}
          onProductClients={showProductClient}
        />
      </div>

      {/* Modal con formulario */}
      <ModalForm show={show}  handleClose={() => setShow(false)} fields={fields} id={idEdit} creaEdit={typeFunc} onSubmit={actionType} initialData={dataLeader} />
    </div>
  );
};

export default Leaders;

  