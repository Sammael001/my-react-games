import React, {Component} from "react";
import "./Tile.css";

class Tile extends Component {

  classBuilder = (rune) => {
    if (rune.paired) {
      return `default-button rune-tile paired ${rune.name}-paired`;
    } else {
      return `default-button rune-tile unpaired ${rune.name}`;
    }
  }

  spanText = (rune) => {
    if (rune.paired || this.props.showHint) {
      return rune.name;
    } else {
      return "";
    }
  }

  // methods go here
  render(){
    return(
      <div>
        <button
          onClick = { () => {this.props.onClick()} }
          className = { this.classBuilder(this.props.runeObj) }
        >
          <span className="rune-name-span">
            { this.spanText(this.props.runeObj) }
          </span>

        </button>
      </div>
    )
  }
};

export default Tile;

// { this.props.runeObj.paired
//   ? this.props.runeObj.name
//   : null
// }
