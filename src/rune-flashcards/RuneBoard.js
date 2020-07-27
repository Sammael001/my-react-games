import React, {Component} from "react";
import "./Board.css";
import Tile from "./Tile";



class Board extends Component {

  static defaultProps = {
    runeNames: [ "fehu",  "uruz", "thurisaz", "ansuz", "raidho", "kaunaz", "gebo", "wunju", "hagalaz", "naudiz", "isa", "jara", "eihwaz", "perthu", "algiz", "sowulo", "teiwaz", "berkana", "ehwaz", "mannaz", "laguz", "ingwaz", "dagaz", "othala"]
  };

  constructor(props){
    super(props);
    this.state = {
      wonGame: false,
      startedGame: false,
      showHint: false,
      question: "",
      answer: "",
      message: "Click the start button to begin",
      runes: []
    }
  };

  // click handler for each rune tile
  menuClick(choice) {
    const { question, runes } = this.state;
    console.log(`Clicked on ${choice}`);
    this.setState({ answer: choice });
    let myCaps = choice.toUpperCase();

    // if you guessed correctly...
    if (question === choice) {
      console.log(`Matched ${question} and ${choice}`);
      this.setState({ message: `That's right! This is the rune ${myCaps}` })
      // if we got a match, map over this.state.runes
      let runeMap = runes.map(rune => {
        if (rune.name === choice) {
          return {...rune, paired: true}; // set rune.paired to TRUE if the rune.name matches the question
        } else {
          return rune; // otherwise, return the rune without changes
        }
      });
      this.setState({ runes: runeMap }); // set this.state.runes to the new map
      setTimeout(() => {
        console.log("Timeout reached, clearing answer + getting new question");
        this.setState({ answer: "", message: "" });
        this.newQuest(); // this will generate a new question
      }, 3000);
    } else { // else, if you guessed incorrectly
      this.setState({ message: `Wrong, this is the rune ${myCaps}` });
      setTimeout(() => {
        console.log("Timeout reached, clearing answer");
        this.setState({ answer: "", message: "" });
      }, 3000);
    }
  }

  // creating runes-menu
  buildMenu() {
    // hide the menu buttons if the game hasn't started yet...this is redundant, since we don't call this.buildMenu inside the <Board>'s return() if startedGame is false
    if (this.state.startedGame) {
      // map over this.state.runes to create runes-menu
      // pass in rune obj to each Tile that contains runeName and paired props
      // in Tile.js, use the 'paired' prop to highlight menu runes in gold, and show rune name, once they've been properly paired
      let runeMap = this.state.runes.map((rune, idx) => {
        return(
          <Tile
            key = { idx }
            runeObj = { rune }
            onClick = { () => {this.menuClick(rune.name)} }
            showHint = { this.state.showHint }
          />
        )
      });
      return runeMap;
    } else {
      return null
    }
  }

  // button that initializes the game (also restarts the game)
  onStart() {
    const {runeNames} = this.props;
    // set startedGame to true, which hides the Start button and reveals the rune-menu
    this.setState({ startedGame: true });
    // pull from defaultProps.runenames and create 24 objects, each with a runeName and a paired property (init paired as false)
    let startingMap = runeNames.map(rune => {
      let obj = {};
      obj.name = rune;
      obj.paired = false;
      return obj;
    });
    console.log(startingMap);
    // pick a random rune from the startingMap to give the first question
    let rand = Math.floor(Math.random() * startingMap.length);
    let question = startingMap[rand].name;
    // store the new rune obj array, startingMap, in this.state.runes
    this.setState({ question: question, message: "", runes: startingMap });
  }

  // generates a new random rune as a question
  newQuest() {
    // loop through this.state.runes
    const { runes } = this.state;
    let newQs = runes.filter(rune => {
      // return list of only the unpaired runes
      return rune.paired === false;
    });
    console.log(newQs);
    // check to see if newQs.length === 0, and if so, set this.state.wonGame to TRUE
    if (newQs.length === 0) {
      this.setState({ message: "Congrats, you've named all the runes!", wonGame: true, startedGame: false })
      // set startedGame back to false to show the Start/Replay button and hide the rune-menu
    } else {
      // else, generate new question from this new list of unpaired runes
      let rand = Math.floor(Math.random() * newQs.length);
      let question = newQs[rand].name;
      this.setState({ question: question });
    }
  }

  // shows the names of all the runes for a few seconds
  showHint() {
    this.setState({ showHint: true });
    console.log("Showing hints");
    setTimeout(() => {
      this.setState({ showHint: false });
      console.log("Hiding hints");
    }, 5000);
  }

  render(){
    const { question, message, startedGame, wonGame } = this.state;
    const myQuest = question.toUpperCase();
    // <div className="question-box"> either shows this.state.message or, if that is blank, directs you to find the next rune
    // <div className="rune-box"> calls this.buildMenu if this.state.startedGame is true; otherwise it returns null
    // the start button only shows if startedGame is FALSE
    return(
      <div className="container">
        <h1 className="title">Rune Flashcards</h1>

        <div className="question-box">
          <h2 className="message">
            { message.length !== 0
              ? message
              : `Find this rune: ${myQuest}`
            }
          </h2>
        </div>

        { startedGame
          ? (
            <div className="rune-box">
              { this.buildMenu() }
            </div>
          )
          : null
        }


        { startedGame
          ? null
          : (
            <button onClick={ ()=>{ this.onStart() } } className="start-button default-button">
              { wonGame ? "Replay" : "Start" }
            </button>
          )
        }

        { startedGame
          ? (
            <button className="start-button default-button" onClick={ ()=>{ this.showHint() } }>
              Show Rune Names
            </button>
          )
          : null
        }
      </div>
    )
  }
};

export default Board;
