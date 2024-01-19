import React, {Component} from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { ImageScheduleWidget } from "../components/main-content/image-schedule-widget/image-schedule-widget";

class ImagingPage extends Component {
  render() {
    return (
      <React.StrictMode>
        <NavBar />
        <ImageScheduleWidget satcat={this.props.satcat} id="img-page"/>
      </React.StrictMode>
    );
  }
}

export default ImagingPage;