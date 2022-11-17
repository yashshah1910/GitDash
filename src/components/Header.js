import React from "react";
import data from "../local-json/data.json";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(data);
  }, []);
  const [username, setUsername] = useState([]);
  {
    data.map((item, i) => {
      useEffect(() => {
        let user = item.github.split("/")[3];
        username.push(user);
      }, []);
    });
  }
  const [selectedUsername, setselectedUsername] = useState("");
  const [dropdownSearchValue, setDropdownSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editMode]);

  const userNameSelectionHandler = (username) => {
    setselectedUsername(username);
    setDropdownSearchValue("");
    setEditMode(false);
  };

  const filteredUsername = username.filter((username) =>
    username.match(new RegExp(dropdownSearchValue, "i"))
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            GitHub Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  About Me
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
            <form class="d-flex fixed-top-0 end-0" role="search">
              <div className="App">
                {editMode ? (
                  // display the dropdown when the input is focused
                  <div ref={dropdownRef} className="dropdown-wrapper">
                    <input
                      className="form-control me-2"
                      name="dropdown-input"
                      autoFocus
                      onChange={(e) => setDropdownSearchValue(e.target.value)}
                      value={dropdownSearchValue}
                    />
                    <div className="dropdown-list">
                      <ul class="list-group">
                        {filteredUsername.map((username) => {
                          return (
                            <li
                              class="list-group-item"
                              key={username}
                              onClick={() => userNameSelectionHandler(username)}
                            >
                              {username}{" "}
                            </li>
                          );
                        })}
                        {filteredUsername.length === 0 && (
                          <li className="list-group-item">No results found</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <input
                    className="form-control me-2"
                    onFocus={() => setEditMode(true)}
                    value={selectedUsername || "Search Username"}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </nav>
      <br></br>
    </>
  );
}

export default Header;
