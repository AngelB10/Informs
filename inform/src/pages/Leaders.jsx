import { useState, useEffect  } from "react";
import { Plus } from "lucide-react";
import { Button  } from "react-bootstrap";
import DataTable from "../components/table";
import ModalForm from "../components/Form";
import { useStoreLeaders } from "../store/useStoreLeader";
import { sweetDelete } from "../services/notify"; 


const Leaders = () => {
  const [show, setShow] = useState(false);
  const {leaders, addNewLeader, deleteExistingLeader, updateExistingLeader, fetchLeaderSearch, filterLeadersByType, filterByTypeGrid, filterByMinistry, AllLeaders } = useStoreLeaders();
  const [rows, setRows] = useState([]); // Inicializar rows vacío
  const [dataLeader, setDataLeader] = useState()
  const [actionType, setActionType] = useState()
  const [idEdit, setIdEdit] = useState()
  const [typeFunc, setTypeFunc] = useState()
  const [searchQuery, setSearchQuery] = useState("");  
  const [typeLeader, setTypeLeader ] = useState()
   const [ministry, setMinistry] = useState()
  // Maneja el cambio del input de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    fetchLeaderSearch(e.target.value); 
  };

  // filtro de tipo de lideres
    const handleFilterChange = (event) => {
      const value = event.target.value;
      setTypeLeader(value);
    
      if (value === "") {
        AllLeaders(); // Cargar todos los líderes
      } else {
        filterLeadersByType(value); // Filtrar según el tipo
      }
    };

    const handleFilterGrid = (data) => {
      const value = data.target.value;     
      setTypeLeader(value);
      console.log(value);
      
    
      if (value === "") {
        AllLeaders(); // Cargar todos los líderes
      } else {
        filterByTypeGrid(value); // Filtrar según el tipo
      }
    }

       const handleMinistryFilter = (data) => {
      const value = data.target.value;
      setMinistry(value);
      if (value === "") {
        AllLeaders(); // Cargar todos los líderes
      } else {
        filterByMinistry(value); // Filtrar según el tipo
      }
    }
  

  useEffect(() => {
    const formattedRows = leaders.map((leader) => {
      let mainLeaderName = leader.idMainLeader === "Pastor" ? "Pastor" : leaders.find((l) => l._id === leader.idMainLeader)?.name || "No encontrado";
  
      return {
        ...leader,
        mainLeader: leader.mainLeader ? "Líder de 12" : "Líder de 144",
        idMainLeader: mainLeaderName,
        idMainLeaderValue: leader.idMainLeader
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
  let newData = { ...data };
  newData.mainLeader = newData.mainLeader === "Líder de 144 " ? false : true;
  if (newData.idMainLeader !== "Pastor") {
    const leaderFound = leaders.find((l) => l._id === newData.idMainLeaderValue);
    newData.idMainLeader = leaderFound ? leaderFound._id : "No encontrado";
    
  }
  setDataLeader(newData);
  handleShow();
};


const createLeader = () => {
  setTypeFunc(1)
  setDataLeader(null); 
  setActionType(() => addNewLeader); 
  handleShow();
};


const optionsTwelveLeaders = (leaders || []).filter(leader => leader.mainLeader).map(leader => ({
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
      <p>Gestión de información de lideres</p>
      <div className="block sm:flex md:flex lg:flex  items-center justify-between mt-10 p-1 ">
  {/* Contenedor izquierdo con input y select */}
  <div className="flex items-center gap-1 sm:gap-4 md:gap-4 lg:gap-4 w-[80%]">
    <div className="mb-3">
      <label className="mb-1 block">Búsqueda</label>
      <input
        type="text"
        placeholder="Buscar..."
        className="border border-gray-400 rounded p-2 w-full"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>

    <div className="mb-3">
      <label className="form-label block">Filtrar tipo líder</label>
      <select
        className="border border-gray-400 rounded p-2 w-full"
        value={typeLeader}
        onChange={handleFilterChange}
      >
        <option value="">Todos</option>
        <option value="true">Líder de 12</option>
        <option value="false">Líder de 144</option>
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label block">Filtrar Equipo</label>
      <select
        className="border border-gray-400 rounded p-2 w-full"
        value={typeLeader}
        onChange={handleFilterGrid}
      >
        <option value="">Todos</option>
        <option value="Hombres">Hombres</option>
        <option value="Mujeres">Mujeres</option>
      </select>
    </div>

     <div class="mb-3">
      <label className="form-label block">Filtrar ministerio</label>
      <select
        className="border border-gray-400 rounded p-2 w-full"
        value={typeLeader}
        onChange={handleMinistryFilter}
      >
     <option value="">Todos</option>
      {optionsTwelveLeaders.map((leader) => (
        <option key={leader.value} value={leader.value}>
          {leader.name}
        </option>
      ))}
      </select>
    </div>
  </div>

  {/* Botón alineado a la derecha */}
  <Button
          className="d-flex align-items-center w-30 bg-blue-500 "
          onClick={createLeader} // Abre el modal
        >
          <Plus size={20} className="me-2 text-white-950" />
          <strong className="text-white">Agregar</strong> 
        </Button>
      </div>


      <div className="mt-2">
        <DataTable
          rows={rows}
          columns={columns}
          visibleColumns={visibleColumns}
          nameTable="Tabla de lideres"
          onDelete={deleteClient}
          onGoInfo={goInfo}
        />
        <div className="px-4 pt-4 pb-2 shadow-2xl ">
          <p >CANTIDAD DE DATOS: <strong className="bg-amber-500 rounded-[4px] p-1"> {leaders.length}</strong></p>
        </div>
      </div>



      {/* Modal con formulario */}
      <ModalForm show={show}  handleClose={() => setShow(false)} fields={fields} id={idEdit} creaEdit={typeFunc} onSubmit={actionType} initialData={dataLeader} />
    </div>
  );
};

export default Leaders;

  