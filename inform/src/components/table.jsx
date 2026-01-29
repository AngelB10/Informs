import PropTypes from "prop-types";
import { Trash, Edit} from "lucide-react";

const DataTable = ({ rows, columns, visibleColumns, nameTable, onDelete, onGoInfo }) => {
  return (
    <div className=" mt-6">
      <div className="flex justify-between items-center">
        <h6 >{nameTable}</h6>
      </div>
      <div className="overflow-y-auto max-h-[500px] pb-8 pt-2  rounded-[10px]">
  <table className="w-full border-collapse rounded-lg shadow-md bg-white ">
    <thead className="bg-gray-100 hover:bg-gray-300 border-b ">
      <tr>
        {columns.map((col) => (
          <th key={col.key} className="px-4 py-3 text-gray-600 font-semibold uppercase text-[13px]">
            {col.label}
          </th>
        ))}
        <th  className="px-4 py-3 text-gray-600 font-semibold uppercase text-sm">Acciones</th>
      </tr>    
    </thead>
    <tbody>
      {rows.map((row, index) => ( 
        <tr key={index} className="hover:bg-gray-100 transition border-b last:border-none">
          {visibleColumns.map((colKey) => (
            <td key={colKey} className="px-2 py-2 text-gray-700 truncate">
              <div className={`${colKey === "mainLeader" || colKey === "date" ? "bg-green-300 text-[#09b717] rounded-[4px] text-center max-w-[138px]" : "bg-transparent text-[85%]"} px-3 py-2`}>
                {typeof row[colKey] === "string" && row[colKey].length > 18 ? row[colKey].slice(0, 18) + "..." : row[colKey].toLocaleString() }
              </div>
            </td>
          ))}
          <td>
            <button 
              className="text-[#9a1b1b] bg-[#d65757] hover:bg-red-500 m-2 "
              onClick={() => onDelete(row)}
            >
              <Trash size={18} /> 
            </button>
            <button 
              className="bg-[#4463d2] hover:bg-blue-500 text-[#1837a5] m-2 "
              onClick={() => onGoInfo(row)}
            >
               <Edit size={18} /> 
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};
// ✅ Agregar validación de props
DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameTable: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onGoInfo: PropTypes.func.isRequired,
  onProductClients: PropTypes.func.isRequired,
  
};





export default DataTable;
