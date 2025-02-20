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
    const formattedRows = leaders.map((leader) => {
      let mainLeaderName = leader.idMainLeader === "Pastor" ? "Pastor" : leaders.find((l) => l._id === leader.idMainLeader)?.name || "No encontrado";
  
      return {
        ...leader,
        mainLeader: leader.mainLeader ? "Líder de 12" : "Líder de 144",
        idMainLeader: mainLeaderName, 
      };
    });
  
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
  getNameById(client)
  
  setIdEdit(client._id)
  setActionType(() => updateExistingLeader); 
  ;
};

const getNameById = (data) => {
  const leader = leaders.find((leader) => leader._id === data.idMainLeader);

  if (leader) {
    data.idMainLeader = leader.name; 
    setDataLeader(data);
    handleShow()
  } else {
    alert("Líder no encontrado");
  }
};


const createLeader = () => {
  setTypeFunc(1)
  setDataLeader(null); 
  setActionType(() => addNewLeader); 
  handleShow();
};

const showProductClient = () =>{

}


const optionsTwelveLeaders = leaders.filter((leader) => leader.mainLeader).map((leader) => ({
  value: leader._id,
  name: leader.name,
}));


  const columns = [
    { name: "Name", label: "Nombre"},
    { name: "mainLeader", label: "LIDER DE 12", },
    { name: "team", label: "Equipo", },
    {name: "idMainLeader", label: "Lider"}
  ];


  const visibleColumns = ["name", "mainLeader", "team", "idMainLeader"];

  const leaderOptions = [
    { value: true, name: "Líder de 12" },
    { value: false, name: "Líder 144" },
  ];

  const teamOptions = [
    { value: "Mujeres", name: "Mujeres" },
    { value: "Hombres", name: "Hombres" },
  ];

  const fields = [
    { name: "name", label: "Nombre", type: "text", placeholder: "Escribe el nombre", defaultValue: "" },
    { name: "team", label: "Equipo o Red", type: "select", placeholder: "Escoge la red", options: teamOptions, defaultValue: "" },
    { name: "mainLeader", label: "Tipo de lider", type: "select", options: leaderOptions, placeholder: "Escoge tipo de lider", defaultValue: "" },
    { name: "idMainLeader", label: "Lider Principal", type: "select", placeholder: "Escoge el lider principal", options: optionsTwelveLeaders, defaultValue: "Pastor" },
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

  