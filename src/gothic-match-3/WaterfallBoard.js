import React, {Component} from "react";
import "./WaterfallBoard.css";
import GemTile from "./GemTile";

// HERE IS HOW to work with clones of state without mutating state!!!
// let row0map = this.state.row0.map(elem => ({...elem}));
// note that we are BOTH mapping over the row array (to create row0map) AND using the spread operator to clone each element in that array

// NOTE! calling this.findMatches() inside componentDidMount ensures that the function runs ONCE, as soon as the component loads/mounts:
// componentDidMount() {
//   this.findMatches();
// }

// The idea is to make the gem gameboard flow in the opposite direction: each COLUMN is an array of equal length, each ROW is the index in that column.
//
// This is how the board looks in this.state:
// let board = [
//   [ A, B, C ], // board[0]  <-- this # is our X-value, or our column value
//   [ D, E, F ], // board[1]
//   [ G, H, I ]  // board[2]
// ];
//
// But this is how it is rendered on the page --- coordinates on the actual gameboard are X, Y (over, down)
// A D G   ...   A = (X:0, Y:0)   |  D = (X:1, Y:0)   |  G = (X:2, Y:0)
// B E H   ...   B = board[0][1]  |  E = board[1][1]  |  F = board[2][1]
// C F I   ...   C = board[0][2]  |  F = board[1][2]  |  I = board[2][2]
//
//
// ** With this arrangement, we can use simple array methods to delete gems with paired: true from each column, and shift down the gems above, and push new gems to the beginning of each array
//
// Checking for matches should be the same; we can loop through the nested arrays and...
// ...for HORIZONTAL - check if thisGem.val matches the values of board[x+1][y] and board[x+2][y]
// ...for VERTICAL - check if thisGem.val matches the values of board[x][y+1] and board[x][y+2]


class WaterfallBoard extends Component {

  static defaultProps = {
    nRows: 8,
    nCols: 8,
    gems: ["ankh2", "bat", "coffin", "eye", "emerald", "skull", "moon2", "goblet" ]
  };
  // ^^ the dimensions of the WaterfallBoard

  constructor(props){
    super(props);
    this.state = {
      board: this.createBoard(),
      gotMatches: false,
      score: 0,
      firstPick: null,
      secondPick: null
    };
  }


  // ** This is a a working copy, with sliders!! **


  // calling this.findMatches() inside componentDidMount ensures that the function runs ONCE, as soon as the component loads/mounts
  componentDidMount() {
    this.findMatches();
  }

  // helper method to return a random gem
  randGem(){
    const { gems } = this.props;
    return gems[Math.floor(Math.random() * gems.length)];
  }

  // called inside this.state to create the board itself
  // createBoard gives the initial row/col values to each gem
  createBoard(){
    // console.log("Creating the board...");
    let board = [];
    for (let x = 0; x < this.props.nCols; x++) { // outer loop to create each COLUMN
      let newCol = [];
      for (let y = 0; y < this.props.nRows; y++) { // inner loop to create each ROW
        let newGem = {}; // for each element, init empty object
        newGem.val = this.randGem(); // return random gem value from this.props.gems
        newGem.x = x; // set the column index as the value of "x"
        newGem.y = y; // set the row index as the value of "y"
        newGem.paired = false; // init the .paired property as "false"
        newGem.slide = false; // (A) init gems with slide = false
        newCol.push(newGem); // push each newGem into the row
      }
      board.push(newCol); // push each newRow into the board
    }
    return board;
  }

  // renders the board inside <WaterfallBoard/>'s return()
  renderBoard(){
    // map over this.state.board, getting each "column" array and the index of that column
    let boardMap = this.state.board.map((col, colIdx) => {
      // then map over the row, getting each element and its index
      let colMap = col.map((elem, rowIdx) => {
        let coord = `${colIdx}-${rowIdx}`;
        return (
          <GemTile
            key = {coord}
            value = {elem.val}
            x = {colIdx}
            y = {rowIdx}
            paired = {elem.paired}
            slide = {elem.slide} // (B) pass slide prop to GemTile
            myClick = { () => this.gemClick(elem, coord) }
          />
        )
      });
      // for each row, return a <div> element which contains each colMap
      // make sure that .board-col displays VERTICALLY on the page
      return <div className="board-col" key={colIdx}>{colMap}</div>
    });
    return boardMap;
  }

  // helper func to generate clone of board
  cloneFactory(){
    const boardClone = this.state.board.map(col => {
       return col.map(elem => {
         return {...elem}; // note that we're using spread operator to clone each element in each row
       });
     });
     return boardClone;
  }

