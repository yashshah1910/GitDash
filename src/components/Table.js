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
  const [inputData, setInputData] = useState([{}]);
  const [username, setUsername] = useState([]);
  const [usernameInput, setUsernameInput] = useState("");
  //Update table data to username search by users
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("username", usernameInput);
    {
      inputData.map(async (item, i) => {
        let api_data = await getUsers(usernameInput);
        console.log("api", api_data);
        item.name = api_data[0];
        item.url = api_data[1];
        item.followers = api_data[2];
        item.public_repos = api_data[3];
        item.fieldA = "valueA";
        item.fieldB = "valueB";
        item.fieldC = "valueC";
        item.fieldD = "valueD";
        item.fieldE = "valueE";
        item.fieldF = "valueF";
        item.fieldG = "valueG";
        item.fieldH = "valueH";
        item.fieldI = "valueI";
        item.fieldJ = "valueJ";
        item.fieldK = "valueK";
        item.fieldL = "valueL";
        item.fieldM = "valueM";
        item.fieldN = "valueN";
        setInputData([inputData]);
      });
      setTableData(inputData);
    }
    console.log(inputData);
  };
  //Fetch data from local json file and display when user didn't search username
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
    if (response.status === 404) {
      alert("Please Enter Valid Username"); //error when user enter wrong username
    }
    const FinalData = await response.json();
    let name = await FinalData.name;
    let url = await FinalData.html_url;
    let followers = await FinalData.followers;
    let public_repos = await FinalData.public_repos;
    return [name, url, followers, public_repos];
  };

  {
    data.map(async (item, i) => {
      let api_data = await getUsers(username[i]);
      item.name = api_data[0];
      item.url = api_data[1];
      item.followers = api_data[2];
      item.public_repos = api_data[3];
      setData([...data]);
    });
  }

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
      <div class="form-center">
        <form
          className="d-flex"
          role="search"
          onSubmit={handleSubmit}
          id="SearchForm"
          ali
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Enter Github Username"
            aria-label="Search"
            id="usernameInput"
            onChange={(event) => setUsernameInput(event.target.value)}
            required
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <div class="fixTableHead">
        <table className="table table-striped">
          {/* <caption>GitHub Dashboard</caption> */}
          <TableHead columns={columns} handleSorting={handleSorting} />
          <TableBody columns={columns} tableData={tableData} />
        </table>
      </div>
    </>
  );
};

export default Table;
