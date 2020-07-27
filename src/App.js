import React, {Component} from 'react';
import './App.css';

import WaterfallBoard from "./gothic-match-3/WaterfallBoard";
import RuneBoard from "./rune-flashcards/RuneBoard";
import VampBoard from "./vampire-concentration/VampBoard";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentGame: "default"
    }
  }

  clickHandler(key){
    this.setState({ currentGame: key });
  }

  render(){
    return(
      <div>
        <div className={ this.state.currentGame === "default" ? "nav-full" : "nav-menu" }>
          <h1>my React games</h1>
          <div className="nav-box">
            <button className="nav-button match-button" onClick={() => {this.clickHandler("goth")}}>Gothic Match-3</button>
            <button className="nav-button vamp-button" onClick={() => {this.clickHandler("vamp")}}>Vampire Memory</button>
            <button className="nav-button rune-button" onClick={() => {this.clickHandler("rune")}}>Rune Flashcards</button>
            <a href="https://sammael001.github.io/new-public-portfolio/"><button className="nav-button portfolio">Back to Portfolio</button></a>
          </div>
        </div>
        <div className="game-container">
          { this.state.currentGame === "goth"
            ? <WaterfallBoard />
            : null
          }
          { this.state.currentGame === "vamp"
            ? <VampBoard />
            : null
          }
          { this.state.currentGame === "rune"
            ? <RuneBoard />
            : null
          }
        </div>
      </div>
    )
  }
}

export default App;