  // helper func that checks if every element in an array has the same value as the first element
  checkEvery(arr){
    let firstVal = arr[0].val;
    return arr.every(elem => elem.val === firstVal);
  }

  // findMatches -- function that detects matches on the board and deletes them
  findMatches() {
    const {firstPick, secondPick} = this.state;
    // console.log("running findMatches()...");
    const boardClone = this.cloneFactory();
    // we ONLY need to check if the 2 gems ahead, or 2 gems below, are the same value as the current gem -- if so, set these 3 to receive paired: true
    // this will result in some gems being paired multiple times, but this doesn't matter

    // outer loop gives the X-value of each column (remember, each column is an array)
    for (let x = 0; x < boardClone.length; x++) {
      // inner loop goes through each element, giving the Y-value
      for (let y = 0; y < boardClone[x].length; y++) {
        // set the value of the current (x,y) position as thisGem.. remember, these gems are OBJECTS
        let thisGem = boardClone[x][y];

        // checking for horizontal matches
        // we must check to make sure we're not setting hori2 or hori3 equal to a non-existent set of coordinates
        // doing so will throw an error "cannot read property '0' of undefined"
        if (x < boardClone.length - 2) {
          // setting elements in 2 adjacent cols as hori2 and hori3
          let hori2 = boardClone[x + 1][y];
          let hori3 = boardClone[x + 2][y];
          let triHori = [thisGem, hori2, hori3];
          // passing all 3 gems into checkEvery helper func
          if (this.checkEvery(triHori)) {
            // if checkEvery returns true, set the state flag 'gotMatches'...
            this.setState({ gotMatches: true });
            // ...and set every element with coordinates of those 3 gems to paired=true
            triHori.forEach(elem => {
              boardClone[elem.x][elem.y].paired = true;
            })
          }
        }

        // checking for vertical matches
        if (y < boardClone[x].length - 2) {
          let vert2 = boardClone[x][y + 1];
          let vert3 = boardClone[x][y + 2];
          let triVert = [thisGem, vert2, vert3];
          if (this.checkEvery(triVert)) {
            this.setState({ gotMatches: true });
            triVert.forEach(elem => {
              boardClone[elem.x][elem.y].paired = true;
            })
          }
        }

      } // end of inner FOR loop
    } // end of outer FOR loop

    // setState with the boardClone we've modified, which may contain paired elements
    this.setState({ board: boardClone });
    // if paired elements exist, call removeMatches to eliminate paired elements
    setTimeout(() => {
      if (this.state.gotMatches){
        // console.log("We have matches, let's call removeMatches()");
        this.removeMatches();
      } else {
        // console.log("No matches, don't bother calling removeMatches()");
        if (firstPick && secondPick) {
          // console.log("toggling 2 tiles back to original values");
          // firstPick and secondPick identify which tiles were switched, and their original values
          // ..so placing firstPick.val into boardClone[firstPick.x][firstPick.y] reverses the changes from gemClick
          boardClone[firstPick.x][firstPick.y].val = firstPick.val;
          boardClone[secondPick.x][secondPick.y].val = secondPick.val;
          setTimeout(() => {
            // setting firstPick + secondPick back to null
            this.setState({ firstPick: null, secondPick: null, board: boardClone });
          }, 500);
        }
      }
    }, 500);


  } // end of findMatches

  // method to delete matches and shift gems above the match, downward
  removeMatches(){
    // console.log("removeMatches() was called");
    let myScore = this.state.score;
    // let {firstPick, secondPick} = this.state;
     // clone the board
    const boardClone = this.cloneFactory();

    // loop through the board and tally all paired gems to get the score
    boardClone.forEach(col => {
      col.forEach(elem => {
        if (elem.paired) {
          myScore += 10;
        }
      })
    });

    // this timeout waits 1 second before removing matches
    setTimeout(() => {
      // console.log("...removing paired gems...");

      // creating a newClone of the board...
      const newClone = boardClone.map((column, colIdx) => {
        // for each column, we need to locate the LAST paired element

        // generate an array of all paired values in the column
        const lastPaired = column.map(elem => elem.paired);

        // get index of LAST paired element in the array
        let lastIdx = lastPaired.lastIndexOf(true);
        // console.log(lastIdx);

        // map over column and set every element whose index is LESS than lastIdx to slide=TRUE
        const toSlide = column.map((elem, idx) => {
          let newGem = {...elem}
          if (lastIdx !== -1 && idx < lastIdx) {
            newGem.slide = true;
          }
         return newGem;
        });

        // ... then take each column and filter it to only contain unpaired gems
        const filteredCol = toSlide.filter(elem => elem.paired === false);

        // const filteredCol = column.filter(elem => elem.paired === false);
        // this shortens the col-arrays, so while the filtered arrays are shorter than their original length...
        while (filteredCol.length < column.length) {
          // ...create new gems
          let newGem = {};
          // ** TODO: figure out how to add an animation class here that makes these gems slide down
          newGem.x = colIdx;
          newGem.val = this.randGem();
          newGem.paired = false;
          newGem.slide = true; // as we're filling board with new gems after removing pairs, add gems with slide = true
          // ..and push the new gems to the FRONT of the filtered arrays
          filteredCol.unshift(newGem);
        }
        // once we've refilled the filtered, correct-length arrays, map over them to give the array index as y-value to each element
        let filterMap = filteredCol.map((elem, rowIdx) => {
          let newGem = {...elem};
          newGem.y = rowIdx;
          return newGem;
        });
        // return the new filtered, correct-length array full of gems that have proper X and Y values
        return filterMap; // <-- this is what gets returned from filterMap
      });

      // set the gotMatches flag back to false
      this.setState({ gotMatches: false });

      // replace the board with our updated one, newClone
      this.setState({ board: newClone, score: myScore, firstPick: null, secondPick: null });

      // call this.removeSliders to take away sliding gems
      this.removeSliders();

      // * if findMatches locates no matches on the 2nd iteration, we wind up inside the IF() block above
    }, 1000);

  } // end of removeMatches


