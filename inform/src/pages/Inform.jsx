import { useState, useEffect } from "react";
import { Plus, RefreshCcw } from "lucide-react";
import { Button } from "react-bootstrap";
import DataTable from "../components/table";
import ModalForm from "../components/Form";
import { useStoreInformes } from "../store/useStoreInforms";
import { useStoreLeaders } from "../store/useStoreLeader";
import { sweetDelete } from "../services/notify"; 

const Inform = () => {
  const [show, setShow] = useState(false);
  const { informes, addNewInforme, deleteExistingInforme, updateExistingInforme, fetchInformesSearch, AllInformes, fetchInformesDate, fetchInformesMonth } = useStoreInformes();
  const { leaders } = useStoreLeaders();
  const [rows, setRows] = useState([]); // Inicializar rows vacío
  const [dataInform, setDataInform] = useState();
  const [actionType, setActionType] = useState();
  const [idEdit, setIdEdit] = useState();
  const [typeFunc, setTypeFunc] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [GetDate, setGetDate] = useState("")
  const [GetMount, setGetMount] = useState("")

  // Maneja el cambio del input de búsqueda
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
    fetchInformesSearch(e.target.value); 
  };

  useEffect(() => {
    const formattedRows = informes.map((informe) => {

      let mainLeaderName = leaders.find((l) => l._id === informe.mainLeader)?.name || "No encontrado";  
      let leader = leaders.find((i) => i._id === informe.leader )?.name || "No encontrado"
      return {
        ...informe,
        mainLeader: mainLeaderName,
        idMainLeader: informe.mainLeader,
        leader: leader,
        idLeader: informe.leader,
        date: informe.date ? informe.date.split("T")[0] : "",
      };
    });
  
    setRows(formattedRows);
  }, [informes, leaders]); 
  



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
    dataCorrect(client)
  };

  const dataCorrect = (client) => {
    let newData = { ...client };
    newData.mainLeader = newData.idMainLeader 
    setDataInform(newData);
    setIdEdit(client._id);
    setActionType(() => updateExistingInforme); 
    handleShow();
  }

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

  const optionsLeaders = leaders.map((leader) => ({
    value: leader._id,
    name: leader.name,
  }));


  // funcion filtrar informes por fecha
  const handleFilterDate = (event) => {
    const value = event.target.value;
    setGetDate(value);
  
    if (value === "") {
      AllInformes(); // Cargar todos los informes
    } else {
      fetchInformesDate(value); // Filtrar según el tipo
    }
  };
  

  const handleFilterChange = (event) => {
    const value = event.target.value
    setGetMount(value)
    
    if (value === "") {
      AllInformes(); // Cargar todos los informes
    } else {
      fetchInformesMonth(value); // Filtrar según el tipo
    }
  }

  const columns = [
    { name: "theme", label: "TEMA"},
    { name: "mainLeader", label: "LIDER DE 12" },
    { name: "leader", label: "LIDER DE CELULA" },
    { name: "numberAttendees", label: "ASISTENTES" },
    { name: "date", label: "FECHA" },
    { name: "offering", label: "OFRENDA" },
    { name: "newAttendees", label: "Nuevos" },
    { name: "week", label: "SEMANA"},
  ];

  const visibleColumns = [ "theme", "mainLeader", "leader", "numberAttendees", "date", "offering", "newAttendees", "week",];

  const fields = [
    { name: "theme", label: "Tema", type: "text", placeholder: "Escribe el tema", defaultValue: "" },
    { name: "mainLeader", label: "Lider de 12", type: "select", options: optionsTwelveLeaders, placeholder: "Escoge el nombre", defaultValue: "" },
    { name: "leader", label: "Lider", type: "select", options: optionsLeaders, placeholder: "Escoge el nombre", defaultValue: "" },
    { name: "numberAttendees", label: "Cantidad de asistentes", type: "text", placeholder: "Escribe la Cantidad", defaultValue: "" },
    { name: "comment", label: "Comentario", type: "text", placeholder: "Escribe un comentario", defaultValue: "Sin comentarios" },
    { name: "newAttendees", label: "Cantidad de nuevos", type: "text", placeholder: "Escribe la Cantidad", defaultValue: "" },
    { name: "date", label: "Fecha", type: "date", defaultValue: "", addProduct: true },
    { name: "offering", label: "Ofrenda", type: "number", placeholder: "Escribe la cantidad", defaultValue: "" },
  ];

  const months = [
    { value: 1, name: "Enero" },
    { value: 2, name: "Febrero" },
    { value: 3, name: "Marzo" },
    { value: 4, name: "Abril" },
    { value: 5, name: "Mayo" },
    { value: 6, name: "Junio" },
    { value: 7, name: "Julio" },
    { value: 8, name: "Agosto" },
    { value: 9, name: "Septiembre" },
    { value: 10, name: "Octubre" },
    { value: 11, name: "Noviembre" },
    { value: 12, name: "Diciembre" },
  ];

  return (
    <div>
      <h3 className="text-black">Informes</h3>
      <p>Gestión de informacion de informes</p>
      <div className="block sm:flex md:flex lg:flex items-center justify-between mt-10 p-1">
      <div className="flex items-center gap-1 sm:gap-4 md:gap-4 lg:gap-4">
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
    <label className="mb-1 block">Filtrar por fecha</label>
      <input
        type="date"
        placeholder="Buscar..."
        className="border border-gray-400 rounded p-2 w-full"
        value={GetDate}
        onChange={handleFilterDate}
      />
   
    </div>
    <div className="mb-3"> 
    <label className="mb-1 block">Filtrar por Mes</label>
    <select
      className="border border-gray-400 rounded p-2 w-full"
      onChange={handleFilterChange}
      value={GetMount}
    >
      <option value="">Todos</option>
      {months.map((month) => (
        <option key={month.value} value={month.value}>
          {month.name}
        </option>
      ))}
    </select>
    </div>
    </div>
    <div className="flex gap-2.5">
      <Button
          className="d-flex align-items-center !bg-green-400 h-10 !border-none"
          onClick={AllInformes} // Abre el modal
        >
          <RefreshCcw size={20} className="me-1 text-green-600" />
          <strong className="text-white"></strong> 
        </Button>

        <Button
          className="d-flex align-items-center bg-blue-400 h-10"
          onClick={createInform} // Abre el modal
        >
          <Plus size={20} className="me-1 text-white" />
          <strong className="text-white">Agregar</strong> 
        </Button>
    </div>
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
           <div className="px-4 pt-4 pb-2 shadow-2xl ">
          <p >CANTIDAD DE DATOS: <strong className="bg-amber-500 rounded-[4px] p-1"> {informes.length}</strong></p>
        </div>
      </div>

      {/* Modal con formulario */}
      <ModalForm show={show} handleClose={() => setShow(false)} fields={fields} id={idEdit} creaEdit={typeFunc} onSubmit={actionType} initialData={dataInform} />
    </div>
  );
};

export default Inform;
