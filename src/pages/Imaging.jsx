import React, {Component} from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { ImageTable } from "../components/image-table";

class ImagingPage extends Component {
  render() {
    return (
      <React.StrictMode>
        <NavBar />
        <ImageTable satcat={this.props.satcat} id="img-page"/>
      </React.StrictMode>
    );
  }
}
// function ImagingPage() {
//   return (
//     <React.StrictMode>
//       <NavBar />
//       <ImageTable id="img-page"/>
//     </React.StrictMode>
//   );
// }

export default ImagingPage;