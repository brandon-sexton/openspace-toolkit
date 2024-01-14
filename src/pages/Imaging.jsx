import React from "react";
import { NavPanel } from "../components/nav-panel";
import { ImageTable } from "../components/image-table";

function ImagingPage() {
  return (
    <React.StrictMode>
      <NavPanel />
      <ImageTable id="img-page"/>
    </React.StrictMode>
  );
}

export default ImagingPage;