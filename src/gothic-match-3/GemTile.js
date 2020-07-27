import React, {Component} from 'react'
import "./GemTile.css";

class GemTile extends Component {

  classBuilder = (value) => {
    if (this.props.paired) {
      return `tile bright ${value}-paired`;
    } else if (this.props.slide) {
      return `tile slider ${value}`;
    } else {
      return `tile ${value}`;
    }

  };

  render() {

    return (
        <button
          className={ this.classBuilder(this.props.value) }
          onClick={ this.props.myClick }
        >

        </button>
    )
  }
}


export default GemTile;

// let myArr = [{name: "a", paired: false}, {name: "b", paired: false}, {name: "c", paired: true}, {name: "d", paired: false}];
// const arrKeys = myArr.map(elem => elem.paired);
// arrKeys.lastIndexOf(true); // 2
// arrKeys.lastIndexOf("b"); // -1 (not found)
