import React from "react";
const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((item) => {
        return (
          <tr class="table-light" key={item.id}>
            {columns.map(({ accessor }) => {
              const tData = item[accessor] ? item[accessor] : "——";
              if (accessor === "name") {
                return (
                  <td key={accessor}>
                    <a href={item["url"]} target="_blank">
                      {tData}
                    </a>
                  </td>
                );
              }
              return (
                <td class="table-light" key={accessor}>
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
