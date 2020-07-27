import React, {Component} from "react";
import "./Board.css";
import Tile from "./Tile";

class Board extends Component {

  static defaultProps = {
    choices: ["fangs2", "ankh", "moon", "blood", "castle", "candles2", "cup", "bats"]
  };

  constructor(props){
    super(props);
    this.state = {
      tiles: Array(16).fill(null),
      startGame: false,
      firstPick: null,
      secondPick: null,
    };
  }


  handleClick(i){
    // each tile has their own copy of handleClick, with their index position in this.state.tiles as "i"
    const { firstPick, secondPick, tiles } = this.state;
    let newCol = tiles[i]; // this is an obj like so: {img: "fangs", reveal: "hide"}
    if (newCol.reveal !== "hide" ) { return; } // return early if we've clicked on a tile that's already shown or paired
    if ( firstPick && secondPick ) { return; } // return early if we've already got firstPick and secondPick defined
    // ^^ only happens when they're both mismatched and we're waiting for setTimeout to hide them again
    if (!firstPick) { // if there's nothing in firstPick...
      newCol.reveal = "show"; // reveal the tile
      this.setState({ firstPick: newCol }); // use that tile to define firstPick

    } else { // else, there's already a value in firstPick

      if (firstPick.img === newCol.img) { // if we have a match...
        console.log(`${firstPick.img} and ${newCol.img} -- yay, a match!`);
        // update these elements in this.state.tiles to have class "paired"
        const myTiles = tiles.map(obj => { // map over this.state.tiles
          if (obj.img === newCol.img) { // find tile objs whose img matches newCol.img
            return { ...obj, reveal: "paired" };  // <-- return clone of the obj, but with reveal set to "paired"
          } else { return obj; } // <-- else just return the obj intact
        });
        this.setState({ firstPick: null, tiles: myTiles }); // set firstPick back to 'null' and update this.state.tiles with the result of the map() above

      } else { // else, we have NO match
        console.log(`${firstPick.img} and ${newCol.img} -- no match :(`);
        newCol.reveal = "show"; // show the non-matching selection
        this.setState({ secondPick: newCol }); // update state with secondPick for a moment, so the components rerender
        setTimeout(() => { // use setTimeout to delay long enough for user to see the non-matching pair
          const myTiles = tiles.map(obj => { // then map over myTiles to hide all tiles with reveal: "show"
            if (obj.reveal === "show") {
              return { ...obj, reveal: "hide" };  // <-- return clone of the obj, but with reveal set to "hide"
            }
            else { return obj; } // <-- else just return the obj intact
          })
          this.setState({ firstPick: null, secondPick: null, tiles: myTiles }); // reset firstPick + secondPick and reset the game board, now with non-paired tiles hidden
          console.log("timer up!");
        }, 1500);
      }

  }}

  startGame(){
    this.setState({ startGame: true });
    let newArr = []; // init new empty array to hold our game tiles
    let idx = 0;
    // first, generate tile-picture pairs and push them sequentially into newArr

    // while newArr is shorter than this.state.tiles.length ... (checking idx is not really needed)
    while (newArr.length < this.state.tiles.length && idx < this.props.choices.length) {
      let newCol = this.props.choices[idx]; // get tile-picture at index [idx] from choices
      newArr.push(newCol, newCol); // push pair of tile-pictures into newArr
      idx++; // increment the index
    }
    console.log("Exited loop: ", newArr);

    // then, scramble order of newArr -- see https://stackoverflow.com/a/12646864
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    console.log("Scrambled newArr: ", newArr);
    // now we have randomly distributed pairs of tile-pictures in our 3D array, newArr
    // next, set objArr to the result of mapping over newArr and creating array of objs
    // use each element value in newArr as "img" prop (these are the tile-pic names), and set a "reveal" prop of "hide" on each obj
    const objArr = newArr.map(elem => {
      let obj = {};
      obj.img = elem;
      obj.reveal = "hide";
      return obj;
    });
    console.log(objArr);
    // setState with objArr replacing this.state.tiles
    this.setState({ tiles: objArr });
  }

  renderTile(i){
    // func that creates our Tile components ...
    // (we pass the "i" arg to each renderTile call manually, inside the render() method of Board)
    // renderTile takes in "i" and sets Tile's tileObj prop to whatever is at this.state.tiles at index "i"
    // also sets onClick prop as a reference to this.handleClick() here in Board, and passes "i" to that func
    return(
      <Tile
        tileObj={this.state.tiles[i]}
        onClick={() => {this.handleClick(i)}}
      />
    )
  }

  onStart(){
    let winner = false; // init "winner" var to false
    if (this.state.tiles[0]){ // if there's a null value in this.state.tiles[0], the game has not begun yet
      winner = this.state.tiles.every(tile => { // let winner equal TRUE if every tile in this.state.tiles has reveal="paired"
        return tile.reveal === "paired";
      });
    }
    if (!this.state.startGame) { // if the game hasn't started yet..
      return 'Board-start-visible'; // ..return a class that adds a red overlay + positions Start button at top
    } else if (winner) { // checking for the winner var we set above
      console.log("Winner is true");
      return 'Board-start-visible'; // of if the game has been won, add the same class as above
    } else {
      return 'Board-start';
    }
  }

  render(){

    let winner = false;
    function checkWinner(tile){
      return tile.reveal === "paired"; // checkWinner returns TRUE if every tile it receives has reveal="paired"
    }
    if (this.state.tiles[0]) { // if there's a null value in this.state.tiles[0], the game has not begun yet
      winner = this.state.tiles.every(checkWinner); // set winner to TRUE if checkWinner returns TRUE when checking every tile
      console.log(`Winner is ${winner}`);
    }

    return(
      <div className="Board">
        <h1 className="Board-title">Vampire Memory</h1>
        <div className="Board-row">
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
        </div>
        <div className="Board-row">
          {this.renderTile(4)}
          {this.renderTile(5)}
          {this.renderTile(6)}
          {this.renderTile(7)}
        </div>
        <div className="Board-row">
          {this.renderTile(8)}
          {this.renderTile(9)}
          {this.renderTile(10)}
          {this.renderTile(11)}
        </div>
        <div className="Board-row">
          {this.renderTile(12)}
          {this.renderTile(13)}
          {this.renderTile(14)}
          {this.renderTile(15)}
        </div>
        <div className= { this.onStart() } >
          { winner ? <h1>You Win! Play again?</h1> : null }
          <button className="Board-start-button" onClick={ () => this.startGame() }>Start Game</button>
        </div>
      </div>
    )
  }
}

export default Board;
