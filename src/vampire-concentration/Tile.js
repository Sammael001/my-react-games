import React, { Component } from "react";
import "./Tile.css";


class Tile extends Component {
  // onClick attribute is just a cb which calls the func passed in via the onClick prop
  classBuilder = (tileObj) => {
    if (tileObj.reveal === "hide") { return `Tile-button hilight bg`; }
    if (tileObj.reveal === "paired" ) { return `Tile-button ${tileObj.img}-fade`; }
    if (tileObj.reveal === "show" ) { return `Tile-button hilight ${tileObj.img}`; }
    // return a string here, which reads like so: "Tile-button ankh-fade"
    // call this function inside className bracket below
  }

  render(){
    // style={ { backgroundColor: tileObj.img } }
    // style={ { backgroundImage: `url(./vamp-imgs/${tileObj.img}.jpg)` } }
    const { tileObj } = this.props;

    return(
      <div className="Tile">
        { tileObj
          ? <button
              className={ this.classBuilder(tileObj) }
              onClick={() => { this.props.onClick() }}
            >
            </button>
          : <button className="Tile-button bg-fade"></button>
        }
      </div>
    )
  }
};

// before we click startGame, tileObj is not even an object, but a null value
// therefore we use ternary operator to render either a plain button, or button with tileObj.img and tileObj.reveal values


// <button
//    className={`Tile-button ${tileObj.img}`}
//    onClick={() => { this.props.onClick() }}
//  >

export default Tile;
