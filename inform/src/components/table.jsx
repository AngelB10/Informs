import PropTypes from "prop-types";

const DataTable = ({ rows, columns, visibleColumns, nameTable, onDelete, onGoInfo }) => {
  return (
    <div className=" mt-20">
      <div className="flex justify-between items-center mb-2 ">
        <h6 className="text-xl font-semibold text-white ">{nameTable}</h6>
      </div>

      <div className="pb-8 pt-2  rounded-[10px]">
      <table className="w-full text-left border-collapse rounded-lg shadow-md bg-white">
  <thead className="bg-gray-200 hover:bg-gray-300 border-b">
    <tr>
      {columns.map((col) => (
        <th key={col.key} className="px-4 py-3 text-gray-600 font-semibold uppercase text-sm">
          {col.label}
        </th>
      ))}
      <th className="px-4 py-3 text-gray-600 font-semibold uppercase text-sm">Acciones</th>
    </tr>    
  </thead>
  <tbody>
    {rows.map((row, index) => (
      <tr key={index} className="hover:bg-gray-100 transition border-b last:border-none">
        {visibleColumns.map((colKey) => (
          <td key={colKey} className="px-4 py-3 text-gray-700 truncate max-w-[150px]" title={row[colKey]}>
            {typeof row[colKey] === "string" && row[colKey].length > 30 
              ? row[colKey].slice(0, 30) + "..." 
              : row[colKey]
            }
          </td>
        ))}
        <td className=" py-2 flex gap-2">
          <button 
            className="text-[#9a1b1b] px-3 py-1 bg-[#d65757] hover:bg-red-500 "
            onClick={() => onDelete(row)}
          >
            Eliminar
          </button>
          <button 
            className="bg-[#4463d2] hover:bg-blue-500 text-[#1837a5] px-3 py-1 "
            onClick={() => onGoInfo(row)}
          >
            Editar
          </button>
          {/* <button 
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 "
            onClick={() => onProductClients(row)}
          >
            Productos
          </button> */}
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
