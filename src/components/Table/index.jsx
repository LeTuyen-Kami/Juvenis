import { useEffect, useState } from "react";

const Table = ({ columns, data, onSelect, tableId, name }) => {
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (value, rowId) => {
    setSelectedValues({
      ...selectedValues,
      [rowId]: value,
    });
  };

  useEffect(() => {
    onSelect((prev) => ({
      ...prev,
      [tableId]: {
        ...selectedValues,
        name,
      },
    }));
  }, [selectedValues, tableId]);

  const columnColor = (index) => {
    switch (index) {
      case 0:
        return "black";
      case 1:
        return "black";
      case 2:
        return "red";
      case 3:
        return "green";
      case 4:
        return "purple";
      case 5:
        return "blue";
      default:
        return "blue";
    }
  };

  return (
    <table className={"w-full h-full"}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key}
              className={`${index === 0 ? "w-[40%] text-left pb-2" : "pb-2"}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdex) => (
          <tr key={rowIdex}>
            {columns.map((column, index) => (
              <td key={index} className={"m-0 p-0 "}>
                {Number(row[column.key]) ? (
                  <div
                    className={
                      "flex items-center justify-center cursor-pointer  h-full"
                    }
                    onClick={() => handleChange(row[column.key], row.id)}
                  >
                    <input
                      type="radio"
                      value={row[column.key]}
                      checked={selectedValues[row.id] === row[column.key]}
                      name={row.id}
                      onChange={(e) => handleChange(e.target.value, row.id)}
                      className={"cursor-pointer"}
                      style={{
                        width: "20px",
                        height: "20px",
                        accentColor: columnColor(index),
                        outline: "none",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={
                      index === 0
                        ? `bg-blue-500 p-4  border-b border-blue-200 text-base text-white   ${
                            rowIdex === 0
                              ? "rounded-t-3xl"
                              : rowIdex === data.length - 1
                              ? "rounded-b-3xl"
                              : ""
                          } `
                        : ""
                    }
                  >
                    {rowIdex + 1}. {row[column.key]}
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
