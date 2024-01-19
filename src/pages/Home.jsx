import React from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { SatQueryWidget } from "../components/sat-query-widget/sat-query-widget";

function Home() {
  return (
    <React.StrictMode>
      <NavBar />
      <div className="content">
        <SatQueryWidget />
      </div>
    </React.StrictMode>
  );
}

export default Home;