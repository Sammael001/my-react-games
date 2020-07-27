// https://reactjs.org/docs/conditional-rendering.html
// https://scotch.io/tutorials/7-ways-to-implement-conditional-rendering-in-react-applications

// TO DO:
// this.state.tiles should be an array of objects with 2 keys:
  // img : stores image/className string
  // reveal : holds a string which is either "hide", "show" or "paired"

  // this.state.tiles = [
  //   {img: "red", reveal: "hide"},
  //   {img: "green", reveal: "show"},
  //   {img: "blue", reveal: "paired"},
  // ]

// when we initialize the game in startGame, loop through the scrambled newArr and create an object like the ones shown above for each element
// example string-array-to-object-array function shown below:

// const myArr = ["yes", "no", "maybe"];
// const objArr = myArr.map(elem => {
//   let obj = {};
//   obj.img = elem;
//   obj.reveal = "hide";
//   return obj;
// });

// pass the img and reveal props to each Tile in renderTile
// inside Tile.js, each Tile component should selectively render based on this.props.reveal
// when we enter the handleClick function by clicking a Tile, each Tile shows initially
// the Tile also receives reveal:"show" as its prop, which should MAKE IT UNCLICKABLE
// (there is a bug where the first-clicked Tiles can be clicked again, "pairing" with themselves)
// once reveal:"paired" is set on the Tile, it should remain unclickable


// here's a functioning .map() statement to return a clone of an array, with certain obj props modified -->>

// let objArr = [{ img: "Joe", reveal: "hide" }, { img: "Jane", reveal: "show" }, { img: "cat", reveal: "hide" }, { img: "dog", reveal: "show" }];
//
// let myMap = objArr.map(obj => {
//   if (obj.reveal === "show") {
//     return { ...obj, reveal: "paired" };
//   }
//   else { return obj; }
// })