  // call removeSliders from the final block of this.removeMatches
  removeSliders(){
    console.log("removeSliders()");
    const boardClone = this.cloneFactory();
    let newMap = boardClone.map(col => {
      return col.map(elem => {
        let newGem = {...elem};
        newGem.slide = false;
        return newGem;
      });
    });
    // timeout to ensure board is updated before removing sliders
    setTimeout(()=>{
      this.setState({ board: newMap });
      // call this.findMatches again to see if removeMatches made any new matches
      this.findMatches();
    }, 1000);

  }



  // helper func to check if firstPick and prospective secondPick are neighbors
  getPermission(second){
    let first = this.state.firstPick;
    if (first.x === second.x) { // in the same column
      if (first.y === second.y-1 || first.y === second.y+1) { // and on the row below, or row above
        return true;
      }
    } else if (first.y === second.y) { // in the same row
      if (first.x === second.x+1 || first.x === second.x-1) { // and either on the col ahead, or col behind
        return true;
      }
    } else {
      return false;
    }
  }

  // function that handles clicks on each tile
  gemClick(gem){
    // console.log(gem);
    const {firstPick, secondPick} = this.state;
    if (!firstPick) {
      this.setState({ firstPick: gem });
    } else if (firstPick && secondPick) {
      // FIXED BUG: this resolves an issue where picking a third gem would reset the value of the second
      console.log("Can't pick more than 2 gems");
      return;
    } else if (!this.getPermission(gem)) {
      console.log("forbidden match");
      this.setState({ firstPick: null });
      // remove focus from the element after 500ms
      setTimeout(()=>{ document.activeElement.blur(); }, 500);
    } else if (this.getPermission(gem)) {
      console.log("permitted match");
      // remove focus from the element after 500ms...which is when findMatches begins to run
      setTimeout(()=>{ document.activeElement.blur(); }, 500);
      // clone the board
      const boardClone = this.state.board.map(row => {
        return row.map(elem => {
          return {...elem}; // note that we're using spread operator to clone each element in each row
        });
      });
      boardClone[firstPick.x][firstPick.y].val = gem.val; // set the current gem (secondPick) val, as the val of the gem at boardClone[firstPick.x][firstPick.y] ...
      boardClone[gem.x][gem.y].val = firstPick.val; // ...and vice-versa for current gem (secondPick)
      // note that we are not changing values of firstPick and secondPick here!
      this.setState({ board: boardClone, secondPick: gem });
      setTimeout(() => {
        console.log(`FirstPick value: ${firstPick.val}`);
        console.log(`SecondPick value: ${gem.val}`);
        this.findMatches(); // run findMatches() again
      }, 500);

    }
  }

  // function to reload game board and rerun findMatches()
  restart(){
    console.log("restarting game...");
    this.setState({ board: this.createBoard(), score: 0 });
    // wait for the board creation to run findMatches
    setTimeout(() => {
      this.findMatches();
      document.activeElement.blur();
    }, 500);
  }



  render(){

    return(
        <div className="board-container">

          <div className="board-title">
            <h1 className="title">Gothic Match-3</h1>
            <h3 className="score">Score: {this.state.score}</h3>
            <button className="restart" onClick={ ()=>{this.restart()} }>Restart Game</button>
          </div>
          <div className="board-game">
            { this.renderBoard() }
          </div>

        </div>
      )

  }

};

export default WaterfallBoard;
