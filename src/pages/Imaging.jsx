import React from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { ImageTable } from "../components/image-table";

function ImagingPage() {
  return (
    <React.StrictMode>
      <NavBar />
      <ImageTable id="img-page"/>
    </React.StrictMode>
  );
}

export default ImagingPage;