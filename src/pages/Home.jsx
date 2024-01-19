import React, {Component} from "react";
import { NavBar } from "../components/nav-bar/nav-bar";
import { SatQueryWidget } from "../components/sat-query-widget/sat-query-widget";

class Home extends Component {
  render() {
    return (
      <React.StrictMode>
        <NavBar />
        <div className="content">
          <SatQueryWidget satcat={this.props.satcat}/>
        </div>
      </React.StrictMode>
    );
  }
}

export default Home;