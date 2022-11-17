import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Table from "./components/Table";

function App() {
  return (
    <>
      <Header />
      <div className="table_container">
        <Table />
      </div>
      <Footer />
    </>
  );
}

export default App;
