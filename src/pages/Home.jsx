import React from "react";
import { NavPanel } from "../components/nav-panel";
import { SatCatTable } from "../components/satcat-table";

function Home() {
  return (
    <React.StrictMode>
      <NavPanel />
      <SatCatTable />
    </React.StrictMode>
  );
}

export default Home;