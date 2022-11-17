import React, { useState, useEffect } from "react";
import userData from "../local-json/data.json";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(userData);
  }, []);

  const [data, setData] = useState([]);
  const [username, setUsername] = useState([]);

  {
    userData.map((item, i) => {
      let username = item.github.split("/")[3]; //To get username from url (local json)
      useEffect(() => {
        let newData = {
          id: username,
          name: item.name,
          url: item.github,
          followers: 0,
          public_repos: 0,
          fieldA: item.fieldA,
          fieldB: item.fieldB,
          fieldC: item.fieldC,
          fieldD: item.fieldD,
          fieldE: item.fieldE,
          fieldF: item.fieldF,
          fieldG: item.fieldG,
          fieldH: item.fieldH,
          fieldI: item.fieldI,
          fieldJ: item.fieldJ,
          fieldK: item.fieldK,
          fieldL: item.fieldL,
          fieldM: item.fieldM,
          fieldN: item.fieldN,
        };
        data.push(newData);
      }, []);
    });
  }
  {
    data.map((item, i) => {
      username.push(item.id);
    });
  }
  const getUsers = async (item) => {
    const response = await fetch(`https://api.github.com/users/${item}`);
    const FinalData = await response.json();
    let followers = await FinalData.followers;
    let public_repos = await FinalData.public_repos;
    return [followers, public_repos];
  };

  {
    data.map(async (item, i) => {
      let api_data = await getUsers(username[i]);
      item.followers = api_data[0];
      item.public_repos = api_data[1];
      setData([...data]);
    });
  }
  const data2 = [...data].sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );

  const [tableData, setTableData] = useState(data);

  const columns = [
    { label: "Name", accessor: "name", sortable: true },
    { label: "Followers", accessor: "followers", sortable: true },
    { label: "Public Repositories", accessor: "public_repos", sortable: true },
    { label: "Field A", accessor: "fieldA", sortable: false },
    { label: "Field B", accessor: "fieldB", sortable: false },
    { label: "Field C", accessor: "fieldC", sortable: false },
    { label: "Field D", accessor: "fieldD", sortable: false },
    { label: "Field E", accessor: "fieldE", sortable: false },
    { label: "Field F", accessor: "fieldF", sortable: false },
    { label: "Field G", accessor: "fieldG", sortable: false },
    { label: "Field H", accessor: "fieldH", sortable: false },
    { label: "Field I", accessor: "fieldI", sortable: false },
    { label: "Field J", accessor: "fieldJ", sortable: false },
    { label: "Field K", accessor: "fieldK", sortable: false },
    { label: "Field L", accessor: "fieldL", sortable: false },
    { label: "Field M", accessor: "fieldM", sortable: false },
    { label: "Field N", accessor: "fieldN", sortable: false },
  ];
  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };
  return (
    <>
      <table className="table table-striped">
        {/* <caption>GitHub Dashboard</caption> */}
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody columns={columns} tableData={tableData} />
      </table>
    </>
  );
};

export default Table;
